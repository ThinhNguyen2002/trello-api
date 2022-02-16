import { MongoClient } from 'mongodb'
import { env } from '*/config/environtment'

//Password mongodb : eZPKgRbQhAuIBA61
let dbInstance = null

export const connectDB = async () => {
    const clinet = new MongoClient(env.MONGODB_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })

    //connect to databases
    await clinet.connect()

    dbInstance = clinet.db(env.DATABASE_NAME)
}

//GET database instance
export const getDB = () => {
    if (!dbInstance) throw new Error('Must connect to database first!')
    return dbInstance
}

// const listDatabases = async clinet => {
//     const databasesList = await clinet.db().admin().listDatabases()
//     console.log(databasesList)
//     console.log('Your database : ')
//     databasesList.databases.forEach(db => console.log(`- ${db.name}`))
// }
