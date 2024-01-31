import fs from "fs";

const deleteCacheDirContents = async () => {
  try {
    if (await fs.existsSync("cache")) {
      await fs.rmSync("cache", {
        recursive: true,
        force: true
      });
    }
    await fs.mkdirSync("cache");
    console.log("Recreated cache directory");
    
  } catch (error) {
    console.log(error);
    
    console.log("Error deleting cache directory");
    throw Error();
  }
};

export default deleteCacheDirContents;
