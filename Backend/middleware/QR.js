const qr = require('qrcode');

const GenrateQR = async (text) => {
    try {
        const url = await qr.toDataURL(text); 
        return url;
    } catch (error) {
        console.log("QR Error", error);
        throw error; 
    }
}

module.exports = GenrateQR;
