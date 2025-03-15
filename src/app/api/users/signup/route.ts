import  {connect} from "@/dbconfig/dbconfig"
import User from "@/models/userModel"
import bcrypt from "bcryptjs"

import { NextRequest,NextResponse } from "next/server"

import { sendEmail } from "@/helper/mailer"
import dbConnect from "@/lib/dbConnect"

dbConnect()

export async function POST( request : NextRequest) {
    try {
        const reqBody = await request.json();
        const {name,username ,email, password ,role } = reqBody //role
        console.log(reqBody);
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exists"},{status:400}
            )
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword =await bcrypt.hash(password,salt);
        
        const newUser = new User({
            name,
            username,
            email,
            password:hashedPassword,
            role
        })

        const savedUser = await newUser.save();
        console.log(savedUser);

        //saved verification mail
        await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})

        return NextResponse.json({
            message:"User Sucesssfully Registered",
            success :true,
            savedUser
        })


    } catch (error:any) {
        return NextResponse.json({error: error.message},
            { status : 500}
        )
    }
}