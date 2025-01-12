import jwt from 'jsonwebtoken';

const secret = 'winb_private_limited'
export const Autherize = async (token: string) => {
    const authState = await jwt.verify(token, secret)
    return authState;
}