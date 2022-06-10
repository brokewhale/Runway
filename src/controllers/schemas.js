const Joi = require("joi");

module.exports = {
  user: {
    accountCreation: Joi.object().keys({
      name: Joi.string().min(1).required(),
      google_id: Joi.string().min(1).required(),
      email: Joi.string().email().required(),
      // password: Joi.string()
      //   .regex(/^[\x20-\x7E]+$/)
      //   .min(8)
      //   .max(72)
      //   .required(),
      // phone: Joi.string().min(9).max(12).required(),
    }),
    authentication: Joi.object().keys({
      email: Joi.string().email().required(),
      name: Joi.string().min(1).required(),
      google_id: Joi.string().min(1).required(),
      // password: Joi.string()
      //   .regex(/^[\x20-\x7E]+$/)
      //   .min(8)
      //   .max(72)
      //   .required(),
    }),
    passwordRetrieval: Joi.object().keys({
      email: Joi.string().email().required(),
    }),
    accountEdit: Joi.object().keys({
      name: Joi.string().min(1).optional(),
      email: Joi.string().email().optional(),
      password: Joi.string()
        .regex(/^[\x20-\x7E]+$/)
        .min(8)
        .max(72)
        .optional(),
      phone: Joi.string().min(9).max(12).optional(),
    }),
  },

  idea: {
    create: Joi.object().keys({
      title: Joi.string().required(),
    }),
  },
};
