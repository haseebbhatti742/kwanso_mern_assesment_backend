import { IRoute } from "../../utils/interface";

//importing all routes
import routeAuth from "../../modules/auth/auth.route"
import routeTask from "../../modules/task/task.route"

//creating routes array
const  ROUTES: IRoute[] = [
    { path: "/auth", route: routeAuth },
    { path: "/task", route: routeTask }
]

export default ROUTES