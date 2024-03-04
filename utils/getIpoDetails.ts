import scrapeIPODetails from "../scripts/detail_scraper";
import scrapeIPOList from "../scripts/list_scraper";
import deleteCacheDirContents from "./deleteCacheContents";
import fs from "fs";

const getIpodetails = async () => {
  // run scraper script
  await deleteCacheDirContents();
  let ipos = [];
  fs.rmSync("table_data/chittor_basic.json");
  const currYear: number = new Date().getFullYear();
  
  ipos = await scrapeIPOList(2023, currYear);
  fs.writeFileSync("table_data/chittor_basic.json", JSON.stringify(ipos));
  const tables = await scrapeIPODetails(ipos);

  return tables;
};

export default getIpodetails;
