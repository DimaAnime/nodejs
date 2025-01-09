const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Заполнение таблицы users
  await prisma.users.createMany({
    data: [
      { username: 'admin', password: 'admin12', role: 'Admin' },
      { username: 'prioritet', password: 'prioritet13', role: 'Priority' },
      { username: 'guest', password: 'guest14', role: 'guest' },
    ],
  });

  // Заполнение таблицы stations
  await prisma.stations.createMany({
    data: [
      { name: 'Station Alpha', latitude: 40.712776, longitude: -74.005974 },
      { name: 'Station Beta', latitude: 34.052235, longitude: -118.243683 },
      { name: 'Station Gamma', latitude: 41.878113, longitude: -87.629799 },
      { name: 'Station Delta', latitude: 29.760427, longitude: -95.369804 },
    ],
  });

  // Заполнение таблицы measurements
  await prisma.measurements.createMany({
    data: [
      { date: new Date('2025-01-08'), temperature: 15.2, humidity: 60.1, wind_speed: 5.3, station_id: 1 },
      { date: new Date('2025-01-09'), temperature: 16.5, humidity: 58.3, wind_speed: 4.7, station_id: 1 },
      { date: new Date('2025-01-08'), temperature: 20.4, humidity: 45.7, wind_speed: 3.1, station_id: 2 },
      { date: new Date('2025-01-09'), temperature: 21.0, humidity: 44.9, wind_speed: 3.5, station_id: 2 },
      { date: new Date('2025-01-08'), temperature: -5.0, humidity: 80.2, wind_speed: 15.0, station_id: 3 },
      { date: new Date('2025-01-09'), temperature: -4.8, humidity: 79.9, wind_speed: 14.5, station_id: 3 },
      { date: new Date('2025-01-08'), temperature: 25.1, humidity: 50.3, wind_speed: 7.8, station_id: 4 },
      { date: new Date('2025-01-09'), temperature: 26.0, humidity: 49.0, wind_speed: 8.2, station_id: 4 },
    ],
  });

  console.log("Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
