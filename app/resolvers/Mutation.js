const Cliente = require('../models/cliente');
const ComidaModel =  require('../models/Comida');


const Registro = async(root, params, context, info) => {
    const registroUsuario = await Cliente.create(params.data)
    .catch( e => {
        throw new Error(e.message);
    });
    if(!registroUsuario) throw new Error('No se registro correctamente');

    return registroUsuario.toObject();
}


const CrearComida =  async(root,params,context,info) => {

	const NuevaComida =  await ComidaModel.create(params.data)
							.catch( e => {throw new Error("Ocurrio un problema") } )
	if(!NuevaComida) throw new Error("No se creo la 'Comida'");
	return NuevaComida.toObject();
}


module.exports = {
    Registro,
    CrearComida
};