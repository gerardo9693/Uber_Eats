const bcrypt = require('bcrypt');
const PerfilModel = require('../models/cliente');
const createToken = require('./createToken');

const autentificacion = ({cCorreo, cContrasenia}) => {
	return new Promise((resolve, reject)=> {
		PerfilModel.findOne({cCorreo}).then((user)=> {
			if(!user) reject(new Error('Usuario no encontrado'));

			bcrypt.compare(cContrasenia,user.cContrasenia,(err, isValid)=> {
				if(err) reject(new Error('Error al crear el Token'));
                
				isValid ? resolve(createToken(user)) : reject('La contraseña no coincide');
			});
		}).catch(e => reject(e));
	});
};

module.exports = autentificacion;