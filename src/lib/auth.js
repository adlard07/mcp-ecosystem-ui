import { NextResponse } from 'next/server';

import { apiUrl } from './api';
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from './session';

export { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE };

function expirationFromToken(token) {
    try {
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64url').toString('utf8'));
        return typeof payload.exp === 'number' ? new Date(payload.exp * 1000) : undefined;
    } catch {
        return undefined;
    }
}

function setSessionCookies(response, tokens) {
    const sharedOptions = {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
    };

    response.cookies.set(ACCESS_TOKEN_COOKIE, tokens.access_token, {
        ...sharedOptions,
        expires: expirationFromToken(tokens.access_token),
    });
    response.cookies.set(REFRESH_TOKEN_COOKIE, tokens.refresh_token, {
        ...sharedOptions,
        expires: expirationFromToken(tokens.refresh_token),
    });
}

export async function proxyAuthentication(endpoint, body) {
    let upstream;

    try {
        upstream = await fetch(apiUrl(endpoint), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
            cache: 'no-store',
        });
    } catch {
        return NextResponse.json(
            { detail: 'Authentication service is unavailable.' },
            { status: 503 },
        );
    }

    const payload = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
        return NextResponse.json(
            { detail: payload.detail || 'Authentication failed.' },
            { status: upstream.status },
        );
    }

    if (!payload.access_token || !payload.refresh_token) {
        return NextResponse.json(
            { detail: 'Authentication service returned an invalid response.' },
            { status: 502 },
        );
    }

    const response = NextResponse.json({ authenticated: true });
    setSessionCookies(response, payload);
    return response;
}
