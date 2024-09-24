import { getCookie } from './cookie';

export const IsLogged = async () => {
    const GetJWT = await getCookie('AuthToken');

    if (!GetJWT) {
        console.log('Žádný JWT token, uživatel není přihlášen.');
        return false;
    } else {
        return true;
    }
};

export const CenaBezDPH = (price: number) => {
    const sazba = 1.21;
    const result = price / sazba;
    const fixed = result.toFixed(2);
    return fixed;
};
