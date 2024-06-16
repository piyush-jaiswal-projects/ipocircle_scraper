import { aggresiveCache, get } from "../utils/scraper";
import * as cheerio from "cheerio";
import _tableDataInJson from "./table_matcher";
import fs from "fs";

interface DataObject {
  [key: string]: any;
}

const scrapeIPODetails = async (ipos: any) => {
  console.log("Scraping in progress ...");
  await aggresiveCache(20, ipos.map((ipo: any) => ipo.url))
  const res: DataObject[] = await Promise.all(
    ipos.map(async (ipo: any) => {
      return await scrapeSingle(ipo);
    })
  ).catch((e) => {
    console.log(e);
    return []
  });
  return res;
};

const scrapeSingle = async (ipo: any) => {
  try {
    const content = await get(ipo.url);
    if (content === "") return;
    const $ = cheerio.load(content);
    console.log(`Scraping: ${$("H1").text()}`);

    function getTableData(selector: string) {
      const data: { [key: string]: string } = {};
      const noOfTables = $(selector).length;

      for (let i = 0; i < noOfTables; i++) {
        if (i === 4 || i === 7) continue;
        $(selector)
          .eq(i)
          .find("tbody tr")
          .each((index, element) => {
            const key = $(element).find("td").first().text().trim();
            const value = $(element).find("td").last().text().trim();
            data[key] = value;
          });
      }

      return data;
    }

    function getLotSize() {
      const data: { [key: string]: string[] } = {
        Application: [],
        Lots: [],
        Shares: [],
        Amount: [],
      };
      $("table.table-bordered.table-striped.table-hover.w-auto")
        .eq(4)
        .find("tbody tr")
        .each((index, element) => {
          if (index === 3) return;
          data["Application"].push($(element).find("td").first().text());
          data["Lots"].push($(element).find("td").eq(1).text());
          data["Shares"].push($(element).find("td").eq(2).text());
          data["Amount"].push($(element).find("td").last().text());
          return;
        });

      return data;
    }

    function getEpsData() {
      const data: { [key: string]: string[] } = {
        "kpi2-Type": [],
        "kpi2-PreIpo": [],
        "kpi2-PostIpo": [],
      };
      $("table.table-bordered.table-striped.table-hover.w-auto")
        .eq(7)
        .find("tbody tr")
        .each((index, element) => {
          data["kpi2-Type"].push($(element).find("td").first().text());
          data["kpi2-PreIpo"].push($(element).find("td").eq(1).text());
          data["kpi2-PostIpo"].push($(element).find("td").last().text());
          return;
        });

      return data;
    }

    function getIpoSummary() {
      var data: string = "";
      $("#ipoSummary p").map((el, index) => {
        data += $(index)
          .text()
          .trim()
          .replace(/[\t\n]/g, "");
      });
      return data;
    }

    function getFinanceData(index: number) {
      var data: string[] = [];
      $(`#financialTable tbody tr`)
        .eq(index)
        .find("td")
        .each((i, el) => {
          if (i === 0) return;
          data.push($(el).text());
        });
      return data;
    }
    const financials = {
      note: "Amount in Rs Lakhs",
      periodEnded: getFinanceData(0),
      assets: getFinanceData(1),
      revenue: getFinanceData(2),
      profitAfterTax: getFinanceData(3),
      netWorth: getFinanceData(4),
      reservesAndSurplus: getFinanceData(5),
      totalBorrowing: getFinanceData(6),
    };

    const details = getTableData(
      "table.table-bordered.table-striped.table-hover.w-auto"
    );

    const contact = $(".card-body address p")
      .html()
      ?.replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/\n/g, "");
    const registrar = $(".card-body")
      .eq(3)
      .find("p")
      .html()
      ?.replace(/<\/?[^>]+(>|$)/g, "")
      .replace(/\n/g, "");

    const lots = getLotSize();
    const eps = getEpsData();
    const listItems = $(".col-md-12 ol").eq(1).text().replace(";", ". ").replace(/\n/g, "")

    const data = {
      CompanyName: $("H1").text(),
      Dates: $("div.float-end.me-2 > span")
        .text()
        .trim()
        .replace(/[\t\n]/g, ""),
      drhpUrl: $('a:contains("DRHP")').attr("href"),
      rhpUrl: $('a:contains("RHP")').attr("href"),
      logoUrl: $("div.div-logo img").attr("src"),
      desc: $("div.col-md-12 p")
        .text()
        .replace(/[\t\n]/g, ""),
      ipoSummary: getIpoSummary(),
      ...financials,
      objectsOfTheIssue: listItems ,
      contactDetails: {
        address: contact?.split("Phone")[0],
        phone: contact?.split("Phone: ")[1].split("Email")[0],
        email: contact
          ?.split("Phone: ")[1]
          .split("Email: ")[1]
          .split("Website")[0],
        website: contact
          ?.split("Phone: ")[1]
          .split("Email")[1]
          .split("Website: ")[1],
      },
      registrar: {
        name: registrar?.split("Phone: ")[0],
        phone: registrar?.split("Phone: ")[1]?.split("Email")[0],
        email: registrar
          ?.split("Phone: ")[1]
          ?.split("Email: ")[1]
          ?.split("Website")[0],
        website: registrar
          ?.split("Phone: ")[1]
          ?.split("Email")[1]
          ?.split("Website: ")[1],
      },
      ...details,
      ...lots,
      ...eps,
    };

    return data;
  } catch (err) {
    console.error(`Scraping failed for : ${ipo.url} \n Error: ${err}`);
    console.log(err);
    process.exit(1)
  }
};

export default scrapeIPODetails;
