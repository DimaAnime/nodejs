const jwt = require('jsonwebtoken');
const {
    getUser,
    createUser
    } = require("./users")

const login = async (req, res) => {

    const { username, password } = req.body;

    const users = await getUser();
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }

    // Подписываем JWT токен
    const token = jwt.sign({ "username": username,"role":user.role }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
}

const register = async (req, res) => {
    const { username, password } = req.body;

    // Проверка, что имя пользователя и пароль переданы
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }
    const users = await getUser();
    //console.log(users);
    // Проверка, существует ли пользователь
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Хеширование пароля
    //const hashedPassword = await bcrypt.hash(password, 10);
    req.body.role = "guest";
    await createUser(req, res);
    // Сохранение пользователя
    //res.status(201).json({ message: 'User registered successfully' });
}

module.exports = {register,login};