import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on("connected",()=>{
            console.log("MongoDB Connected")
        })

        connection.on("error",(err)=>{
            console.log("MOngoDB connecttion error please make sure db is up and running " +err);
            process.exit()
        })

    } catch (error) {
        console.log("Error with DB Connection");
        console.log(error)
    }
}