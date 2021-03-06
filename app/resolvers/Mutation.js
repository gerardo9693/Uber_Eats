const ClienteModel = require('../models/cliente');
const authenticate = require('../utils/authenticate');
const ComidaModel =  require('../models/Comida');
const DireccionModel = require('../models/Direccion');
const storage = require('../utils/storage');
const RestauranteModel = require('../models/Restaurante');
const PedidoModel = require('../models/Pedido');
const DetallePedido = require('../models/detallePedido');

const Registro = async(root, params, context, info) => {
	if(params.data.cRutaImagen){
		const { createReadStream } = await params.data.cRutaImagen;

		const stream = createReadStream();

		const { url } = await storage({stream});
			
		params.data.cRutaImagen = url;
	}
	const registroUsuario = await ClienteModel.create(params.data)
		.catch(e => {throw new Error('Error al registrar usuario');});

	return registroUsuario.toObject();
};

const EliminarComida = async(root,params,context,info) => {

	const {id} = params;

	await ComidaModel.findOneAndUpdate({_id:id},{$set:{lEstatus:false}})

	return "Comida eliminado"

}

const crearDireccion = async(root, params, context, info) => {
	const {user} = context;
	params.data.Cliente = user;

	const Direccion = await DireccionModel.create(params.data)
		.catch(e => {throw new Error('Error al registrar dirección');});

	console.log(Direccion);

	const nuevaDireccion = await DireccionModel.findOne({_id:Direccion._id}).populate('Cliente');

	await ClienteModel.findByIdAndUpdate(user.id, {$push:{Direcciones:Direccion}});

	return nuevaDireccion;
};

const Login = async(root,params,context,info) => {
	const token = await authenticate(params).catch(e => {throw e;} );

	return {
		token,
		message:'Ok'
	};
};

const ActualizarPerfil = async(root, params, context, info) => {
	const {data} = params;
	const {user} = context;
	console.log(user);
	let Cliente = await ClienteModel.findById(user.id);
	
	if(!Cliente) throw new Error('El cliente no existe');
	Object.keys(data).map( key => Cliente[key] = data[key])
	const ClienteActualizado = await Cliente.save({new:true})
	return ClienteActualizado.toObject();
};

const CrearComida =  async(root,params,context,info) => {
	console.log(params.data.cUrlImagen);

	if(params.data.cUrlImagen){
		const { createReadStream } = await params.data.cUrlImagen;

		const stream = createReadStream();

		const { url } = await storage({stream});
			
		params.data.cUrlImagen = url;
	} 
	
	console.log(params);

	const NuevaComida =  await ComidaModel.create(params.data)
							.catch( e => {throw new Error("Ocurrio un problema") } )
	if(!NuevaComida) throw new Error("No se creo la 'Comida'");
	return NuevaComida.toObject();
}

const crearRestaurante =  async(root,params,context,info) => {

	const newRestaurante =  await RestauranteModel.create(params.data)
							.catch( e => {throw new Error("Ocurrio un problema") } )
	if(!newRestaurante) throw new Error("No se creo el 'restaurante'");
	return newRestaurante.toObject();
}

const actualizarRestaurante = async(root,params,context,info) => {

	const {data} = params

	const ActualizaRestaurante = await RestauranteModel.findOneAndUpdate({_id:data._id},{$set:{...data}},{new:true});

    if(!ActualizaRestaurante) throw new Error(" Restaurante No Existe")
   
	return ActualizaRestaurante.toObject();
}

const ActualizarComida = async(root,params,context,info) => {
	const {data} = params
	const {user} =  context
	console.log(data._id)
	
	// let Comida = await ComidaModel.findById(data._id)
	// if(!Comida) throw new Error(" Autor No Existe")
	const actualizarcomida = await ComidaModel.findOneAndUpdate({_id:data._id},{$set:{...data}},{new:true});

        if (!actualizarcomida) {
          throw new Error('Error')
		}
		
        return actualizarcomida.toObject();
}


const EliminarRestaurante = async(root,params,context,info) => {

	const {id} = params;

	await RestauranteModel.findOneAndUpdate({_id:id},{$set:{is_active:false}})

	return "Restaurante eliminado"

}   

const RegistrarPedido =  async(root,params,context,info) => {
	const {user} = context;
	console.log(user);
	params.data.cliente = user;
	params.data.total = 0;

	const Pedido =  await PedidoModel.create(params.data)
							.catch( e => {throw new Error("Ocurrio un problema") } )
	if(!Pedido) throw new Error("No se creo el 'pedido'");
	console.log(Pedido);
	return Pedido.toObject();
}

const RegistrarDetalle = async(root,params,context,info) => {
	const detalles =  await DetallePedido.create(params.data)
							.catch( e => {throw new Error("Ocurrio un problema") } )

	console.log(detalles);
	if(!detalles) throw new Error("No se creo los detalles");
	
	return detalles.toObject();
}

module.exports = {
	Registro,
	crearDireccion,
    ActualizarPerfil,
    CrearComida,
    Login,
	ActualizarComida,
	EliminarComida,
    crearRestaurante,
	actualizarRestaurante,
	EliminarRestaurante,
	RegistrarPedido,
	RegistrarDetalle
}