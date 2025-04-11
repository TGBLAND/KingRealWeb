import prisma from "../../lib/db";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "../../lib/api-response";
import { NextRequest } from "next/server";
import { z } from "zod";

const productSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  image: z.string().url("Invalid image URL"),
  categoryId: z.string().min(1, "Category is required"),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const whereClause = id ? { id: Number(id) } : {};

    const products = await prisma.product.findMany({
      where: whereClause,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return successResponse(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return errorResponse("Failed to fetch products");
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = productSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.message);
    }

    const { name, description, categoryId, image } = validation.data;

    // If categoryId is provided, check if it exists
    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: Number(categoryId) },
      });

      if (!category) {
        return errorResponse("Category not found", 404);
      }
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        image,
        categoryId: Number(categoryId),
      },
      include: {
        category: true,
      },
    });

    return createdResponse(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return errorResponse("Failed to create product");
  }
}
