import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { error } from "console";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request:NextRequest) {
    try{
        // geting data
        const {email, password} = await request.json()

        if(!email || !password){
            return NextResponse.json(
              {  error: "Email and password are required"},
              {status: 400}
            )
        }
        // check conn
        await connectToDatabase();

        // check existing user
        const existingUser = await User.findOne({email})
        
        if(existingUser){
            return NextResponse.json(
              {  error: "User already registered"},
              {status: 400}
            );
        }

        // create user
        await User.create({ email, password });
        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 201 }
        )
    }catch (error) {
        console.error("Registration error", error);
        return NextResponse.json(
          { error: "Failed to register user" },
          { status: 400 }
        );
      }
}