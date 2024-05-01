import { db } from "../connect.js";
import bcrypt from "bcrypt";

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
    "SELECT email FROM user WHERE email = ?",
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
          "INSERT INTO user SET ?",
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

export const login = (req, res) => {};
