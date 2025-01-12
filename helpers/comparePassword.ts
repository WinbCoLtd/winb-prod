import bcrypt from 'bcrypt'

export const comparePassword = async (userPassword: string, dbPassword: string ) => {
    const checkState = await bcrypt.compare(userPassword, dbPassword);

    return checkState;
}