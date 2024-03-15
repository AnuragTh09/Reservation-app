import mongoose from 'mongoose';
import { DB_NAME } from './../constant.js'

const connectDatabase = async () => {
    try {
    const connectionInstance =       await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n ☘️  MongoDatabase is connected successfully. Hosted At: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(`\n Error, failed to connect to Mongo`, error)
        
    }
}

export default connectDatabase