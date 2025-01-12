import  jwt from 'jsonwebtoken'

const secret = 'winb_private_limited'
export const getToken = async (userid: number) => {
    const token = await jwt.sign({id: userid}, secret, {expiresIn: '1h'})
    return token;
}