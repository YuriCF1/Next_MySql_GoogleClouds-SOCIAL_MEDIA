import { db } from "../connect.js";

export const searchUser = (req, res) => {
  const params = "%" + req.query.params + "%";
  if (!params) {
    res.status(422).json({ msg: "O parâmetro de busca precisa ser definido" });
  }

  db.query(
    "SELECT username, id, userImg, bgImg FROM users WHERE username LIKE ?",
    [params],
    (error, data) => {
      if (error) {
        res.status(500).json({
          msg: "Ops, aconteceu um erro no servidor. Tente novamente mais tarde.",
        });
      } else {
        res.status(200).json(data);
      }
    }
  );
};

export const searchPost = (req, res) => {
  const params = "%" + req.query.params + "%"; //% = Curinga, busca o termo existente em qualquer posição do texto
  if (!params) {
    res.status(422).json({ msg: "O parâmetro de busca precisa ser definido" });
  }

  /*
  O operador = é usado para comparação exata. Ele retorna registros onde o valor da coluna é exatamente igual ao valor especificado.

  O operador LIKE é usado para comparação parcial com padrões. Ele permite o uso de curingas (% e _) para buscar valores que correspondem a um padrão específico.
  */
  db.query(
    "SELECT p.*, u.username, userImg FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.post_desc LIKE ? OR u.username LIKE ? ORDER BY created_at DESC",
    [params, params],
    (error, data) => {
      if (error) {
        res.status(500).json({
          msg: "Ops, aconteceu um erro no servidor. Tente novamente mais tarde.",
        });
      } else {
        res.status(200).json(data);
      }
    }
  );
};
