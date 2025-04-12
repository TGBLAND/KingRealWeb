import prisma from "../../lib/db";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "../../lib/api-response";
import { NextRequest } from "next/server";
import { z } from "zod";

const jobSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  location: z.string().min(2),
  type: z.string().min(2),
  level: z.string().min(2),
  requirements: z.string().min(10),
  benefits: z.string().min(5),
  salary: z.string().min(3),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const whereClause = id ? { id: id } : {};

    const products = await prisma.jobPosition.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });

    return successResponse(products);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return errorResponse("Failed to fetch posts");
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = jobSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(validation.error.message);
    }

    const {
      title,
      description,
      location,
      type,
      level,
      requirements,
      benefits,
      salary,
    } = validation.data;

    // const existingJob = await prisma.jobPosition.findUnique({
    //     where: { title },
    // });

    // if (existingJob) {
    //     return errorResponse("Job title already exists", 400);
    // }
    const job = await prisma.jobPosition.create({
      data: {
        title,
        description,
        location,
        type,
        level,
        requirements,
        benefits,
        salary,
      },
    });

    console.log("Created job:", job);
    return createdResponse(job);
  } catch (error) {
    console.error("Error creating jobPosition:", error);
    return errorResponse("Failed to create jobPosition");
  }
}
