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

export const truncateDescription = (desc: string, maxLength: number) => {
    return desc.length > maxLength ? desc.substring(0, maxLength) + '...' : desc;
};

export const RGBAverage = (base64: string) => {
    const image = base64;
    const img = new Image();
    img.src = image;

    img.onload = () => {
        // Create a canvas element
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');

        // Draw the image onto the canvas
        ctx!.drawImage(img, 0, 0, img.width, img.height);

        // Get pixel data from the canvas
        const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        // Initialize RGB sums
        let totalR = 0;
        let totalG = 0;
        let totalB = 0;

        // Loop through each pixel (4 values per pixel: R, G, B, A)
        for (let i = 0; i < pixels.length; i += 4) {
            totalR += pixels[i]; // Red
            totalG += pixels[i + 1]; // Green
            totalB += pixels[i + 2]; // Blue
        }

        // Calculate the number of pixels
        const numPixels = pixels.length / 4;

        // Calculate the average RGB values
        const avgR = totalR / numPixels;
        const avgG = totalG / numPixels;
        const avgB = totalB / numPixels;

        // Set RGBString
        const RGBString = `rgb(${avgR.toFixed(0)},${avgG.toFixed(0)},${avgB.toFixed(0)})`;
        return RGBString;
    };

    img.onerror = (err) => {
        console.error('Image loading error:', err);
    };
};
