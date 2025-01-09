const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Получить всех пользователей
const getMeasurements = async (req, res) => {
    try {
      const measurements = await prisma.measurements.findMany();
        res.json(measurements);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Сервер работает, но не может подключиться к базе данных' });
    }
};

  const getMeasurementsById = async (req, res) => {
    const { id } = req.params;
    try {
        const measurement = await prisma.measurements.findUnique({ where: { id: Number(id) } });
        if (!measurement) return res.status(404).json({ error: 'measurements not found' });
        res.json(measurement);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ message: 'Сервер работает, но не может подключиться к базе данных' });
    }
  };

module.exports ={getMeasurements,getMeasurementsById};