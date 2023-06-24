const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const pbjsCommand = 'npx pbjs';
const changeFolderRegex = /(src[/\\])[^/\\]+/;

async function generateInterfaces(protoFolder) {
  const files = fs.readdirSync(protoFolder);

  for (const file of files) {
    const filePath = path.join(protoFolder, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await generateInterfaces(filePath);
    }  else if (file.endsWith('.proto')) {
      let newFilePath = filePath.replace(changeFolderRegex, '$1prototypes');
      newFilePath = newFilePath.replace('.proto','.ts');

      const command = `${pbjsCommand} --ts ${newFilePath} ${filePath}`;
      const interfaceFileDir = path.dirname(newFilePath);
      fs.mkdirSync(interfaceFileDir, {recursive : true});

      try {
        console.log("command : " + command);
        execSync(command);
      } catch(error) {
        console.error(`Error generating ${newFilePath}:`, error.message);
      }
    }
  }

}

generateInterfaces('src/startrail-protobuf/');
