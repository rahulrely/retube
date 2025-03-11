import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helper/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;  

        // Validation
        console.log(reqBody);

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User Not Found" }, { status: 400 });
        }
        console.log("User found");

        // Check password (Use await)
        const validPassword = await user.isPasswordCorrect(password);
        if (!validPassword) {
            return NextResponse.json({ error: "Password is Wrong" }, { status: 400 });
        }

        console.log("Password is correct");

        // Generate Access Token
        const accessToken = user.generateAccessToken();

        // Create response
        const response = NextResponse.json({
            message: "Logged In Success",
            success: true
        }, { status: 200 });

        // Set cookie
        response.cookies.set("token", accessToken, { httpOnly: true });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });  
    }
}
