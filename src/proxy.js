import { NextResponse } from 'next/server';

import { REFRESH_TOKEN_COOKIE } from './lib/session';

export function proxy(request) {
    if (!request.cookies.has(REFRESH_TOKEN_COOKIE)) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|auth|_next/static|_next/image|favicon.ico).*)'],
};
