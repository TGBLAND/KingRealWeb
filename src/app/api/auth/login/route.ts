import { NextRequest } from "next/server";
import { z } from "zod";
import * as crypto from "crypto";
import prisma from "../../../lib/db";
import { errorResponse, successResponse } from "../../../lib/api-response";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// function hashPassword(password: string): string {
//   return crypto.createHash('sha256').update(password).digest('hex');
// }

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const whereClause = id ? { id: id } : {};

    const posts = await prisma.user.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });

    return successResponse(posts);
  } catch (error) {
    console.error("Error fetching user:", error);
    return errorResponse("Failed to fetch user");
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = loginSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.message);
    }

    const { email, password } = validation.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return errorResponse("Invalid email or password", 401);
    }

    console.log("user", body);

    const hashedPassword = password;
    if (user.password !== hashedPassword) {
      return errorResponse("Invalid email or password", 401);
    }

    const { password: _, ...userWithoutPassword } = user;

    return successResponse({
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login error:", error);
    return errorResponse("An unexpected error occurred");
  }
}
