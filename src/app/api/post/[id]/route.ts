import prisma from "../../../lib/db";
import {
  errorResponse,
  notFoundResponse,
  successResponse,
} from "../../../lib/api-response";
import { NextRequest } from "next/server";
import { z } from "zod";

const updatePostSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  image: z.string().url().optional(),
  category: z.string().min(2).optional(),
  author: z.string().min(2).optional(),
  slug: z.string().min(3).optional(),
  content: z.string().min(20).optional(),
  isLatest: z.boolean(),
});

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: (await context.params).id },
    });

    if (!post) {
      return notFoundResponse("Post");
    }

    return successResponse(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return errorResponse("Failed to fetch post");
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const existingPost = await prisma.post.findUnique({
      where: { id: (await context.params).id },
    });

    if (!existingPost) {
      return notFoundResponse("Post");
    }

    const body = await request.json();
    const validation = updatePostSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.message);
    }

    const {
      title,
      description,
      image,
      category,
      author,
      slug,
      content,
      isLatest,
    } = validation.data;

    if (slug && slug !== existingPost.slug) {
      const slugExists = await prisma.post.findUnique({
        where: { slug },
      });

      if (slugExists) {
        return errorResponse("Slug already exists", 409);
      }
    }

    const updatedPost = await prisma.post.update({
      where: { id: (await context.params).id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(image && { image }),
        ...(category && { category }),
        ...(author && { author }),
        ...(slug && { slug }),
        ...(content && { content }),
        ...(isLatest !== undefined && { isLatest }),
      },
    });

    return successResponse(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    return errorResponse("Failed to update post");
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const existingPost = await prisma.post.findUnique({
      where: { id: (await context.params).id },
    });

    if (!existingPost) {
      return notFoundResponse("Post");
    }
    await prisma.post.delete({
      where: { id: (await context.params).id },
    });

    return successResponse({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return errorResponse("Failed to delete post");
  }
}
