import express, {Router} from "express"
import ROUTES from "./ROUTES"

const router: Router = express.Router()

//using all routes for server once
ROUTES.forEach((route) => router.use(route.path, route.route))

export default router