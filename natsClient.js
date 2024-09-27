const { connect, StringCodec } = require('nats');

const servers = { servers: "localhost:4222" };


async function subscribe(nc,sc)
{
	const r = 0; 
	for (let i=0; i<10;i++)
	{
		setTimeout (() =>{nc.publish("hello", sc.encode(`onepiece ${i}`))}, 5000);
	}
	
	return r;
}

async function main()
{
	try
	{
		//подключение
		const nc = await connect(servers);
		
		console.log(`connected to ${nc.getServer()}`);
		
		// promise указывает на закрытие
		const done = nc.closed();


		const sc = StringCodec();

		//Создание подписки hello
		/*const sub = nc.subscribe("hello");
		//процесс получения сообщений
		(async () => {
		  for await (const m of sub) {
			console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
		  }
		  console.log("subscription closed");
		})();*/
		
		// Функция для отправки сообщений с задержкой
		  const sendMessage = (i) => {
			return new Promise((resolve) => {
			  setTimeout(() => {
				nc.publish("hello", sc.encode(`onepiece ${i}`));
				console.log(`Сообщение отправлено: onepiece ${i}`);
				resolve();
			  }, 5000); // Сообщения отправляются с интервалом 5 секунд
			});
		  };
		
		// Отправляем все сообщения последовательно
		for (let i = 0; i < 10; i++) 
		{
			await sendMessage(i); // Ожидание завершения отправки каждого сообщения
		}
		

		

		//то же что и close но гарантиует видимость ещё обрабатываемых сообщений
		await nc.drain();
		
		//await nc.close();
		
		const err = await done;
		if (err) 
		{
			console.log(`error closing:`, err);
		}
	}catch (err) 
	{
		console.log(`error connecting to ${JSON.stringify(servers)} \n`, err);
	}
}


main();
