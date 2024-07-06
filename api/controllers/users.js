import { db } from "../connect.js";

export const getUser = (req, res) => {
  const id = req.query.id;

  if (!id) {
    res.status(422).json({ msg: "O id do usuário é necessário" });
  }

  db.query(
    "SELECT username, userImg, bgImg FROM users WHERE id = ?",
    [id],
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

export const updateUser = (req, res) => {
  const { id, username, userImg, bgImg } = req.body;

  if (!username || !userImg || !bgImg) {
    return res
      .status(422)
      .json({ msg: "Algum dado precisa ser enviado para a atualização!" });
  }

  db.query(
    "UPDATE users SET username = ?, userImg = ?, bgImg = ? WHERE id = ?",
    [username, userImg, bgImg, id],
    (error, data) => {
      if (error) {
        return res.status(500).json({
          msg: "Ops, aconteceu um erro no servidor. Tente novamente mais tarde.",
        });
      } else if (data.affectedRows > 0) {
        //Vai retornar as linhas afetadas
        return res.status(200).json("Atualizado com sucesso");
      } else {
        return res
          .status(404)
          .json("Usuário não encontrado ou nenhum dado foi atualizado");
      }
    }
  );
};
