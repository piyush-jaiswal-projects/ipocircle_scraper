import fs from "fs";

const deleteCacheDirContents = async () => {
  try {
    fs.rmSync("cache", {
      recursive: true,
      force: true
    });
    fs.mkdirSync("cache");
    console.log("Recreated cache directory");
    
  } catch (error) {
    console.log(error);
    
    console.log("Error deleting cache directory");
    throw Error();
  }
};

export default deleteCacheDirContents;
