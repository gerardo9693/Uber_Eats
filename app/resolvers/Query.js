const ClienteModel = require('../models/cliente');
const ComidaModel =  require('../models/Comida');


const ListarClientes  = async(root, params, context, info) => {
	const Clientes = await ClienteModel.find({});

	return Clientes;
};

const lstComida =  async(root,params,context,info) => {
	const Comidas = await ComidaModel.find({});
	console.log(Comidas);
	return Comidas
}


module.exports = {
	ListarClientes,
	lstComida
}