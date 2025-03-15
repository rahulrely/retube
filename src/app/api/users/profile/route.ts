import User from "@/models/userModel"
import { NextRequest,NextResponse } from "next/server"
import { getDataFromToken } from "@/helper/getDataFromToken"
import dbConnect from "@/lib/dbConnect";

dbConnect();

export async function POST(request:NextRequest){ 
    //extraxt data from token
    const userid = await getDataFromToken(request);
    const user = await User.findOne({_id:userid}).select("-password");
//check if there is no user
    return NextResponse.json({
        message : "User Found",
        data: user
    })
}