import cookie from 'cookie';

export function setCookie(name: string, value: string) {
    const cookieOptions = {
        path: '/',
        maxAge: 86400
    };

    document.cookie = cookie.serialize(name, value);
}

export function getCookie(name: string) {
    const cookies = cookie.parse(document.cookie);
    return cookies[name];
}
