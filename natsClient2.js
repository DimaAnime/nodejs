const { connect, StringCodec } = require('nats');

const servers = { servers: "localhost:4222" };


async function main()
{
	try
	{
		const nc = await connect(servers);
		
		console.log(`connected to ${nc.getServer()}`);
		
		const done = nc.closed();


		const sc = StringCodec();
		
		//Создание подписки hello
		const sub = nc.subscribe("hello");
		
		//процесс получения сообщений
		const reciveMessage = async () =>{
			for await (const m of sub) 
			{
				console.log(`[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
			}
			
		  console.log("subscription closed");
		};
		
		await reciveMessage();
		
		
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
