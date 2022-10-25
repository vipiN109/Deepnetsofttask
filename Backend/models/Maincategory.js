const mongoose= require('mongoose');

var mainCategorySchema= new mongoose.Schema({
    categoryId:{type:mongoose.Types.ObjectId,refer:"categorys"},
    mainCategory:{type:String}
})

var mainCategoryModel=mongoose.model("main_category",mainCategorySchema);
module.exports=mainCategoryModel;