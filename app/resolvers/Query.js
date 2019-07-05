const ClienteModel = require('../models/cliente');

const lstClientes  = async(root, params, context, info) => {
	const Clientes = await ClienteModel.find({});

	return Clientes;
};

module.exports = {
    lstClientes
}