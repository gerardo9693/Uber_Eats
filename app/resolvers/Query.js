const ClienteModel = require('../models/cliente');
const RestauranteModel = require('../models/Restaurante');

const lstClientes  = async(root, params, context, info) => {
	const Clientes = await ClienteModel.find({});

	return Clientes;
};

const listRestaurante = async(root, params,context,info) => {
	
	const Restaurante = await RestauranteModel.find({});
	
	return Restaurante
}




module.exports = {
	lstClientes,
	listRestaurante
}