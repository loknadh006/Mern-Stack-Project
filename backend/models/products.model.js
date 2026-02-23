import mongoose from 'mongoose';
//creating a schema
const productSchema=new mongoose.Schema({
name:{
    type: String,
    required:true
},
price:{
    type: String,
    required: true
},
image:{
    type: String,
    required:true
},

},{timestamps:true //at what time created and updated
});
//depending on schema now create product model
const Product =mongoose.model('Product',productSchema);
export default Product;