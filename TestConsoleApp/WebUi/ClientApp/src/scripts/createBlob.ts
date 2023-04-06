import {Buffer} from 'buffer';

const createBlob = (object: any, type:string) => {
    
    const byteCharacters = Buffer.from(object, 'base64');
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters[i];
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {type: type});
    return blob
}

export default createBlob