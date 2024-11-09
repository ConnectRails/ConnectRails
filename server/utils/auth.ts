import {bcrypt, bcryptVerify} from "hash-wasm";

export async function verifyPassword(password: string, hash: string) {
    return await bcryptVerify({
        password,
        hash
    });
}

export async function hashPassword(password: string) {
    const salt = new Uint8Array(16);
    crypto.getRandomValues(salt);
    return await bcrypt({
        password,
        salt,
        costFactor: 12
    });
}
