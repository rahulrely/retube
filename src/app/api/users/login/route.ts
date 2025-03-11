import  {connect} from "@/dbconfig/dbconfig"
import User from "@/models/userModel"
import bcrypt from "bcryptjs"

import { NextRequest,NextResponse } from "next/server"

import { sendEmail } from "@/helper/mailer"

connect()


export async function PSOT(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const { email ,password} = reqBody()
        //vaildation
        console.log(reqBody);

        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error : "User Not Found"},
                {status:400}
            )
        }
        console.log("user hai");

        // const vaildPassword = await bcrypt.compare(password,user.password);

        const vaildPassword = user.isPasswordCorrect(password);

        if(!vaildPassword){
            return NextResponse.json({error:"Passowrd is Wrong"},{
                status:400
            })
        }

        console.log('password is corrext') // only for us

        const accessToken = user.generateAccessToken();

        const reponse  =NextResponse.json({
            message : "Logged In Success",
            success: true
        })

        reponse.cookies.set("token",accessToken,{
            httpOnly:true
        })

        return reponse


    } catch (error:any) {
        return NextResponse.json({error : error.messaage},{status:500})
    }
}