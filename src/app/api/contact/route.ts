import prisma from "../../lib/db";
import {
  createdResponse,
  errorResponse,
  successResponse,
} from "../../lib/api-response";
import { NextRequest } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Họ tên là bắt buộc"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(1, "Số điện thoại là bắt buộc"),
  subject: z.string().min(1, "Chủ đề là bắt buộc"),
  message: z.string().min(1, "Nội dung là bắt buộc"),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const whereClause = id ? { id: id } : {};

    const posts = await prisma.contact.findMany({
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

    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      return errorResponse(
        validation.error.errors.map((err) => err.message).join(", "),
        400
      );
    }

    const { name, email, phone, subject, message } = validation.data;

    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        subject,
        message,
      },
    });

    return createdResponse(contact);
  } catch (error) {
    console.error("Error creating contact:", error);
    return errorResponse("Không thể gửi thông tin, vui lòng thử lại sau", 500);
  }
}
