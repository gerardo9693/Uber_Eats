const mongoose  =  require('mongoose');

const Schema =  mongoose.Schema;


const ComidaSchema = new Schema({

	cNombre:{
		type:String,
		required:true,
		unique:true
	},
	cDescripcion:{
		type:String,
		required:true
	},
	cPrecio:{
		type:String,
		required:true,
	},
	cUrlImagen:{
		type:String
	},
	lEstatus:{
		type:Boolean,
		default:true
	}

}, {collection:"Comidas",timestamps:true} );


module.exports =  mongoose.model('Comidas',ComidaSchema);