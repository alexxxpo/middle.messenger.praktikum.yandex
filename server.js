import express from "express";
const app = express();
const port = 3000;

// Middleware для раздачи статических файлов из папки 'public'
app.use(express.static("dist"));

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
