import mongoose, { Schema } from "mongoose";
import { IAuthModel } from "../../utils/interface";
import { hashPassword, verifyPassword } from "../../utils/helpers";

const AuthSchema: Schema<IAuthModel> = new Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        token: { type: String },
    },
    { timestamps: true }
)

AuthSchema.methods.isPasswordMatch = async function (this: IAuthModel, password: string): Promise<boolean> {
    return verifyPassword(password, this.password || "")
}

AuthSchema.pre("save", async function (next) {
    const auth: IAuthModel = this;
    if (auth.isModified("password")) {
      auth.password = hashPassword(auth.password || "");
    }
    next();
  });

const AuthModel = mongoose.model<IAuthModel>("Auth", AuthSchema)
export default AuthModel