import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "@/lib/auth";
import { schema } from "@/lib/validation/signupSchema";
import { $Enums } from "@/generated/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const result = await schema.safeParseAsync(body);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      return NextResponse.json(
        {
          status: false,
          message: "Validation failed",
          data: null,
          error: {
            code: "VALIDATION_ERROR",
            details: errors,
          },
        },
        { status: 400 }
      );
    }

    const { fullName, email, password, role: roleString } = result.data;

    const role = roleString as $Enums.Role;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        fullName,
        password: hashedPassword,
        role,
      },
    });

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
        error: {
          code: "SERVER_ERROR",
        },
      },
      { status: 500 }
    );
  }
}
