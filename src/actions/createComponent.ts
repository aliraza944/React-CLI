import { spawn } from "child_process";
import * as Path from "path";
import * as fs from "fs";
import { __dirname } from "../utils/rootDirPath.js";
import { upperCaseName } from "../utils/upperCaseName.js";
import { ComponentTemplate } from "../templates/component.js";
export const createComponent = (name: string) => {
  // TODO :  index file from which the component will be exported
  const componentName = upperCaseName(name);
  createComponentsFile(componentName);
};

const lookForComponentsFolder = (componentsDir: string) => {
  const isComponentDirExits = fs.existsSync(componentsDir);

  // if not create a new directory
  if (!isComponentDirExits) {
    try {
      fs.mkdirSync(componentsDir, { recursive: true });
    } catch (error) {
      console.error("Error creating the directory:", error);
    }
    return;
  }
  console.error("The component already exists");
  process.exit(1);
};

const createComponentsFile = (name: string) => {
  // TODO : jsx or tsx file extension

  const fileContent = ComponentTemplate(name);

  const componentsDir = Path.resolve(__dirname, `src`, "components", `${name}`);

  // check if the components directory exists
  lookForComponentsFolder(componentsDir);
  const filePath = Path.join(componentsDir, name + ".jsx");

  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error("Error creating the file:", err);
    } else {
      console.log("File created successfully!");
    }
  });
};
