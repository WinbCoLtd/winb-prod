import jwt from 'jsonwebtoken';

const secret = 'winb_private_limited';

export const getToken = async (userid: number) => {
    try {
        const token = await jwt.sign({ id: userid }, secret, { expiresIn: '100000d' }); // Set expiration to 1 day
        return token;
    } catch (error) {
        console.error('Error generating token:', error);
        throw new Error('Failed to generate token');
    }
};
