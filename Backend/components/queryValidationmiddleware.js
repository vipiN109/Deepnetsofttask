// const Joi = require('../../index').joi
const Joi= require('joi')
const middleware = (schema) => { 
    return (req, res, next) => { 
      const { error } = schema.validate(req.query); 
      const valid = error == null; 
      if (valid) { next(); } 
      else { 
        return res.json({status:false,code:201,message:`${error.details.map(x=>x.message.replace(/"/g, ''))[0]}`})
      } 
    } 
  } 
module.exports = middleware;
