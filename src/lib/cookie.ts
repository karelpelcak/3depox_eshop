import cookie from 'cookie';

export function setCookie(name: string, value: string) {
    if (typeof document !== 'undefined') {
        const cookieOptions = {
            path: '/',
            maxAge: 86400 
        };
        document.cookie = cookie.serialize(name, value, cookieOptions);
    }
}

export function getCookie(name: string) {
    if (typeof document !== 'undefined') {
        const cookies = cookie.parse(document.cookie);
        return cookies[name];
    }
    return undefined;
}

export function removeCookie(name: string) {
    if (typeof document !== 'undefined') {
        const cookieOptions = {
            path: '/',
            maxAge: -1 
        };
        document.cookie = cookie.serialize(name, '', cookieOptions);
    }
}
