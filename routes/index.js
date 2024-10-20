"use strict";

const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

/**
 * Routes Declaration: The following function will import all generated route
 * from src/routes/*.js and require them to be used with route.use(), with the
 * file name as the name of the route.
 *
 * If for instance you want to declare you own route then feel free to require them here
 * and put it below as shown in example:
 *
 * ------------------------------------------------------
 * const myUserRoute = require('./my_route_file');
 * router.use('/my_route_name', myUserRoute);
 * ------------------------------------------------------
 *
 * the above route will be exposed to http://localhost:8800/api/v1/<my_route_name>
 */
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== "index.js" && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const routes = require(path.join(__dirname, file));
    // console.log(__dirname, file)

    router.use(`/${file.replace(".js", "")}`, routes);
  });

module.exports = router;
