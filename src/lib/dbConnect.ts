import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?:number
}

const connection :ConnectionObject = {}


async function dbConnect():Promise<void> { //void is diffrent from cpp
    if(connection.isConnected){
        console.log("Already Connected with DB");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI || "");
        
        connection.isConnected = db.connections[0].readyState //

        console.log(db);
        console.log(db.connection);

        console.log("DB Connected")
    
    } catch (error) {
        console.log("Database Connection Failed",error)
        
        process.exit(1)
    }
}

export default dbConnect;