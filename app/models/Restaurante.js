const mongoose =  require('mongoose');
const Schema =  mongoose.Schema;

const RestauranteSchema = new Schema ({
    Nombre:{
        type:String,
        required: true,
    },
    Descripcion:{
        type:String,
        required:true
    },
    is_active:{
        type: Boolean,
        default: true
    }
}, { collection:"restaurante", timestamps:true });

module.exports = mongoose.model('restaurante', RestauranteSchema);