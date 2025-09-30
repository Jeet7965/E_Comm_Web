import jwt from 'jsonwebtoken'

export const AuthVerifyToken = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({
                message: "No token provided or invalid format",
                success: false
            });
        }

        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decodedToken
        console.log(decodedToken)
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).send({
            success: false,
            message: "Invalid or expired token",
        });
    }

}


export const authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ success: false, message: "Access denied" });
  }
  next();
};

