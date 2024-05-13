import { db } from "../connect.js";

export const createPost = (req, res) => {
  const { post_desc, img, userId } = req.body;

  if (!post_desc && !img) {
    return res
      .status(422)
      .json({ msg: "O post precisa ter umt exto ou uma imagem!" });
  }

  db.query("INSERT INTO post SET ?", { desc, img, userId }, (error) => {
    if (error) {
      console.log(error);
      return res.status(500).json({
        msg: "Aconteceu algum erro no servidor, tente novamente mais tarde.",
      });
    } else {
      return res.status(200).json({ msg: "Post realizado com sucesso!" });
    }
  });
};

export const getPost = () => {};
