const Cliente = require('../models/cliente');
const RestauranteModel = require('../models/Restaurante');

const Registro = async(root, params, context, info) => {
    const registroUsuario = await Cliente.create(params.data)
    .catch( e => {
        throw new Error(e.message);
    });
    if(!registroUsuario) throw new Error('No se registro correctamente');

    return registroUsuario.toObject();
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


const EliminarRestaurante = async(root,params,context,info) => {

	const {id} = params;

	await RestauranteModel.findOneAndUpdate({_id:id},{$set:{is_active:false}})

	return "Restaurante eliminado"

}   

module.exports = {
    Registro,
    crearRestaurante,
	actualizarRestaurante,
	EliminarRestaurante
};