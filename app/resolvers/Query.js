const ClienteModel = require('../models/cliente');
const ComidaModel =  require('../models/Comida');
const DireccionModel =  require('../models/Direccion');


const ListarClientes  = async(root, params, context, info) => {
	const Clientes = await ClienteModel.find({}).populate('Direcciones');

	return Clientes;
};

const ListarDirecciones = async(root, params, context, info) => {
	const Direcciones = await DireccionModel.find({});

	return Direcciones;
};

const lstComida =  async(root,params,context,info) => {
	const Comidas = await ComidaModel.find({});
	return Comidas
}


module.exports = {
	ListarClientes,
	lstComida,
	ListarDirecciones
}