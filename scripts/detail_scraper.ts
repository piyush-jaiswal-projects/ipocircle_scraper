import { aggresiveCache, get } from '../utils/scraper'
import * as cheerio from 'cheerio'
import _tableDataInJson from './table_matcher'
import { IpoSchema, IpoLotsSchema, CompanyFinancesSchema } from './schema.js'

const scrapeIPODetails = async (ipos: any[]) => {
  console.log("Scraping in progress ...");
  await aggresiveCache(20, ipos.map(ipo => ipo.url))
  const res = await Promise.all(ipos.map(async(ipo) => {
    return await scrapeSingle(ipo);
  }));
  return res;
}

const scrapeSingle = async (ipo: any) => {
  try {
    const content = await get(ipo.url)
    if (content === "") return;
    const $ = cheerio.load(content);
    const tables = _tableDataInJson($, ipo.name)
    return tables;
  } catch (err) {
    console.error(err)
    process.exit()
  }
}

// const ipoLotsPopulator = (ipo, tables, cards) => {
//   const ipoLots = []
//   if (tables.lotsize) {
//     for (const [key, value] of Object.entries(tables.lotsize)) {
//       let ipoLot = structuredClone(IpoLotsSchema)
//       ipoLot.category = key.split('_')[0]
//       if (ipoLot.category === 'all') {
//         ipoLot.category = 'undefined'
//       }
//       // this is a sad state of code wtf
//       const found = ipoLots.findIndex(lotVal => lotVal.category === ipoLot.category)
//       if (found != -1) {
//         if (ipoLot.category === 'undefind') {
//           ipoLots[found].lots_min = value
//           continue
//         }
//         if (key.split('_')[1] === 'min')
//           ipoLots[found].lots_min = value
//         else
//           ipoLots[found].lots_max = value
//         continue
//       }
//       ipoLot.ipo_id = ipo.id
//       if (ipoLot.category === 'undefind') {
//         ipoLot.lots_min = value
//         ipoLots.push(ipoLot)
//         continue;
//       }
//       if (key.split('_')[1] === 'min')
//         ipoLot.lots_min = value
//       else
//         ipoLot.lots_max = value
//       ipoLots.push(ipoLot)
//     }
//   }
//   return ipoLots
// }



// const ipoPopulater = (ipo, tables, cards) => {
//   const ipoDetails = structuredClone(IpoSchema)
//   ipoDetails.id = ipo.id
//   ipoDetails.name = ipo.name.trim().replace(/IPO$/, '') || null
//   ipoDetails.series = ipo.series || null
//   ipoDetails.defunct = ipo.defunct || null
//   ipoDetails.listing_at = ipo.exchange || null
//   ipoDetails.final_price = ipo.final_price || null
//   ipoDetails.shares_in_lot = ipo.shares_in_lot || null
//   ipoDetails.closing_date = ipo.closing_date || null
//   ipoDetails.opening_date = ipo.opening_date || null

//   if (tables.details) {
//     if (tables.details.ipo_date) {
//       ipoDetails.opening_date = tables.details.ipo_date[0]
//       ipoDetails.closing_date = tables.details.ipo_date[1]
//     }
//     if (tables.details.listing_date) {
//       ipoDetails.listing_date = tables.details.listing_date;
//     }
//     ipoDetails.facevalue = tables.details.face_value
//     if (tables.details.price) {
//       if (tables.details.price.length == 2) {
//         ipoDetails.min_price = tables.details.price[0]
//         ipoDetails.max_price = tables.details.price[1]
//       } else if (tables.details.price.length == 1) {
//         ipoDetails.min_price = tables.details.price[0]
//         ipoDetails.max_price = tables.details.price[0]
//       }
//     }
//     if (tables.details.shares_in_lot) {
//       ipoDetails.shares_in_lot = tables.details.shares_in_lot
//     }
//     ipoDetails.total_issue = tables.details.issue_size || null
//     ipoDetails.fresh_issue = tables.details.fresh_issue || null
//     if (tables.details.ofs) {
//       if (!ipoDetails.fresh_issue && !ipoDetails.total_issue) {
//         ipoDetails.fresh_issue = 0
//         ipoDetails.total_issue = tables.details.ofs
//       } else if (!ipoDetails.fresh_issue) {
//         ipoDetails.fresh_issue = ipoDetails.total_issue - tables.details.ofs
//       } else if (!ipoDetails.total_issue) {
//         ipoDetails.total_issue = ipoDetails.fresh_issue + tables.details.ofs
//       }
//     }
//     ipoDetails.issue_type = tables.details.issue_type || null
//     ipoDetails.gen_holding_post_issue = tables.details.gen_holding_post_issue || null
//     ipoDetails.gen_holding_pre_issue = tables.details.gen_holding_pre_issue || null
//     ipoDetails.employee_discount = tables.details.employee_discount || null
//     if (!ipoDetails.total_issue && !ipoDetails.fresh_issue) {
//       ipoDetails.fresh_issue = 0 || null
//       ipoDetails.total_issue = tables.details.shares_offered || null
//     }
//     ipoDetails.anchor_portion = tables.details.anchor_portion || null
//     ipoDetails.anchor_lockinhalf = tables.details.anchor_half || null
//     ipoDetails.anchor_lockinrest = tables.details.anchor_full || null
//     ipoDetails.retail_discount = tables.details.retail_discount || null
//   }
//   if (tables.anchor) {
//     if (tables.anchor.anchor_portion) {
//       ipoDetails.anchor_portion = tables.anchor.anchor_portion
//     }
//     if (tables.anchor.anchor_lockinhalf) {
//       ipoDetails.anchor_lockinhalf = tables.anchor.anchor_lockinhalf
//     }
//     if (tables.anchor.anchor_lockinrest) {
//       ipoDetails.anchor_lockinrest = tables.anchor.anchor_lockinrest
//     }
//     ipoDetails.anchor_bid_date = tables.anchor.anchor_bid_date || null
//   }
//   if (tables.timetable) {
//     if (tables.timetable.opening_date) {
//       ipoDetails.opening_date = tables.timetable.opening_date
//     }
//     if (tables.timetable.closing_date) {
//       ipoDetails.closing_date = tables.timetable.closing_date
//     }
//     ipoDetails.basis_date = tables.timetable.basis || null
//     ipoDetails.initiation_of_refunds = tables.timetable.initiation_of_refunds || null
//     ipoDetails.shares_to_demat = tables.timetable.shares_to_demat || null
//     if (tables.timetable.listing_date) {
//       ipoDetails.listing_date = tables.timetable.listing_date
//     }
//     ipoDetails.cut_off_mandate = tables.timetable.cut_off
//   }
//   if (tables.promoter_holding) {
//     ipoDetails.promoter_holdings_postissue = tables.promoter_holding.promoter_holdings_postissue || null
//     ipoDetails.promoter_holdings_preissue = tables.promoter_holding.promoter_holdings_preissue || null
//   }
//   if (tables.performance) {
//     ipoDetails.roe = tables.performance.roe || null
//     ipoDetails.roce = tables.performance.roce || null
//     ipoDetails.debt = tables.performance.debt || null
//     ipoDetails.eps = tables.performance.eps || null
//     ipoDetails.ronw = tables.performance.ronw || null
//     ipoDetails.marketcap = tables.performance.market_cap || null
//     ipoDetails.pe = tables.performance.pe || null
//   }
//   return ipoDetails

// }

export default scrapeIPODetails
