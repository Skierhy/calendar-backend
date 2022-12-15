// esta es la configuración de la base de datos
const mongoose = require('mongoose');

// como se va a usar async await, se debe usar el try catch
const dbConnection = async () => {
	try {
		// usar variable de env
		await mongoose.connect(process.env.DB_CNN, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		// si todo sale bien, mostrar el mensaje
		console.log('DB Online');
	} catch (error) {
		// mostrar el error
		console.log(error);
		throw new Error('Error a la hora de inicializar BD');
	}
};

module.exports = {
	dbConnection,
};
