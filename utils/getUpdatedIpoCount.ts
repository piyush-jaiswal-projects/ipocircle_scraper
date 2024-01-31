
// import deleteCacheDirContents from "./deleteCacheContents";
import { get } from "./scraper";
import * as cheerio from "cheerio";

export default async function getUpdatedIpoCount(from: number, to: number) {
  // await deleteCacheDirContents()
  
  const url = (year: any) =>
    `https://www.chittorgarh.com/report/ipo-in-india-list-main-board-sme/82/?year=${year}`;
  var ipoCount: number = 0;

  for (let year = to - 1; year >= from; --year) {
    // @ts-ignore
    const $ = cheerio.load(await get(url(year)));
    const rows = $(
      '[itemtype="http://schema.org/Table"] > div > table > tbody > tr',
    );
    ipoCount = ipoCount + rows.length
  }

    return ipoCount
}
