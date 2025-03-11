import  {connect} from "@/dbconfig/dbconfig"
import User from "@/models/userModel"
import { NextRequest,NextResponse } from "next/server"

connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {token} = reqBody;
        console.log(token);

        const user = await User.findOne({verifyToken : token,
            verifyTokenExpiry:{$gt:Date.now()}})  // verify expiry of token
        if(!user){
            return NextResponse.json({error:"Invaild Token"},{
                status:400
            })
        }
        console.log(user)

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry =undefined;

        await user.save(); ///database ops 

        return NextResponse.json({message : "Email Verified Successfully",success : true},{ status:500 })

    } catch (error:any) {
        return NextResponse.json({error:error.message},{
            status:500
        })
    }
}