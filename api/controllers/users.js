import { db } from "../connect.js";

export const getUser = (req, res) => {
  const id = req.query.id;

  if (!id) {
    res.status(422).json({ msg: "O id do usuário é necessário" });
  }

  db.query(
    "SELECT username, userImg, bgImg FROM user WHERE id = ?",
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
