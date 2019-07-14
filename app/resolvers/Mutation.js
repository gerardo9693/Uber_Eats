const ClienteModel = require('../models/cliente');
const authenticate = require('../utils/authenticate');
const ComidaModel =  require('../models/Comida');
const storage = require('../utils/storage');

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

	const NuevaComida =  await ComidaModel.create(params.data)
							.catch( e => {throw new Error("Ocurrio un problema") } )
	if(!NuevaComida) throw new Error("No se creo la 'Comida'");
	return NuevaComida.toObject();
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

const EliminarComida = async(root,params,context,info) => {

	const {id} = params;

	await ComidaModel.findOneAndUpdate({_id:id},{$set:{lEstatus:false}})

	return "Comida eliminado"

}

module.exports = {
    Registro,
    ActualizarPerfil,
    CrearComida,
    Login,
	ActualizarComida,
	EliminarComida
};