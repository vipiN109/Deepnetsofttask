const mongoose= require('mongoose');

var productsSchema= new mongoose.Schema({
    mainCategoryId:{type:mongoose.Types.ObjectId,refer:"main_categorys"},
    subCategoryId:{type:mongoose.Types.ObjectId,refer:"sub_categorys"},
    catgoryId:{type:mongoose.Types.ObjectId,refer:"categorys"},
    productName:{type:String}
})

var productsModel=mongoose.model("products",productsSchema);
module.exports=productsModel;