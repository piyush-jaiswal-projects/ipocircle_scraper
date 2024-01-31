import * as path from "path";
import * as util from 'util'
// @ts-ignore
import rimraf from 'rimraf'

// @ts-ignore
const promisifiedRimraf = util.promisify(rimraf);
// @ts-ignore
const deleteCacheDirContents = async () => {
  const directoryPath = "/cache";

  promisifiedRimraf(path.join(directoryPath, "*"), {}, (error: any) => {
    if (error) {
      console.error("Error deleting directory contents:", error);
    } else {
      console.log("Directory contents deleted successfully.");
    }
  });
};

export default deleteCacheDirContents;
