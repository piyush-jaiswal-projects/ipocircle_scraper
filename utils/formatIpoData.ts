import { stringify } from "uuid";
import { CompanyFinances } from "../classes/finance";
import { Ipo } from "../classes/ipo";
import { RawIpoData } from "../types/rawIpoData.types";
import dayjs from "dayjs";

const formatData = async (rawData: any[]) => {
  var completeData: any[] = [];
  console.log();

  rawData.forEach((item: RawIpoData, index: number) => {
    const IPO = new Ipo();
    const COMP_FIN = new CompanyFinances();
    // assign values to IPO and CompFin

    IPO.id = index + item.name;
    IPO.name = item.name;
    IPO.series = item.details?.listing_at[0]?.slice(4);
    IPO.description = "";
    IPO.face_value = item.details?.face_value?.toString();
    IPO.min_price = item.details?.price[0]?.toString();
    IPO.max_price = item.details?.price[1]?.toString();
    IPO.total_issues = item.details?.issue_size?.toString();
    IPO.fresh_issues = item.details?.fresh_issue?.toString();
    IPO.issue_type = item.details?.issue_type;
    IPO.listing_at = item.details?.listing_at;
    IPO.gen_holding_pre = item.details?.gen_holding_pre_issue?.toString();
    IPO.gen_holding_post = item.details?.gen_holding_post_issue?.toString();
    IPO.opening_date =
      item.details?.ipo_date !== null
      //   @ts-ignore
        ? item.details?.ipo_date[0]?.$d
        : new Date();
    IPO.closing_date =
      item.details?.ipo_date !== null
      //   @ts-ignore
        ? item.details?.ipo_date[1]?.$d
        : new Date();
    IPO.basis_date = new Date();
    IPO.init_refunds = new Date();
    IPO.shares_to_demat = new Date();
    IPO.listing_date =
      item.details?.listing_date !== null
        ? item.details?.listing_date?.$d
        : new Date();
    IPO.promoter_holding_pre =
      item.promoter_holding?.promoter_holdings_preissue?.toString();
    IPO.promoter_holding_post =
      item.promoter_holding?.promoter_holdings_postissue?.toString();
    IPO.anchor_bid_date =
      item.details?.ipo_date !== null
        ? item.anchor?.anchor_bid_date?.$d
        : new Date();
    IPO.anchor_lockin_half =
      item.details?.ipo_date !== null
        ? item.anchor?.anchor_lockinhalf?.$d
        : new Date();
    IPO.anchor_lockin_rest =
      item.details?.ipo_date !== null
        ? item.anchor?.anchor_lockinrest?.$d
        : new Date();
    IPO.pe = item.performance?.pe?.toString();
    IPO.market_cap = "";
    IPO.roe = item.performance?.roe?.toString();
    IPO.roce = item.performance?.roce?.toString();
    IPO.eps = item.performance?.eps?.toString();
    IPO.ronw = item.performance?.ronw?.toString();
    IPO.bse_code = "";
    IPO.bse_url = "";
    IPO.nse_code = "";
    IPO.nse_url = "";
    IPO.final_price = "";
    IPO.pre_open_nse = "";
    IPO.pre_open_bse = "";
    IPO.company_address = "";
    IPO.company_phone = "";
    IPO.company_email = "";
    IPO.company_website = "";
    IPO.company_logo = "";
    IPO.registrar_address = "";
    IPO.registrar_phone = "";
    IPO.registrar_email = "";
    IPO.registrar_website = "";
    IPO.registrar_name = "";
    IPO.drhp = "";
    IPO.rhp = "";
    IPO.anchor_list = [];
    IPO.shares_in_lot = item.details?.shares_in_lot?.toString();
    IPO.dayend_price = "";
    IPO.cutoffmandate = "";
    IPO.defunct = false;
    IPO.retail_discount = "";
    IPO.employee_discount = "";
    IPO.anchor_portion = item.anchor?.anchor_portion?.toString();
    IPO.debt = item.performance?.debt?.toString();
    IPO.priceband = "";
    IPO.ofs = "";
    IPO.allotment_date = new Date();
    IPO.credit_of = "";
    IPO.time_upf = "";
    IPO.min_retail = item.lotsize?.retail_min?.toString();
    IPO.max_retail = item.lotsize?.retail_max?.toString();
    IPO.min_shni = item.lotsize?.snii_min?.toString();
    IPO.max_shni = item.lotsize?.snii_max?.toString();
    IPO.min_bhni = item.lotsize?.bnii_min?.toString();
    IPO.max_bhni = "";
    IPO.qib = item.subscription?.qib?.toString();
    IPO.nii_snii = item.subscription?.snii?.toString();
    IPO.nii_bnii = item.subscription?.bnii?.toString();
    IPO.retail = item.subscription?.retail?.toString();
    IPO.anchor_shares_offerred = item.reservation?.anchor?.toString();
    IPO.qib_shares_offerred = item.reservation?.qib?.toString();
    IPO.nil_shares_offerred = item.reservation?.nii?.toString();
    IPO.retail_shares_offerred = item.reservation?.retail?.toString();
    IPO.objectIssueData = "";

    COMP_FIN.ipo_id = index + item.name;

    const data = {
      ipodetails: IPO,
      companyFinance: COMP_FIN,
    };
    completeData.push(data);
  });

  return completeData;
};

export default formatData;
