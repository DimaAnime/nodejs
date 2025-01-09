const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Получить всех пользователей
const getStations = async (req, res) => {
    try {
      const stations = await prisma.stations.findMany();
        res.json(stations);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Сервер работает, но не может подключиться к базе данных' });
    }
};

  const getStationsById = async (req, res) => {
    const { id } = req.params;
    try {
        const station = await prisma.stations.findUnique({ where: { id: Number(id) } });
        if (!station) return res.status(404).json({ error: 'stations not found' });
        res.json(station);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Сервер работает, но не может подключиться к базе данных' });
    }
  };

module.exports ={getStations,getStationsById};