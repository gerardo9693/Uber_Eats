const Cliente = require('../models/cliente');

const Registro = async(root, params, context, info) => {
    const registroUsuario = await Cliente.create(params.data)
    .catch( e => {
        throw new Error(e.message);
    });
    if(!registroUsuario) throw new Error('No se registro correctamente');

    return registroUsuario.toObject();
}

module.exports = {
    Registro
};