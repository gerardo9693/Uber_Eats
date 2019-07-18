const ClienteModel = require('../models/cliente');
const ComidaModel =  require('../models/Comida');
const DireccionModel =  require('../models/Direccion');

const RestauranteModel = require('../models/Restaurante');

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

const listRestaurante = async(root, params,context,info) => {
	
	const Restaurante = await RestauranteModel.find({});
	
	return Restaurante
};

const singleComida = async(root,params, context, info) => {

	const Comida = await ComidaModel.findById(params.id).populate('Restaurante');
	if(!Comida) throw new Error("Comida no existe")

	return Comida.toObject();

}


module.exports = {
	ListarClientes,
	lstComida,
	ListarDirecciones,
	ListarClientes,
	listRestaurante,
	singleComida
};