import prisma from "../../lib/db";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "../../lib/api-response";
import { NextRequest } from "next/server";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(3, "Category name must be at least 3 characters"),
  description: z.string().min(5, "Description must be at least 10 characters"),
  slug: z.string(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const whereClause = id ? { id } : {};

    const posts = await prisma.category.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });

    return successResponse(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return errorResponse("Failed to fetch posts");
  }
}
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = categorySchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(
        validation.error.errors.map((err) => err.message).join(", ")
      );
    }

    const { name, description, slug } = validation.data;

    const existingCategory = await prisma.category.findUnique({
      where: { name },
    });

    if (existingCategory) {
      return errorResponse("Category name already exists", 409);
    }
    const category = await prisma.category.create({
      data: {
        name,
        description,
        slug,
      },
    });

    return createdResponse(category);
  } catch (error) {
    console.error("Error creating category:", error);
    return errorResponse("Failed to create category");
  }
}
