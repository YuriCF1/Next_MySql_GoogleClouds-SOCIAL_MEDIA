// import jwt from "jsonwebtoken";

// export const checkToken = (req, res, next) => {
//   const authHeader = req.headers.cookie?.split("; ")[0]; //Desistruturando o token
//   const token = authHeader && authHeader.split("=")[1];

//   if (token) {
//     try {
//       jwt.verify(token, process.env.TOKEN);
//       next();
//     } catch (error) {
//       console.log(error);
//       res.status(400).json({ msg: "Token inválido" });
//     }
//   } else {
//     return res.status(401).json({ msg: "Acesso negado" });
//   }
// };

import jwt from "jsonwebtoken";

export const checkToken = (req, res, next) => {
  // Extrair o cookie de autorização
  const authHeader = req.headers.cookie
    ?.split("; ")
    .find(cookie => cookie.startsWith("accessToken="));

  // Extrair o token do cookie
  const token = authHeader && authHeader.split("=")[1];

  if (token) {
    try {
      // Verificar o token
      jwt.verify(token, process.env.TOKEN);
      next();
    } catch (error) {
      console.log(error);
      if (error.name === "TokenExpiredError") {
        res.status(401).json({ msg: "Token expirado" });
      } else if (error.name === "JsonWebTokenError") {
        res.status(400).json({ msg: "Token inválido" });
      } else {
        res.status(400).json({ msg: "Erro de autenticação" });
      }
    }
  } else {
    return res.status(401).json({ msg: "Acesso negado. Token não fornecido" });
  }
};
