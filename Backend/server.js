const express = require("express");
const crypto = require("crypto");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const router = require("./components/Routes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDocs = require("swagger-jsdoc");

mongoose.connect("mongodb://localhost:27017/myapp");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task",
      version: "1.0.0",
      description: "",
    },
    servers: [{ url: "http://localhost:3088" }],
  },
  apis: ["./components/Routes.js"],
};

const swaggerSpecification = swaggerJsDocs(options);
console.log(swaggerSpecification);

app.use(cors());
// To support URL-encoded bodies
app.use(express.json({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(router);

app.use(
  "/documentation",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecification, { explorer: true })
);

app.listen(3088, async (err) => {
  if (err) {
    console.log(err);
  } else {
    require("./models/Seed").categoryadd();
    console.log(
      "server running on port number",
      3088,
      "database connected successfully"
    );
  }
});
