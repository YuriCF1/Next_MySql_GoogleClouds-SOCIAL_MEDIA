import { db } from "../connect.js";

export const addFriendship = (req, res) => {
  const { fallower_id, fallowed_id } = req.body;
  db.query(
    "INSERT INTO friendship SET ?",
    { fallower_id, fallowed_id },
    (error) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          msg: "Aconteceu algum erro no servidor, tente novamente mais tarde.",
        });
      } else {
        return res.status(200).json({ msg: "Você está seguindo esse usuário" });
      }
    }
  );
};

export const getFriendship = (req, res) => {
  db.query(
    "SELECT f.*, u.username, u.userImg FROM friendship AS f JOIN user AS u ON (u.id = fallowed_id) WHERE fallower_id = ?",
    [req.query.fallower_id],
    (error, data) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          msg: "Aconteceu algum erro no servidor, tente novamente mais tarde.",
        });
      } else if (data) {
        return res.status(200).json({ data });
      }
    }
  );
};

export const deleteFriendship = (req, res) => {
  const { fallower_id, fallowed_id } = req.query;
  db.query(
    "DELETE FROM friendship WHERE `fallower_id` = ? AND `fallowed_id` = ?",
    [fallower_id, fallowed_id],
    (error) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          msg: "Aconteceu algum erro no servidor, tente novamente mais tarde.",
        });
      } else {
        return res
          .status(200)
          .json({ msg: "Você não segue mais esse usuário" });
      }
    }
  );
};
