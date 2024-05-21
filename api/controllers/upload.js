import multer from "multer"; //Importa o módulo multer, que é um middleware para lidar com uploads de arquivos em formulários multipart/form-data no Node.js.
import path from "path"; //Importa o módulo path, que fornece utilitários para trabalhar com caminhos de arquivos e diretórios.
import { fileURLToPath } from "url"; //Importa a função fileURLToPath do módulo url. Esta função converte um URL de arquivo (como import.meta.url) em um caminho de arquivo.
import fs from "fs"; // Importa o módulo fs (sistema de arquivos), que permite interagir com o sistema de arquivos do computador, como ler, escrever e criar diretórios.

// Converte import.meta.url para __dirname
const __filename = fileURLToPath(import.meta.url); //Pega o caminho do arquivo + o nome do arquivo
const __dirname = path.dirname(__filename); //Extrai o caminho do carquivo, retirando o nome do arquivo

console.log("Filename", __filename);
console.log("Dirname", __dirname);

/*Resolve um caminho absoluto para o diretório de upload. Combina __dirname com o caminho relativo ../../client/social-media/public/upload, 
garantindo que o caminho resultante seja absoluto e independente do diretório atual de execução do script.*/
const uploadPath = path.resolve(
  __dirname,
  "../../client/social-media/public/upload"
);

// Verifique se o diretório existe, se não, crie-o
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage: storage });

export const uploadController = (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
};
