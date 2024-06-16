import dotenv from "dotenv";
import fs from 'fs'
import path from "path";
import scrapeIPODetails from "./scripts/detail_scraper";
import scrapeIPOList from "./scripts/list_scraper";
import formatData from "./utils/formatIpoData";


dotenv.config();

export default async function scrapeIpoDetails() {
  try {
    console.log(`scraping initiated at ${new Date()}`);
    let ipos = [];
    deleteDirectoryRecursive("./cache")
    fs.mkdirSync("./cache")
    ipos = await scrapeIPOList(2024, 2025);
    const ipoData = await scrapeIPODetails(ipos);
    const formattedData = await formatData([ipoData]);
    console.log(formattedData.length);
    // const res = await saveDataToDb(formattedData);
    
  } catch (error) {
    console.log(error);
    process.exit()
  }
}


function deleteDirectoryRecursive(dirPath: string) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach((file) => {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteDirectoryRecursive(curPath); // Recurse
      } else {
        fs.unlinkSync(curPath); // Delete file
      }
    });
    fs.rmdirSync(dirPath); // Remove the now empty directory
  }
}