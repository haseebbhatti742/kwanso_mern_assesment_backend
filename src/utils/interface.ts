import { Router } from "express";
import mongoose, { Document } from "mongoose";

export interface IRoute {
    path: string;
    route: Router;
}

export interface IAuthModel extends Document {
    email: string;
    password: string;
    token: string;
}

export interface ITaskModel extends Document {
    name: string
    user: mongoose.Schema.Types.ObjectId
}