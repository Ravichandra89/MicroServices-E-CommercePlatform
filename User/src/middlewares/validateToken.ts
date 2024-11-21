import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const validateToken = async (req: any, res: any, next: any) => {
  try {
    let token: any;
    const Secret = process.env.SECRET_TOKEN || "HElloRavi";

    // Check for Authorization header and get the token
    const authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1]; // Get token part after 'Bearer'
    }

    if (!token) {
      return res.status(403).json({
        message: "Token is required",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, Secret);

    // Attach the decoded user information to the request object for further use
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export default validateToken;
