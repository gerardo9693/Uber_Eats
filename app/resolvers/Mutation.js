const Cliente = require('../models/cliente');
const authenticate = require('../utils/authenticate');

const Registro = async(root, params, context, info) => {
    const registroUsuario = await Cliente.create(params.data)
    .catch( e => {
        throw new Error(e.message);
    });
    if(!registroUsuario) throw new Error('No se registro correctamente');

    return registroUsuario.toObject();
}

const Login = async(root,params,context,info) => {
	const token = await authenticate(params).catch(e => {throw e;} );

	return {
		token,
		message:'Ok'
	};
};

module.exports = {
    Registro,
    Login
};