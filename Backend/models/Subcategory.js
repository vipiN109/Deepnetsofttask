const mongoose= require('mongoose');

var subCategorySchema= new mongoose.Schema({
    mainCategoryId:{type:mongoose.Types.ObjectId,refer:"main_categorys"},
    subCategory:{type:String}
})

var subCategoryModel=mongoose.model("sub_category",subCategorySchema);
module.exports=subCategoryModel;