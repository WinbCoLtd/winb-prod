import jwt, { JwtPayload, JsonWebTokenError } from "jsonwebtoken";

const secret = "winb_private_limited";

interface AuthPayload extends JwtPayload {
  id: string; 
}

export const Autherize = async (token: string): Promise<AuthPayload> => {
  try {
    const authState = jwt.verify(token, secret) as AuthPayload;
    return authState;
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      // Log error details for debugging
      console.error(`JWT Error: ${error.name} - ${error.message}`);
      throw error; // Rethrow the original error
    }
    console.error("Unexpected authorization error:", error);
    throw new Error("Authorization error");
  }
};
