const jwt = require('jsonwebtoken');
const { pathToRegexp, match } = require('path-to-regexp');

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

const authenticateToken = (req, res, next) => {
    // Извлекаем токен из заголовка Authorization
    const token = req.header('Authorization')?.split(' ')[1];  // 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Декодируем токен и проверяем его действительность
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;  // Добавляем информацию о пользователе в запрос
        console.log(decoded);
        next();  // Переходим к следующему middleware или обработчику маршрута
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

function abacMiddleware(req, res, next) {

    const user = req.user; // Данные пользователя из JWT
    const method = req.method; // HTTP-метод (GET, POST, PUT, DELETE и т.д.)

    // Определяем разрешенные действия
    const rules = {
    Admin: ["GET", "POST", "PUT", "DELETE"],
    guest: ["GET"],
    };

    // Проверяем, есть ли у пользователя право на выполнение метода
    const allowedMethods = rules[user.role] || [];
    if (allowedMethods.includes(method)) {
    return next(); // Доступ разрешен
    }

    // Если метод не разрешен, возвращаем ошибку
    res.status(403).json({ error: "Доступ запрещен" });

}


function aclMiddleware(req, res, next) {

    const acl = {
        Admin: {
            '/users': ['GET', 'POST', 'PUT', 'DELETE'],
            '/stations': ['GET', 'POST', 'PUT', 'DELETE'],
        },
        guest: {
            '/stations': ['GET'],
        },
    };


    const rolePermissions = {
        guest: [
          { method: ['GET'], path: /^\/stations(\/\d+)?$/ },
          { method: ['GET'], path: /^\/measurements(\/\d+)?$/ },
        ],
        Admin: [
          { method: ['GET','POST','PUT','DELETE'], path: /^\/users(\/\d+)?$/ },
          { method: ['GET','POST','PUT','DELETE'], path: /^\/stations(\/\d+)?$/ },
          { method: ['GET','POST','PUT','DELETE'], path: /^\/measurements(\/\d+)?$/ },
        ],
      };

    const userRole = req.user.role;
    const resource = req.path;
    //console.log(req);
    const method = req.method;

    // Проверяем, есть ли у роли права на ресурс и метод
    /*if (acl[userRole] && acl[userRole][resource] && acl[userRole][resource].includes(method)) {
        return next();
    }*/
    const currentPermission = rolePermissions[userRole].find(permission =>
        permission.method.includes(req.method) && permission.path.test(req.path)
    );

    if (currentPermission) {
        return next();
    }
    return res.status(403).send('Forbidden');
}



module.exports = {abacMiddleware,authenticateToken,aclMiddleware};
  