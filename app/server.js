const express = require("express");
require("dotenv").config();

const router = require("./routes/index");

const app=express();


app.use(express.json());

// Middleware для обработки ошибок от express.json()
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      // Перехватываем ошибку парсинга JSON
      return res.status(400).json({
        error: 'Некорректный JSON. Проверьте формат данных.',
      });
    }
    // Передача других ошибок
    next(err);
  });
app.use(router);


const HOST = process.env.HOST;
const PORT = process.env.PORT;

app.listen(PORT,()=>console.log(`http://${HOST}:${PORT}`))