const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const Cliente = new Schema({
    cNombre : {
        type: String,
        required: true
    },
    cApellidoP : {
        type: String,
        required: true
    },
    cApellidoM : {
        type: String,
        required: true
    },
    cTelefono : {
        type: String,
        required: true,
        unique: true
    },
    Direcciones:{
        type: [Schema.Types.ObjectId],
        ref: 'Direcciones'
    },
    cGenero : {
        type: String,
        enum: ['H', 'M']
    },
    cCorreo : {
        type: String,
        required: true,
        unique: true
    },
    cContrasenia : {
        type: String, 
        required: true
    },
    cRutaImagen : {
        type: String,
        default: 'https://res.cloudinary.com/dwzdurabf/image/upload/v1562593865/personal_f20vvn.png'
    },
    lEstatus : {
        type: Boolean,
        default: true
    }
}, {collection: 'Clientes', timestamps:true});

Cliente.pre('save', function(next){
	const Usuario = this;
	const SALT_FACTOR = 10;

	if(!Usuario.isModified('cContrasenia')) {return next();}

	bcrypt.genSalt(SALT_FACTOR, function(err, salt){
		if(err) return next(err);

		bcrypt.hash(Usuario.cContrasenia, salt, function(err, hash){
			if(err) return next(err);
			Usuario.cContrasenia = hash;
			next();
		});
	});
});

module.exports = mongoose.model('Clientes', Cliente);