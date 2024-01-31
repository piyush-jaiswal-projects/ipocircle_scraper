import {TableRegex} from './regexes'
import { log } from '../utils/scraper'
import dayjs from 'dayjs'
import customParse from 'dayjs/plugin/customParseFormat.js'
dayjs.extend(customParse)

const TableRegexExt = {
  details: {
    ipo_date: {
      regex: /ipo date/,
      matcher: (tomatch: any) => {
        let ret;
        const dates = tomatch.split("to", 2)
        if (dates.length < 2) {
          ret = null;
        }
        else {
          ret = dates.map((date: any) => {
            const parsed = dayjs(date)
            if (!parsed.isValid()) return null
            return parsed;
          }).filter((parsed: any) => parsed);
        }
        return ret.length < 2 ? [null, "error"] : [ret]
      }
    },
    listing_date: {
      regex: /listing date/,
      matcher: (tomatch: any) => {
        const parse = dayjs(tomatch)
        return parse.isValid() ? [parse] : [null, "error"]
      }
    },
    face_value: {
      regex: /face value/,
      matcher: (tomatch: any) => {
        const res = parseFloat(tomatch.replace(/[^\d.]/g, ''))
        return isNaN(res) ? [res, "error"] : [res]
      }
    },
    price: {
      regex: /price/,
      matcher: (tomatch: any) => {
        let ret;
        const prices = tomatch.split("to", 2)
        if (prices.length == 0) {
          ret = null;
        }
        else {
          ret = prices.map((price: any) => {
            const parsed = parseFloat(price.replace(/[^\d.]/g, ''))
            return parsed;
          }).filter((parsed: any) => parsed);
        }
        return ret.length == 0 ? [null, "error"] : [ret]
      }
    },
    shares_in_lot: {
      regex: /lot size/,
      matcher: (tomatch: any) => {
        const res = parseInt(tomatch.replace(/[^\d.]/g, ''))
        return isNaN(res) ? [res, "error"] : [res]
      }
    },
    issue_size: {
      regex: /total issue size/,
      matcher: (tomatch: any) => {
        const res = parseInt(tomatch.replace(/share.*\n*.*/g, '').replace(/[^\d.]/g, ''))
        return isNaN(res) ? [res, "error"] : [res]
      }
    },
    fresh_issue: {
      regex: /fresh issue/,
      matcher: (tomatch: any) => {
        const res = parseInt(tomatch.replace(/share.*\n*.*/g, '').replace(/[^\d.]/g, ''))
        return isNaN(res) ? [res, "error"] : [res]
      }
    },
    ofs: {
      regex: /offer for sale/,
      matcher: (tomatch: any) => {
        const res = parseInt(tomatch.replace(/share.*\n*.*/g, '').replace(/[^\d.]/g, ''))
        return isNaN(res) ? [res, "error"] : [res]
      }
    },
    issue_type: {
      regex: /issue type/,
      matcher: (tomatch: any) => {
        return /book/.test(tomatch) ? ['book'] : ['fixed']
      }
    },
    listing_at: {
      regex: /listing at/,
      matcher: (tomatch: any) => {
        const res = tomatch.split(',').map((v: any) => v.trim())
        return res.length == 0 ? [res, "error"] : [res]
      }
    },
    gen_holding_pre_issue: {
      regex: /share holding pre issue/,
      matcher: (tomatch: any) => {
        const res = parseInt(tomatch.replace(/[^\d.]/g, ''))
        return isNaN(res) ? [res, "error"] : [res]
      }
    },
    gen_holding_post_issue: {
      regex: /share holding post issue/,
      matcher: (tomatch: any) => {
        const res = parseInt(tomatch.replace(/[^\d.]/g, ''))
        return isNaN(res) ? [res, "error"] : [res]
      }
    },
    market_maker_portion: {
      regex: /market maker portion/,
      matcher: (tomatch: any) => {
        const res = parseInt(tomatch.replace(/share.*\n*.*/g, '').replace(/[^\d.]/g, ''))
        return isNaN(res) ? [res, "error"] : [res]
      }
    },
    employee_discount: {
      regex: /employee discount/,
      matcher: (tomatch: any) => {
        const res = parseFloat(tomatch.replace(/[^\d.]/g, ''))
        return isNaN(res) ? [res, "error"] : [res]
      }
    },
    bid_date: {
      regex: /bid date/,
      matcher: (tomatch: any) => {
        const parse = dayjs(tomatch)
        return parse.isValid() ? [parse] : [null, "error"]
      }
    },
    shares_offered: {
      regex: /shares offered/,
      matcher: (tomatch: any) => {
        const res = parseInt(tomatch.replace(/share.*\n*.*/g, '').replace(/[^\d.]/g, ''))
        return isNaN(res) ? [res, "error"] : [res]
      }
    },
    anchor_portion: {
      regex: /anchor portion/,
      matcher: (tomatch: any) => {
        const res = parseFloat(tomatch.replace(/[^\d.]/g, ''))
        return isNaN(res) ? [res, "error"] : [res]
      }
    },
    anchor_half: {
      regex: /anchor lock-in period end date for 50% shares/,
      matcher: (tomatch: any) => {
        const parse = dayjs(tomatch)
        return parse.isValid() ? [parse] : [null, "error"]
      }
    },
    anchor_full: {
      regex: /anchor lock-in period end date for remaining shares/,
      matcher: (tomatch: any) => {
        const parse = dayjs(tomatch)
        return parse.isValid() ? [parse] : [null, "error"]
      }
    },
    retail_discount: {
      regex: /retail discount/,
      matcher: (tomatch: any) => {
        const res = parseFloat(tomatch.replace(/[^\d.]/g, ''))
        return isNaN(res) ? [res, "error"] : [res]
      }
    },
  },
  reservation: {
    qib: {
      regex: /qib/,
      matcher: (tomatch: any) => {
        const res = parseInt(tomatch.replace(/\(.*\)/g, '').replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
    nii: {
      regex: /^nii/,
      matcher: (tomatch: any) => {
        const res = parseInt(tomatch.replace(/\(.*\)/g, '').replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
    bnii: {
      regex: /bnii/,
      matcher: (tomatch: any) => {
        const res = parseInt(tomatch.replace(/\(.*\)/g, '').replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
    snii: {
      regex: /snii/,
      matcher: (tomatch: any) => {
        const res = parseInt(tomatch.replace(/\(.*\)/g, '').replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
    retail: {
      regex: /retail/,
      matcher: (tomatch: any) => {
        const res = parseInt(tomatch.replace(/\(.*\)/g, '').replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
    other: {
      regex: /other/,
      matcher: (tomatch: any) => {
        const res = parseInt(tomatch.replace(/\(.*\)/g, '').replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
    anchor: {
      regex: /anchor investor/,
      matcher: (tomatch: any) => {
        const res = parseInt(tomatch.replace(/\(.*\)/g, '').replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
    market_maker: {
      regex: /market maker/,
      matcher: (tomatch: any) => {
        const res = parseInt(tomatch.replace(/\(.*\)/g, '').replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
    total: {
      regex: /total/,
      matcher: (tomatch: any) => {
        const res = parseInt(tomatch.replace(/\(.*\)/g, '').replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    }, employees: {
      regex: /employee/,
      matcher: (tomatch: any) => {
        const res = parseInt(tomatch.replace(/\(.*\)/g, '').replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
  },
  anchor: {
    anchor_bid_date: {
      regex: /bid date/,
      matcher: (tomatch: any) => {
        const date = dayjs(tomatch)
        return date.isValid() ? [date] : [null, "error"]
      }
    },
    anchor_shares: {
      regex: /shares offered/,
      matcher: (tomatch: any) => {
        const res = parseInt(tomatch.replace(/[^\d.]/g, ''))
        return isNaN(res) ? [res, "error"] : [res]
      }
    },
    anchor_portion: {
      regex: /anchor portion size /,
      matcher: (tomatch: any) => {
        const res = parseFloat(tomatch.replace(/[^\d.]/g, ''))
        return isNaN(res) ? [res, "error"] : [res]
      }
    },
    anchor_lockinhalf: {
      regex: /anchor lock-in period end date for 50% shares/,
      matcher: (tomatch: any) => {
        const date = dayjs(tomatch)
        return date.isValid() ? [date] : [null, "error"]
      }
    },
    anchor_lockinrest: {
      regex: /anchor lock-in period end date for remaining shares/,
      matcher: (tomatch: any) => {
        const date = dayjs(tomatch)
        return date.isValid() ? [date] : [null, "error"]
      }
    },
  },
  timetable: {
    opening_date: {
      regex: /open date/,
      matcher: (tomatch: any) => {
        const date = dayjs(tomatch)
        return date.isValid() ? [date] : [null, "error"]
      }
    },
    closing_date: {
      regex: /closing date/,
      matcher: (tomatch: any) => {
        const date = dayjs(tomatch)
        return date.isValid() ? [date] : [null, "error"]
      }
    },
    basis: {
      regex: /basis of allotment/,
      matcher: (tomatch: any) => {
        const date = dayjs(tomatch)
        return date.isValid() ? [date] : [null, "error"]
      }
    },
    initiation_of_refunds: {
      regex: /initiation of refunds/,
      matcher: (tomatch: any) => {
        const date = dayjs(tomatch)
        return date.isValid() ? [date] : [null, "error"]
      }
    },
    shares_to_demat: {
      regex: /demat/,
      matcher: (tomatch: any) => {
        const date = dayjs(tomatch)
        return date.isValid() ? [date] : [null, "error"]
      }
    },
    listing_date: {
      regex: /listing date/,
      matcher: (tomatch: any) => {
        const date = dayjs(tomatch)
        return date.isValid() ? [date] : [null, "error"]
      }
    },
    cut_off: {
      regex: /cut\-off/,
      matcher: (tomatch: any) => {
        const timestamp = tomatch.split('on')
        if (timestamp.length != 2)
          return [null, "error"]
        const time = dayjs(timestamp[0].trim(), ['h a', 'h:mm a'], true)
        const date = dayjs(timestamp[1].trim())
        if (!time.isValid() || !date.isValid())
          return [null, "error"]
        return [date.hour(time.hour()).minute(time.minute())]
      }
    },
  },
  lotsize: {
    retail_min: {
      regex: /retail \(min\)/,
      matcher: (tomatch: any) => {
        const res = parseInt(tomatch.replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
    retail_max: {
      regex: /retail \(max\)/,
      matcher: (tomatch: any) => {
        const res = parseInt(tomatch.replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
    snii_min: {
      regex: /s-hni \(min\)/,
      matcher: (tomatch: any) => {
        const res = parseInt(tomatch.replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
    snii_max: {
      regex: /s-hni \(max\)/,
      matcher: (tomatch: any) => {
        const res = parseInt(tomatch.replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
    bnii_min: {
      regex: /b-hni \(min\)/,
      matcher: (tomatch: any) => {
        const res = parseInt(tomatch.replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
    nii_min: {
      regex: /hni \(min\)/,
      matcher: (tomatch: any) => {
        const res = parseInt(tomatch.replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
    all_investors: {
      regex: /all investors/,
      matcher: (tomatch: any) => {
        const res = parseInt(tomatch.replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
    all_min: {
      regex: /^\(min\)$/,
      matcher: (tomatch: any) => {
        const res = parseInt(tomatch.replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    }
  },
  promoter_holding: {
    promoter_holdings_preissue: {
      regex: /pre issue/,
      matcher: (tomatch: any) => {
        const res = parseFloat(tomatch.replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
    promoter_holdings_postissue: {
      regex: /post issue/,
      matcher: (tomatch: any) => {
        const res = parseFloat(tomatch.replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
  },
  performance: {
    roe: {
      regex: /roe/,
      matcher: (tomatch: any) => {
        const res = parseFloat(tomatch.replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
    roce: {
      regex: /roce/,
      matcher: (tomatch: any) => {
        const res = parseFloat(tomatch.replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
    debt: {
      regex: /debt\/equity/,
      matcher: (tomatch: any) => {
        const res = parseFloat(tomatch.replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
    eps: {
      regex: /eps/,
      matcher: (tomatch: any) => {
        const res = parseFloat(tomatch.replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
    ronw: {
      regex: /ronw/,
      matcher: (tomatch: any) => {
        const res = parseFloat(tomatch.replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
    market_cap: {
      regex: /market cap/,
      matcher: (tomatch: any) => {
        const res = parseFloat(tomatch.replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
    pe: {
      regex: /p\/e/,
      matcher: (tomatch: any) => {
        const res = parseFloat(tomatch.replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
  },
  subscription: {
    qib: {
      regex: /qib/,
      matcher: (tomatch: any) => {
        const res = parseFloat(tomatch.replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
    nii: {
      regex: /^nii/,
      matcher: (tomatch: any) => {
        const res = parseFloat(tomatch.replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
    bnii: {
      regex: /bnii/,
      matcher: (tomatch: any) => {
        const res = parseFloat(tomatch.replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
    snii: {
      regex: /snii/,
      matcher: (tomatch: any) => {
        const res = parseFloat(tomatch.replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
    retail: {
      regex: /retail/,
      matcher: (tomatch: any) => {
        const res = parseFloat(tomatch.replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
    total: {
      regex: /total/,
      matcher: (tomatch: any) => {
        const res = parseFloat(tomatch.replace(/[^\d.]/g, '').trim())
        return isNaN(res) ? [res, "kerror"] : [res]
      }
    },
  },
}

const _tableGenMatcher = ($: any, table: string, tableKey: string, name: string) => {
  const res = {}
  $(table).find('tbody > tr').each(function (i: any, val: any) {
    try {
      const cols = $(val).children('td')
      if (cols.length < 2) return;
      // @ts-ignore
      for (const [discriptorKey, discriptor] of Object.entries(TableRegexExt[tableKey])) {
        // @ts-ignore
        if (discriptor.regex.test($(cols.get(0)).text().trim().toLowerCase())) {
          const valueToMatch = $(cols.get(1)).text().trim().toLowerCase();
          // @ts-ignore
          const [json, err] = discriptor.matcher(valueToMatch)
          if (err) {
            log({ ipo: name, table: tableKey, field: discriptorKey, value: valueToMatch })
          }
          // @ts-ignore
          res[discriptorKey] = json
        }
      }
    } catch (err) {
      console.error(err)
      process.exit()
    }
  })
  return res
}

export const tableDataInJson = ($: any, name: any) => {
  const res: any = {}
  res.name = name
  $('[itemtype="http://schema.org/Table"]').each(function (_: any, table: any) {
    if ($(table).children('h2').length == 0) return;
    for (const [key, value] of Object.entries(TableRegex)) {
      if (value.test($(table).children('h2').text().trim().toLowerCase())) {
        if (key == 'company_financials') continue;
        res[key] = _tableGenMatcher($, table, key, name)
      }
    }
  })
  return res;
}

export default tableDataInJson
