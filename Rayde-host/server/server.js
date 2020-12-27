const Rayconnect = require("rayconnect-client").default;
const permissions = require("./permissions");
let fs = require('fs')
const path = require('path')




const miapp = new Rayconnect(
  {
    scopes: process.env.APP_SCOPES,
    space: "main",
    appID: process.env.APP_ID,
    type: "micros",
  },
  undefined,
  true
);

miapp.OnConnect(async () => {
  const user = await miapp.GetUserAccess({
    username: process.env.APP_USERNAME,
    password: process.env.APP_PASSWORD,
  });

  console.log("connected to rayconnect fandogh server :)");

  // load permissions
  permissions.forEach(async (element) => {
    await miapp.changePermissions(element);
  });

});

require('./query')(miapp)
