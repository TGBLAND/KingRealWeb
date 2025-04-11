import prisma from '../../../lib/db';
import { errorResponse, notFoundResponse, successResponse } from '../../../lib/api-response';
import { NextRequest } from 'next/server';
import { z } from 'zod';

const updateCategorySchema = z.object({
    name: z.string().min(2).optional(),
    image: z.string().url().optional(),
    description: z.string().min(10).optional(),
});

export async function GET(
    request: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const category = await prisma.category.findUnique({
            where: { id: params.id },
            include: {
                products: true,
                _count: {
                    select: {
                        products: true,
                    },
                },
            },
        });

        if (!category) {
            return notFoundResponse('Category');
        }

        return successResponse(category);
    } catch (error) {
        console.error('Error fetching category:', error);
        return errorResponse('Failed to fetch category');
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: number } }
) {
    try {

        const existingCategory = await prisma.category.findUnique({
            where: { id: Number(params.id) }
        });

        if (!existingCategory) {
            return notFoundResponse('Category');
        }

        const body = await request.json();

        const validation = updateCategorySchema.safeParse(body);
        if (!validation.success) {
            return errorResponse(validation.error.message);
        }

        const { name } = validation.data;

        if (name && name !== existingCategory.name) {
            const nameExists = await prisma.category.findUnique({
                where: { name },
            });

            if (nameExists) {
                return errorResponse('Category name is already taken', 409);
            }
        }

        const updatedCategory = await prisma.category.update({
            where: { id: Number(params.id) },
            data: {
                ...(name && { name }),
            },
        });

        return successResponse(updatedCategory);
    } catch (error) {
        console.error('Error updating category:', error);
        return errorResponse('Failed to update category');
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: number } }
) {
    try {
        const existingCategory = await prisma.category.findUnique({
            where: { id: Number(params.id) },
            include: {
                _count: {
                    select: {
                        products: true,
                    },
                },
            },
        });

        if (!existingCategory) {
            return notFoundResponse('Category');
        }

        if (existingCategory._count.products > 0) {
            return errorResponse(
                'Cannot delete category that has products. Move or delete the products first.',
                400
            );
        }

        await prisma.category.delete({
            where: { id: Number(params.id) }
        });

        return successResponse({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        return errorResponse('Failed to delete category');
    }
}
