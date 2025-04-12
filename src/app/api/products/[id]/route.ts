import prisma from "../../../lib/db";
import {
  errorResponse,
  notFoundResponse,
  successResponse,
} from "../../../lib/api-response";
import { NextRequest } from "next/server";
import { z } from "zod";

const updateProductSchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().optional(),
  image: z.string().url("Invalid image URL").optional(),
  categoryId: z.string().optional(),
});

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: (await context.params).id },
      include: {
        category: true,
      },
    });

    if (!product) {
      return notFoundResponse("Product");
    }

    return successResponse(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return errorResponse("Failed to fetch product");
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id: (await context.params).id },
    });

    if (!existingProduct) {
      return notFoundResponse("Product");
    }

    const body = await request.json();

    const validation = updateProductSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.message);
    }

    const { name, description, categoryId, image } = validation.data;

    if (categoryId) {
      const category = await prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!category) {
        return errorResponse("Category not found", 404);
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { id: (await context.params).id },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(categoryId !== undefined && { categoryId }),
        ...(image !== undefined && { image }),
      },
      include: {
        category: true,
      },
    });

    return successResponse(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return errorResponse("Failed to update product");
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id: (await context.params).id },
    });

    if (!existingProduct) {
      return notFoundResponse("Product");
    }

    await prisma.product.delete({
      where: { id: (await context.params).id },
    });

    return successResponse({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return errorResponse("Failed to delete product");
  }
}
