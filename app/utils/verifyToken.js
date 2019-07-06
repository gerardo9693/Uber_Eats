const jwt = require('jsonwebtoken');
const PerfilModel = require('../models/cliente');

const verificarToken = async(req) => {
	const Autorizacion = req.get('Autorizacion');
	if(!Autorizacion){
		return req;
	}else{
		const formatedToken = Autorizacion.replace('JWT ','');
		const payload = jwt.verify(formatedToken, process.env.SECRET_KEY);
		if(!payload) return req;
		const user = await PerfilModel.findOne({_id:payload._id});
		if(!user) return req;
		return {...req,user};
	}
};

module.exports = verificarToken;