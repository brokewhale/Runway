const IdeaModel = require("../models/Idea");
const schemas = require("./schemas");

exports.createInfluence = async (ctx, payload) => {
  return new Promise(async (resolve, reject) => {
    const { error, value } = schemas.idea.create.validate(payload);

    if (error !== undefined)
      return reject({ status: "error", message: error.message, code: 422 });

    value.user = ctx.user.id;

    let idea = await IdeaModel.create(value);
    return resolve({ status: "success", idea });
  });
};
