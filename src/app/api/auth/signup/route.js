import { NextResponse } from 'next/server';

import { apiUrl } from '@/lib/api';

export async function POST(request) {
    const payload = await request.json().catch(() => null);

    if (!payload?.firstname || !payload?.lastname || !payload?.email || !payload?.password) {
        return NextResponse.json(
            { detail: 'First name, last name, email, and password are required.' },
            { status: 400 },
        );
    }

    try {
        const upstream = await fetch(apiUrl('auth/signup'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            cache: 'no-store',
        });
        const responsePayload = await upstream.json().catch(() => ({}));

        return NextResponse.json(responsePayload, { status: upstream.status });
    } catch {
        return NextResponse.json(
            { detail: 'Authentication service is unavailable.' },
            { status: 503 },
        );
    }
}
