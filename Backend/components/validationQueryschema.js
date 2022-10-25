const Joi= require('joi')
const schemas = {  
   getCategorys: Joi.object().keys({ 
    limit: Joi.string().required(),
    skip: Joi.string().required()
   }), 
   getMainCategorys: Joi.object().keys({ 
    limit: Joi.string().required(),
    skip: Joi.string().required(),
    categoryId: Joi.string().required()
   }), 
   getSubCategorys: Joi.object().keys({ 
    limit: Joi.string().required(),
    skip: Joi.string().required(),
    mainCategoryId: Joi.string().required()
   }), 
}; 
module.exports = schemas;