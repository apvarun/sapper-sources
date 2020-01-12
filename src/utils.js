import fs from 'fs';
import path from 'path';
import uuidv5 from 'uuidv5';

const CWD = process.cwd();
const seedConstant = 'sapper-sources';

export const createNodeId = id => {
  if (typeof id === `number`) {
    id = id.toString();
  } else if (typeof id !== `string`) {
    console.warn(
      `Parameter passed to createNodeId must be a String or Number (got ${typeof id})`,
    );
  }

  return uuidv5(uuidv5('URL', seedConstant), id);
};

export const getFilesOfType = (dir, filelist, fileExtension = '') => {
  const POSTS_DIR = path.join(CWD, dir);
  const files = fs.readdirSync(POSTS_DIR);
  filelist = filelist || [];
  files
    .filter(file =>
      fileExtension ? path.extname(file) === fileExtension : true,
    )
    .forEach(function(file) {
      if (fs.statSync(POSTS_DIR + file).isDirectory()) {
        filelist = getFilesOfType(dir + file + '/', filelist, fileExtension);
      } else {
        filelist.push(dir + file);
      }
    });
  return filelist
    .map(path => {
      try {
        const content = fs.readFileSync(CWD + path, 'utf8');
        return { path, content };
      } catch (err) {
        console.warn(err);
        return null;
      }
    })
    .filter(fileContent => !!fileContent);
};
