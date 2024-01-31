import { get } from '../utils/scraper'
import dayjs from 'dayjs'
import * as cheerio from 'cheerio'

interface IPO {
  name: string | undefined;
  closing_date?: string | null;
  opening_date?: string | null;
  shares_in_lot?: number | undefined;
  url?: string | undefined;
  series?: "sme" | "eq";
  exchange?: any[];
  final_price?: number | undefined;
  defunct?: boolean | undefined;
}

export const scrapeIPOList = async (from: number, to: number) => {
  const url = (year: any) => `https://www.chittorgarh.com/report/ipo-in-india-list-main-board-sme/82/?year=${year}`;
  var ipos: any[] = []
  for (let year = to - 1; year >= from; --year) {

    // @ts-ignore
    const $ = cheerio.load(await get(url(year)));
    const rows = $('[itemtype="http://schema.org/Table"] > div > table > tbody > tr')
    const isNotUnique: boolean[] | null[] = []
    rows.each((_, row) => {
      try {
        const raw = $(row).find('td')
        const cols: any[] = [];

        // @ts-ignore
        raw.each(function (_, v) {
          try {
            return cols.push($(v).text().trim());
          } catch (err) {
            console.error(err)
            process.exit()
          }
        });

        if (isNotUnique[cols[0]]) return;

        isNotUnique[cols[0]] = true;

        const ipo : IPO = {
          name: cols[0],
          opening_date: dayjs(cols[1]).isValid() ? dayjs(cols[1]).toISOString() : null,
          closing_date: dayjs(cols[2]).isValid() ? dayjs(cols[2]).toISOString() : null,
          shares_in_lot: parseInt(cols[5]),
          url: "",

        };

        ipo.url = $(raw[0]).find('a').attr('href')
        ipo.series = /SME/.test(cols[6]) ? "sme" : "eq";
        ipo.exchange = [];
        /NSE/.test(cols[6]) ? ipo.exchange.push('nse') : null;
        /BSE/.test(cols[6]) ? ipo.exchange.push('bse') : null;
        ipo.final_price = cols[3].match(/(,*[\d]+.*[\d]*)+/g)?.length > 1 ? 0 : parseFloat(cols[3])
        ipo.defunct = $(raw[0]).find('del').length != 0 ? true : false
        ipos.push(ipo)
      } catch (err) {
        console.error(err)
        process.exit()
      }
    });
  }
  return ipos;
}

export default scrapeIPOList
