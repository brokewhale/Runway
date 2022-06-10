const Joi = require("joi");
let _ = require("lodash");
let schemas = require("./schemas");
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
let User = require("../models/User");

let JWT_SECRET = process.env.JWT_SECRET || "jwt-test-secret";
let public_fields = ["id", "name", "email"];
let server = process.env.SERVER || "localhost:5000";

let generateJWT = (user) => {
  const today = new Date();
  const exp = new Date(today);
  exp.setDate(today.getDate() + 7);

  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      exp: Math.floor(exp.getTime() / 1000),
    },
    JWT_SECRET
  );
};
let publify = async (user, fields) => {
  return await _.pick(user, [...fields]);
};

exports.resolveToken = async ({ token }) => {
  try {
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return reject(err);
        resolve(decoded);
      });
    });
    return decoded;
  } catch (err) {
    return null;
  }
};

exports.greet = async (ctx) => {
  return new Promise((resolve, reject) => {
    resolve({ say: "helloworld", ctx });
  });
};

exports.create = async (payload) => {
  return new Promise(async (resolve, reject) => {
    const { error } = schemas.user.accountCreation.validate(payload);
    if (error !== undefined)
      return reject({ status: "error", message: error.message, code: 422 });
    let { email, google_id, name } = payload;
    let found = await User.findOne({ $and: [{ email }, { google_id }] });
    if (found) {
      // return reject({ status: "error", message: "User Exists", code: 422 });
      return resolve({
        status: {
          success: true,
          message: "signin successfully",
          type: "sign_in",
        },
        user: await publify(found, public_fields),
        token: generateJWT(found),
      });
    }

    User.create({
      email,
      google_id,
      name,
    })
      .then(async (user) => {
        return resolve({
          status: {
            success: true,
            message: "Account created successfully",
            type: "sign_up",
          },
          user: await publify(user, public_fields),
          token: generateJWT(user),
        });
      })
      .catch((err) => {
        return reject({ status: "error", message: err.message, code: 500 });
      });
  });
};

exports.me = async (ctx) => {
  return new Promise(async (resolve, reject) => {
    let found = await User.findById(ctx.user.id);
    if (!found)
      return reject({ status: "error", message: "Not Found", code: 404 });

    resolve({ user: await publify(found, public_fields) });
  });
};
