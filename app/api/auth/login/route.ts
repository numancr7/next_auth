import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// POST handler for user login
export async function POST(request: NextRequest) {
    try {
        // Parse email and password from request body
        const { email, password } = await request.json();

        // Validate input
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        // Connect to the database
        await connectToDatabase();

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Compare provided password with hashed password in DB
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            );
        }
        

        // Login successful, return user info (never return password)
        return NextResponse.json(
            { message: "Login successful", user: { id: user._id, email: user.email } },
            { status: 200 }
        );
    } catch (error) {
        console.error("Login error", error);
        return NextResponse.json(
            { error: "Failed to login" },
            { status: 500 }
        );
    }
}
