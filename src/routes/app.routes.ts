import {Request, Response, Router} from "express"
import { AdminRoutes } from "../admin/routes/admin.routes"
import { Role } from "../auth/domain/role.model"
import { RoleHandler } from "../auth/handlers/role.http"
import { RoleRepository } from "../auth/repository/role.repository"
import { AuthRoutes } from "../auth/routes/routes"
import { RoleService } from "../auth/services/role.service"
import { CustomerRoutes } from "../customers/routes/routes"
import { psqlDB } from "../data-source"
import { DriverRoutes } from "../drivers/routes/routes"
import { RideRoutes } from "../ride/routes/routes"
import { imagesRouter as images } from "../shared/multer/image-uploads"
export function AppRoutes(){
    const appRouter = Router()

    const roleRepository = new RoleRepository(psqlDB.DataSrc.getRepository(Role))
    const roleService = new RoleService(roleRepository)
    const roleHandler = new RoleHandler(roleService)

    const rides =new RideRoutes()
    const auth = new AuthRoutes(roleHandler)
    const admin = new  AdminRoutes(roleRepository)
    const drivers = new DriverRoutes(roleRepository)
    const customers =new CustomerRoutes(roleRepository)

    const indexRouter=Router()
    const authRouter = Router()
    const ridesRouter=Router()
    const adminRouter = Router()
    const imagesRouter = Router()
    const driverRouter = Router()
    const customersRouter=Router()

    authRouter.use(
        "/auth",admin.auth(),customers.auth(),drivers.auth()
    )

    customersRouter.use(
        "/customer",
        customers.customer(),
        customers.auth()
        )

    driverRouter.use(
        "/driver",
        drivers.driver()
    )
    adminRouter.use(
        "/admin",
        auth.admin(),
        rides.admin(), 
        drivers.admin(),
        customers.admin(),
        )

    ridesRouter.use(
        "/",
        rides.rides()
        )
    imagesRouter.use(
        "/images",
        images()
    )

    indexRouter.get("",(req:Request, res:Response)=>{
        return res.status(200).send("Welcome to Fast Delivery RESTful API.!")
    } )
    .post("/success",(req:Request, res:Response)=>{
        return res.status(200).send()
    } )
    .post("/error",(req:Request, res:Response)=>{
        return res.status(200).send("Error")
    } )

    appRouter.use(adminRouter, ridesRouter, customersRouter,driverRouter, indexRouter, authRouter, imagesRouter)
    return appRouter

}