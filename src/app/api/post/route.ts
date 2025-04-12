import prisma from "../../lib/db";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "../../lib/api-response";
import { NextRequest } from "next/server";
import { z } from "zod";

const postSchema = z.object({
  title: z.string().min(2),
  description: z.string(),
  image: z.string(),
  category: z.string(),
  author: z.string(),
  slug: z.string(),
  content: z.string(),
  isLatest: z.boolean(),
  createdAt: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    })
    .default(() => new Date().toISOString()),
  updatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const whereClause = id ? { id: id } : {};

    const posts = await prisma.post.findMany({
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

    const validation = postSchema.safeParse(body);
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
    const existingPost = await prisma.post.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return errorResponse("Slug already exists", 400);
    }
    const post = await prisma.post.create({
      data: {
        title,
        description,
        image,
        category,
        author,
        slug,
        content,
        isLatest,
      },
    });

    return createdResponse(post);
  } catch (error) {
    console.error("Error creating post:", error);
    return errorResponse("Failed to create post");
  }
}
