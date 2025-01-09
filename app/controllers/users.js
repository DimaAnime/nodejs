
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Получить всех пользователей
const getUsers = async (req, res) => {
    //console.log(req);
    try {
        const users = await prisma.users.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

const getUser = async (param) => {
    try {
      const result = await prisma.users.findMany({ select: { username:true, password:true,role:true } });
      return result;
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Сервер работает, но не может подключиться к базе данных' });
    }
  };

const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await prisma.users.findUnique({ where: { id: Number(id) } });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Сервер работает, но не может подключиться к базе данных' });
    }
  };
  
  // Создать пользователя
const createUser = async (req, res) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        res.status(500).json({ 
            "err": {
                "message":'не заполнены все поля',
                "username": `${username}`,
                "password": `${password}`,
                "role": `${role}`
            }
        });
        return;
    }
    const users = await getUser();
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    try {
        const newUser = await prisma.users.create({
            data: { username, password, role },
          });
          res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: error.message });
    }
  };


const UpdateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password, role } = req.body;
    try {
        const updatedUser = await prisma.users.update({
            where: { id: Number(id) },
            data: { username, password, role },
        });
        res.json(updatedUser);
    } catch (error) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

const DeleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.users.delete({ where: { id: Number(id) } });
        res.status(204).send();
    } catch (error) {
        if (error.code === 'P2025') {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};
  


module.exports ={
    getUsers,
    createUser,
    getUser,
    getUserById,
    UpdateUser,
    DeleteUser
};