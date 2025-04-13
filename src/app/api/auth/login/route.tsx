import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { generateToken } from "@/lib/auth";

// import { generateToken } from "@/lib/auth";

export async function POST(req: Request) {
  const errorMessage = NextResponse.json(
    {
      status: false,
      message: "Invalid credentials",
      data: null,
      error: {
        code: "INVALID_CREDENTIALS",
        details: {
          username: ["Invalid credentials"],
        },
      },
    },
    { status: 401 }
  );
  try {
    const body = await req.json();
    const { username, password } = body;

    const user = await prisma.user.findUnique({ where: { email: username } });
    if (!user) {
      return errorMessage;
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return errorMessage;
    }
    const token = generateToken({ userId: user.id, role: user.role });

    return NextResponse.json({
      success: true,
      message: "User signup successful",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
      error: null,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Unexpected server error",
        data: null,
        error: {
          code: "SERVER_ERROR",
        },
      },
      { status: 500 }
    );
  }
}
