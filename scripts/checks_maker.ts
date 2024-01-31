import { aggresiveCache, get, concat } from '../utils/scraper'
import { CardRegex, TableRegex } from './regexes.js'
import * as cheerio from 'cheerio'

const CardChecks = {
  prospectus: false,
  contact_info: false,
  registrar: false,
  managers: false,
  listing_day: false,
  listing_details: false
}
const TableChecks = {
  details: false,
  reservation: false,
  anchor: false,
  timetable: false,
  lotsize: false,
  promoter_holding: false,
  company_financials: false,
  performance: false,
  subscription: false,
}

export const maxInfoDetails = async (ipos: any[]) => {
  const table_checks_map = structuredClone(TableChecks);
  for (const [key, _] of Object.entries(table_checks_map)) {
    // @ts-ignore
    table_checks_map[key] = {}
  }
  await aggresiveCache(20, ipos.map(ipo => ipo.url))
  await Promise.all(ipos.map(async ipo => {
    const content = await get(ipo.url)
    console.log(ipo.name)
    if (!content) {
      return concat([{ name: ipo.name, url: ipo.url }, CardChecks, TableChecks])
    }
    if (content.length < 100) {
      console.error({ err: "request denied", name: ipo.name, url: ipo.url })
      return concat([{ name: ipo.name, url: ipo.url }, CardChecks, TableChecks]);
    }
    const $ = cheerio.load(content);
    const table_checks = structuredClone(TableChecks);
    $('[itemtype="http://schema.org/Table"]').each((_, table) => {
      try {
        if ($(table).children('h2').length == 0) return;
        for (const [key, value] of Object.entries(TableRegex))
          if (value.test($(table).children('h2').text().trim().toLowerCase())) {
            $(table).find('tr').each((i, v) =>{
              if(key == 'company_financials')
              console.log($(v).children('td:first-of-type').text())
            })
          }
      } catch (err) {
        console.error(err)
        process.exit()
      }
    })
    return concat([{ name: ipo.name, url: ipo.url }, CardChecks, table_checks]);
  }))

}

export const makeChecks = async (ipos: any) => {
  await aggresiveCache(20, ipos.map((ipo: any) => ipo.url))
  return await Promise.all(ipos.map(async (ipo: any) => {
    const content = await get(ipo.url)
    console.log(ipo.name)
    if (!content) {
      return concat([{ name: ipo.name, url: ipo.url }, CardChecks, TableChecks])
    }
    if (content.length < 100) {
      console.error({ err: "request denied", name: ipo.name, url: ipo.url })
      return concat([{ name: ipo.name, url: ipo.url }, CardChecks, TableChecks]);
    }
    const $ = cheerio.load(content);
    const card_checks = structuredClone(CardChecks);
    $('.card').each((_, card) => {
      try {
        if ($(card).find('h2').length == 0) return;
        for (const [key, value] of Object.entries(CardRegex))
          if (value.test($(card).find('h2').text().trim().toLowerCase())) {
            // @ts-ignore
            card_checks[key] = true;
          }
      } catch (err) {
        console.error(err)
        process.exit()
      }
    })
    const table_checks = structuredClone(TableChecks);
    $('[itemtype="http://schema.org/Table"]').each((_, table) => {
      try {
        if ($(table).children('h2').length == 0) return;
        for (const [key, value] of Object.entries(TableRegex))
          if (value.test($(table).children('h2').text().trim().toLowerCase())) {
            // @ts-ignore
            table_checks[key] = true;
          }
      } catch (err) {
        console.error(err)
        process.exit()
      }
    })
    return concat([{ name: ipo.name, url: ipo.url }, card_checks, table_checks]);
  }))
}

export default makeChecks
