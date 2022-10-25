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
   getProducts:Joi.object().keys({ 
    limit: Joi.string().required(),
    skip: Joi.string().required(),
    mainCategoryId: Joi.string().optional().allow(""),
    subCategoryId: Joi.string().optional().allow(""),
    categoryId: Joi.string().optional().allow("")
   })
}; 
module.exports = schemas;