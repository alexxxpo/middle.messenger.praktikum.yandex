import express from "express";
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Middleware для раздачи статических файлов из папки 'public'
app.use(express.static('dist'));


app.all("*", (_req, res) => {
  try {
    res.contentType('.html')
    res.sendFile(path.resolve( __dirname, './dist/index.html'));

  } catch (error) {
    res.json({ success: false, message: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
