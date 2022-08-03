const fs = require("fs");
const path = require("path");
module.exports = function (plop) {
  const envVariables = [];
  fs.readFile(`${process.cwd()}/.env`, "utf8", function (err, data) {
    // Display the file content
    try {
      data.split("\n").forEach((variable) => {
        const variableName = variable.split("=")[0];
        envVariables.push(variableName);
      });
    } catch (err) {
      console.log(err);
    }
  });
  plop.setGenerator("controller", {
    description: "application controller logic",
    prompts: [
      {
        type: "input",
        name: "parentLayer",
        message: "Please select a parent layer",
        default: "node:latest-alpine",
      },
      {
        type: "input",
        name: "workingDir",
        message: "Please type the name of working directory for the image",
        default: "/app",
      },
      {
        type: "input",
        name: "copyTarget",
        message: "Please type the path for the image source code",

      },
      {
        type: "input",
        name: "command",
        message: "Please type the name of command you want to run",
        default: "npm install",
      },
      {
        type: "input",
        name: "exposedPort",
        message: "Please type the exposed port",
        default: "3000",
      },
    ],
    actions: [
      {
        type: "add",
        path: path.join(__dirname, "../Dockerfile"),
        templateFile: "dockerTemplate.hbs",
        data: { ENV: envVariables },
      },
    ],
  });
};
