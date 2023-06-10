import {hash, genSalt, compare} from 'bcryptjs';

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await genSalt();
    return hash(password, salt);
}

export const comparePassword = async (passwordInput: string, passwordDb: string): Promise<boolean> => {
    return compare(passwordInput, passwordDb);
}

