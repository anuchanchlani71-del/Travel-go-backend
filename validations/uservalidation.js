const{celebrate,Joi}=require('celebrate');
module.exports.signupvalidations=celebrate({

    body:Joi.object().keys({
     first_name:Joi.string().required(),
        last_name:Joi.string().required(),
        email:Joi.string().required(),
           mobile:Joi.string().required(),
        password:Joi.string().optional(),
        address:Joi.string().required(),
       role:Joi.string().optional(),
       image:Joi.string().required().optional
    })
})
