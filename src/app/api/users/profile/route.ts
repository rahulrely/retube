import  {connect} from "@/dbconfig/dbconfig"
import User from "@/models/userModel"
import { NextRequest,NextResponse } from "next/server"
import { getDataFromToken } from "@/helper/getDataFromToken"

connect();


export async function PSOT(request:NextRequest){
    //extraxt data from token
    const userid = await getDataFromToken(request);
    const user = await User.findOne({_id:userid}).select("-password");
//check if there is no user
    return NextResponse.json({
        message : "User Found",
        data: user
    })
}