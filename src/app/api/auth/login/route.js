import { NextResponse } from 'next/server';

import { REFRESH_TOKEN_COOKIE, proxyAuthentication } from '@/lib/auth';

export async function POST(request) {
    const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

    if (!refreshToken) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return proxyAuthentication('auth/login', { refresh_token: refreshToken });
}
