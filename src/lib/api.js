const configuredBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

if (!configuredBaseUrl) {
    throw new Error('BASE_URL must be configured in .env.local.');
}

export const API_BASE_URL = configuredBaseUrl.replace(/\/$/, '');

export function apiUrl(path) {
    return new URL(path, `${API_BASE_URL}/`).toString();
}
