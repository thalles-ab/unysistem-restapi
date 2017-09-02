import express from "express";
import consign from "consign";

const app = express();

consign()
    .include('libs/config.js')
    .then("db.js")
    .then("auth.js")
    .then("libs/middlewares.js")
    .then('model')
    .then('controllers')
    .then("routes")
    .then("libs/boots.js")
    .into(app);
