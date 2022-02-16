import express from 'express'
import cors from 'cors'
import { corsOptions } from '*/config/cors'
import { env } from '*/config/environtment'
import { connectDB } from '*/config/mongodb'
import { apiV1 } from '*/routers/v1'

connectDB()
    .then(() => console.log('Connected successfully to database server'))
    .then(() => bootServer())
    .catch(error => {
        console.log(error)
        process.exit()
    })

const bootServer = () => {
    const app = express()

    //Mở mã hóa API bằng cors npm
    app.use(cors(corsOptions))

    /* Enable req.body data */
    app.use(express.json())

    /* Use APIs  */
    app.use('/v1', apiV1)

    app.listen(env.APP_POST, env.APP_HOST, () => {
        console.log(
            `Hello MERN stack, app listening on ${env.APP_HOST}:${env.APP_POST}`
        )
    })
}
