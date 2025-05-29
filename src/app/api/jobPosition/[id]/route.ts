import prisma from "../../../lib/db";
import {
  errorResponse,
  notFoundResponse,
  successResponse,
} from "../../../lib/api-response";
import { NextRequest } from "next/server";
import { z } from "zod";

const updateJobSchema = z.object({
  title: z.string().min(3).optional(),
  description: z.string().min(10).optional(),
  location: z.string().min(2).optional(),
  type: z.string().min(2).optional(),
  level: z.string().min(2).optional(),
  requirements: z.string().min(10).optional(),
  benefits: z.string().min(5).optional(),
  salary: z.string().optional(),
});

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const job = await prisma.jobPosition.findUnique({
      where: { id: (await context.params).id },
    });

    if (!job) {
      return notFoundResponse("Job Position");
    }

    return successResponse(job);
  } catch (error) {
    console.error("Error fetching job position:", error);
    return errorResponse("Failed to fetch job position");
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const existingJob = await prisma.jobPosition.findUnique({
      where: { id: (await context.params).id },
    });

    if (!existingJob) {
      return notFoundResponse("Job Position");
    }

    const body = await request.json();
    const validation = updateJobSchema.safeParse(body);
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

    const updatedJob = await prisma.jobPosition.update({
      where: { id: (await context.params).id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(location && { location }),
        ...(type && { type }),
        ...(level && { level }),
        ...(requirements && { requirements }),
        ...(benefits && { benefits }),
        ...(salary && { salary }),
      },
    });

    return successResponse(updatedJob);
  } catch (error) {
    console.error("Error updating job position:", error);
    return errorResponse("Failed to update job position");
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const existingJob = await prisma.jobPosition.findUnique({
      where: { id: (await context.params).id },
    });

    if (!existingJob) {
      return notFoundResponse("Job Position");
    }

    await prisma.jobPosition.delete({
      where: { id: (await context.params).id },
    });

    return successResponse({ message: "Job Position deleted successfully" });
  } catch (error) {
    console.error("Error deleting job position:", error);
    return errorResponse("Failed to delete job position");
  }
}
