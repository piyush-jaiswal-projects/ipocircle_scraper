import scrapeIPODetails from "../scripts/detail_scraper";
import scrapeIPOList from "../scripts/list_scraper";
import deleteCacheDirContents from "./deleteCacheContents";
import fs from 'fs'

const getIpodetails = async () => {
  // run scraper script
  // await deleteCacheDirContents();
  let ipos = []
  if (!fs.existsSync('table_data/chittor_basic.json')) {
    ipos = await scrapeIPOList(2020, 2024);
    fs.writeFileSync('table_data/chittor_basic.json', JSON.stringify(ipos));
  } else {
    ipos = JSON.parse(fs.readFileSync('table_data/chittor_basic.json', 'utf-8'));
  }
  const tables = await scrapeIPODetails(ipos)
  
  return tables;
};

export default getIpodetails;
