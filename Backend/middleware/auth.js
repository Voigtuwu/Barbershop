import { verify } from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Formato: "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido" });
    }

    req.user = user;
    next();
  });
};

const authorize = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles];
  }

  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Acesso negado" });
    }
    next();
  };
};

export default {
  authenticateToken,
  authorize,
};
