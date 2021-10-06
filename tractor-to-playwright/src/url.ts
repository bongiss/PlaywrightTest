export function url (path: string): string {
    if (!path.startsWith('/')) {
        path = `/${path}`;
    }

    let host = process.env.HOST_URL;
    if (!host) {
        throw new Error(`host must be set via process.env.HOST_URL`)
    }

    if (host.endsWith(' ')) {
        host = host.slice(0, -1);
    }

    if (host.endsWith('/')) {
        host = host.slice(0, -1);
    }
    return `${host}${path}`;
}
