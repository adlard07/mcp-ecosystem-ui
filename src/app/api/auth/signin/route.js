import { NextResponse } from 'next/server';

import { proxyAuthentication } from '@/lib/auth';

export async function POST(request) {
    const body = await request.json().catch(() => null);
    const identifier = body?.identifier?.trim();
    const password = body?.password;

    if (!identifier || typeof password !== 'string' || !password) {
        return NextResponse.json(
            { detail: 'Email and password are required.' },
            { status: 400 },
        );
    }

    return proxyAuthentication('auth/signin', { email: identifier, password });
}
