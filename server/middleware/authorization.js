import jwt from "jsonwebtoken";

export default async function Auth(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodeToken = await jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    req.user = decodeToken;
    next();
  } catch (error) {
    res.status(401).json({ error: "authentication failed" });
  }
}
