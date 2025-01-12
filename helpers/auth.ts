import jwt, { JwtPayload, JsonWebTokenError } from 'jsonwebtoken';

const secret = 'winb_private_limited';

interface AuthPayload extends JwtPayload {
  id: string; 
}

export const Autherize = async (token: string): Promise<AuthPayload | null> => {
    
    try {
        const authState = jwt.verify(token, secret) as AuthPayload; // Cast the decoded token to AuthPayload
        return authState;
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            if (error.name === 'TokenExpiredError') {
                console.log("JWT token has expired.");
                throw new Error('JWT token expired'); 
            }
            throw error;
        }
        return null;
    }
}
