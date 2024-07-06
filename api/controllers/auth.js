import { db } from "../connect.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  //Não pode entrar em nenhum erro, para passar para a próxima parte, do db.query
  if (!username) {
    return res.status(422).json({ msg: "O nome é obrigatório!" });
  }
  if (!email) {
    return res.status(422).json({ msg: "O email é obrigatório!" });
  }
  if (!password) {
    return res.status(422).json({ msg: "A senha é obrigatório!" });
  }
  if (password != confirmPassword) {
    return res.status(422).json({ msg: "As senhas não são iguais!" });
  }

  db.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    async (error, data) => {
      //Pode retornar um erro, ou um pacote de dados
      if (error) {
        console.log(error);
        return res.status(500).json({
          msg: "Aconteceu algum problema no servidor. Tente novamente mais tarde",
        });
      }
      if (data.length > 0) {
        //Se for maior que 0, é porque a query achou um email igual a email
        return res.status(500).json({
          msg: "Este email já está em uso",
        });
      } else {
        console.log(data);
        // Deixando a senha ainda mais difícil, adicionando o salt
        //https://www.npmjs.com/package/bcrypt
        const saltRounds = 8;
        const salt = bcrypt.genSaltSync(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        db.query(
          "INSERT INTO users SET ?",
          {
            //Já que o nome no DB é o mesmo da variável, não preciso salvar como email:email
            username,
            email,
            password: passwordHash,
          },
          (error) => {
            if (error) {
              console.log(error);
              return res.status(500).json({
                msg: "Ops, aconteceu um erro no servidor. Tente novamente mais tarde.",
              });
            } else {
              return res
                .status(200)
                .json({ msg: "Cadastro executado com sucesso." });
            }
          }
        );
      }
    }
  );
};

export const login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (error, data) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          msg: "Aconteceu algum problema no servidor. Tente novamente mais tarde",
        });
      }
      if (data.length == 0) {
        return res.status(404).json({
          msg: "Usuário não encontrado!",
        });
      } else {
        const user = data[0]; //Já que devolve um array, preciso acessar a posição dele
        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
          return res.status(422).json({ msg: "Senha incorreta" });
        }

        try {
          //Fazendo a validação para ver se o usuário está logado

          /*
jwt.sign(payload, secret, options): Gera um token JWT.
payload: Os dados que você quer incluir no token. Aqui, você inclui a expiração (exp) e o ID do usuário (id).
secret: A chave secreta usada para assinar o token. (process.env.REFRESH).
options: As opções para assinar o token, como o algoritmo (HS256).

res.cookie(name, value, options):
name: O nome do cookie.
value: O valor do cookie.
options: Opções adicionais para o cookie.
{ httpOnly: true }: Faz com que o cookie seja inacessível a scripts do lado do cliente, melhorando a segurança.
*/
          const refreshToken = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
              id: user.password,
            },
            process.env.REFRESH,
            { algorithm: "HS256" }
          );
          const token = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 3600,
              id: user.password,
            },
            process.env.TOKEN,
            { algorithm: "HS256" }
          );
          delete user.password;
          res
            .cookie("accessToken", token, {
              httpOnly: true,
              secure: true, // Garante que o cookie só seja enviado por HTTPS
              sameSite: "None", // Permite o envio do cookie em solicitações cross-site
              // maxAge: 3600000, // Define o tempo de expiração do cookie em milissegundos (1 hora)
            })
            .cookie("refreshToken", refreshToken, {
              httpOnly: true,
              secure: true, // Garante que o cookie só seja enviado por HTTPS
              sameSite: "None", // Permite o envio do cookie em solicitações cross-site
              // maxAge: 3600000, // Define o tempo de expiração do cookie em milissegundos (1 hora)
            })
            .status(200)
            .json({
              msg: "Usuário logado com sucesso!",
              user,
            });
        } catch (err) {
          console.log(err);
          return res.status(500).json({
            msg: "Aconteceu algum problema no servidor. Tente novamente mais tarde",
          });
        }
      }
    }
  );
};

export const refresh = (req, res) => {
  /*
  O headers.cookie vem assim cookie: 'accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTU4NDUyMDUsImlkIjoiJDJiJDA4JFREV2pWYlFwMGhSL1g4UWgxUVBpdk9QRmp5N21KeDU1SFR0UWNXckJjcGdHVXRmR04zeEFXIiwiaWF0IjoxNzE1ODQxNjA1fQ.e5Em6PLVECAcUtydcaTpPZG_uzyTk3JzmsBTUtcl8Gs; refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTU5MjgwMDUsImlkIjoiJDJiJDA4JFREV2pWYlFwMGhSL1g4UWgxUVBpdk9QRmp5N21KeDU1SFR0UWNXckJjcGdHVXRmR04zeEFXIiwiaWF0IjoxNzE1ODQxNjA1fQ.7Nl35wcuVT3Z_Ok0HFDNPkS4Y7bio7S0UftVD2PvoE4',
  'if-none-match': 'W/"27-C71jFqbxF7yB7qZhENEH2/NbLzc"
  */
  const authHeader = req.headers.cookie?.split("; ")[1];
  const refresh = authHeader && authHeader.split("=")[1];
  const tokenStruct = refresh.split(".")[1]; //ATÉ AQUI SERVE PARA PEGAR A SENHA DO USUÁRIO, PARA FAZRE UM NOVO TOKEN. Que é o id de cada token, sem o usuário ter que digitar novamente

  const payload =
    atob(
      tokenStruct
    ); /*Descriptografar o token na base64, que foi o que usei para definir o secret que coloquei no TOKEN em .env. 
  Utilizando o comando node -e "console.log(require('crypto').randomBytes(256).toString('base64'))"*/

  //Refazendo um novo token
  try {
    const refreshToken = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
        id: JSON.parse(payload).id,
      },
      process.env.REFRESH,
      { algorithm: "HS256" }
    );
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 3600,
        id: JSON.parse(payload).id, //Recebe o payload em string, então transformo em JSON e pego id, q é o password
      },
      process.env.TOKEN,
      { algorithm: "HS256" }
    );
    res
      .cookie("accessToken", token, { httpOnly: true })
      .cookie("refreshToken", refreshToken, { httpOnly: true })
      .status(200)
      .json({
        msg: "Token atualizado com sucesso!",
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Aconteceu algum problema no servidor. Tente novamente mais tarde",
    });
  }
};

export const logout = (req, res) => {
  /*
  clearCookie = Função do EXPRESS
  secure: true: Indica que o cookie deve ser enviado apenas em conexões HTTPS.
  sameSite: "none": Indica que o cookie deve ser enviado em solicitações cross-site, útil para contextos onde o servidor e o cliente estão em domínios diferentes.
  */
  return res
    .clearCookie("accessToken", { secure: true, sameSite: "none" })
    .clearCookie("refreshToken", { secure: true, sameSite: "none" })
    .status(200)
    .json({ msg: "Logout efetuado com sucesso" });
};
