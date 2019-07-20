const ClienteModel = require('../models/cliente');
const ComidaModel =  require('../models/Comida');
const DireccionModel =  require('../models/Direccion');
const PedidoModel = require('../models/Pedido');
const Detalles = require('../models/detallePedido');
const RestauranteModel = require('../models/Restaurante');

const ListarClientes  = async(root, params, context, info) => {
	const Clientes = await ClienteModel.find({}).populate('Direcciones');

	return Clientes;
};

const ListarDetalles  = async(root, params, context, info) => {
	console.log(params);
	const detalles = await Detalles.find({Pedido:params.id});

	return detalles;
};

const ListarPedido = async(root, params, context, info) => {
	const Pedidos = await PedidoModel.find({}).populate('cliente');

	return Pedidos;
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
const singleDireccion = async(root,params, context, info) => {
console.log(context);
	
	console.log(params);
	const Direccion = await DireccionModel.find({Cliente:params.id});

	return Direccion;

}


module.exports = {
	ListarClientes,
	lstComida,
	ListarDirecciones,
	ListarClientes,
	listRestaurante,
	ListarPedido,
	ListarDetalles,
	singleComida,
	singleDireccion
};