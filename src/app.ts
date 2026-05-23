import { envs } from "./config/envs"
import { AppRoutes } from "./presentacion/routes"
import { Server } from "./presentacion/server"


(() => {
    main()
}) ()

function main(){

    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
        routes: AppRoutes.routes
    })
    
    server.start()
    console.log('main')

}
