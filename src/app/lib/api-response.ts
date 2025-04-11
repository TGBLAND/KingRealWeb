import { NextResponse } from 'next/server';

export type ApiResponse<T = unknown> = {
    success: boolean;
    data?: T;
    error?: string;
};

export function successResponse<T>(data: T): NextResponse<ApiResponse<T>> {
    return NextResponse.json(
        {
            success: true,
            data,
        },
        { status: 200 }
    );
}

export function errorResponse(error: string, status = 400): NextResponse<ApiResponse> {
    return NextResponse.json(
        {
            success: false,
            error,
        },
        { status }
    );
}

export function notFoundResponse(resource = 'Resource'): NextResponse<ApiResponse> {
    return errorResponse(`${resource} not found`, 404);
}

export function createdResponse<T>(data: T): NextResponse<ApiResponse<T>> {
    return NextResponse.json(
        {
            success: true,
            data,
        },
        { status: 201 }
    );
}
