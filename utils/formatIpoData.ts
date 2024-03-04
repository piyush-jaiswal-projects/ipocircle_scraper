import {
  Ipo_Anchor,
  Ipo_ContactDetails,
  Ipo_Dates,
  Ipo_FinProgress,
  Ipo_Finances,
  Ipo_Gmp,
  Ipo_Init,
  Ipo_Lots,
  Ipo_OtherDetails,
  Ipo_Prices,
  Ipo_Reservations,
  Ipo_Review,
  Ipo_Shares,
  Ipo_Subscriptions,
  Ipo_Tracker,
} from "../types/ipo.types";

const formatData = async (rawData: any[]) => {
  var completeData: any[] = [];

  rawData.forEach((item, index: number) => {
    const preOpenNse =
      item.details?.listing_at[0].substring(4) === "nse"
        ? item.details?.gen_holding_pre_issue
        : "";
    const preOpenBse =
      item.details?.listing_at[0].substring(4) === "bse"
        ? item.details?.gen_holding_post_issue
        : "";

    const listingDate = item?.details?.listing_date ?? null;
    const series = item.details?.listing_at[0].slice(4)

    const ipo: Ipo_Init = {
      name: item.name ?? "",
      series: series === '' ? "sme" : series,
      description: item.details?.description ?? "", // NA
      face_value: item.details?.face_value ?? 0,
      total_issue: item.details?.issue_size?.toString() ?? "",
      fresh_issue: item.details?.fresh_issue?.toString() ?? "",
      issue_type: item.details?.issue_type ?? "",
      listing_at: item.details?.listing_at ?? [],
      pre_open_nse: preOpenNse ?? "",
      pre_open_bse: preOpenBse ?? "",
      lot_size: item.details?.shares_in_lot ?? 0,
      priceband_min: item.details?.price[0] ?? 0,
      priceband_max: item.details?.price[1] ?? 0,
      objectIssueData: item.details?.objectIssueData ?? "", // NA
    };

    const ipoTracker: Ipo_Tracker = {
      company_name: item?.name ?? "",
      sector: item?.sector ?? "", // NA
      issue_price: item?.issue_price ?? 0, // NA
      current_price: item?.current_price ?? 0, // NA
      listing_price: item?.listing_price ?? 0, // NA
      dayend_price: item?.dayend_price ?? 0, // NA
      year: listingDate !== null ? item?.details?.listing_date["$y"] : 0,
    };

    const ipoPrices: Ipo_Prices = {
      min_price: item.details?.price[0] ?? 0,
      max_price: item.details?.price[1] ?? 0,
      dayend_price: item?.dayend_price ?? 0, // NA
      final_price: item?.final_price ?? 0, // NA
    };

    const ipoContact: Ipo_ContactDetails = {
      company_address: item?.company_address ?? "", // NA
      company_phone: item?.company_phone ?? "", // NA
      company_email: item?.company_email ?? "", // NA
      company_website: item?.company_website ?? "", // NA
      company_logo: item?.company_logo ?? "", // NA
      registrar_address: item?.registrar_address ?? "", // NA
      registrar_phone: item?.registrar_phone ?? "", // NA
      registrar_email: item?.registrar_email ?? "", // NA
      registrar_website: item?.registrar_website ?? "", // NA
      registrar_name: item?.registrar_name ?? "", // NA
    };

    const ipoLots: Ipo_Lots = {
      category: [''],
      lots_max: [0],
      lots_min: [0],
      min_bhni_lots: [0],
      max_bhni_lots: [0],
      max_bhni_price: [0],
      max_bhni_shares: [0],
      max_retail_lots: [0],
      max_retail_price: [0],
      max_retail_shares: [0],
      max_shni_lots: [0],
      max_shni_price: [0],
      max_shni_shares: [0],
      min_bhni_price: [0],
      min_bhni_shares: [0],
      min_retail_lots: [0],
      min_retail_price: [0],
      min_retail_shares: [0],
      min_shni_lots: [0],
      min_shni_price: [0],
      min_shni_shares: [0]
    };

    const ipoOther: Ipo_OtherDetails = {
      bse_code: item?.bse_code ?? "",
      bse_url: item?.bse_url ?? "",
      nse_code: item?.nse_code ?? "",
      nse_url: item?.nse_url ?? "",
      drhp: item?.drhp ?? "",
      anchor_list: item?.drhp ?? [],
      defunct: item?.defunct ?? false,
      retail_discount: item?.retail_discount ?? "",
      employee_discount: item?.employee_discount ?? "",
      ofs: item?.ofs ?? "",
      credit_of: item?.credit_of ?? "",
      time_upf: item?.time_upf ?? "",
      gen_holding_pre: item?.details?.gen_holding_pre_issue?.toString() ?? "",
      gen_holding_post: item?.details?.gen_holding_post_issue?.toString() ?? "",
      promoter_holding_pre:
        item?.promoter_holding?.promoter_holdings_preissue?.toString() ?? "",
      promoter_holding_post:
        item?.promoter_holding?.promoter_holdings_postissue?.toString() ?? "",
    };

    const ipoReview: Ipo_Review = {
      review: "",
    };

    const ipoReserve: Ipo_Reservations = 
      {
        category: [''],
        shares_offerred: [0],
      };

    const ipoGmp: Ipo_Gmp = {
      instant: [new Date()],
      percent_value: [0],
      absolute_value: [0]
    };

    const ipoAnchor: Ipo_Anchor = {
      anchor_bid_date: item?.anchor_bid_date ?? new Date(0), // NA
      anchor_lockin_half: new Date(0), // NA
      anchor_lockin_full: new Date(0), // NA
      anchor_lockin_rest: new Date(0), // NA
      anchor_portion: 0, // NA
      anchor_shares_offerred: 0, // NA
    };

    const ipoDates: Ipo_Dates = {
      opening_date: item?.dates?.opening_date ?? new Date(0), // NA
      closing_date: item?.dates?.closing_date ?? new Date(0), // NA
      basis_date: item?.dates?.basis_date ?? new Date(0), // NA
      init_refunds: item?.dates?.init_refunds ?? new Date(0), // NA
      credit_of_shares_to_demat:
        item?.dates?.credit_of_shares_to_demat ?? new Date(0), // NA
      listing_date:
        listingDate !== null ? item?.details?.listing_date["$d"] : new Date(0), // NA
      cutoff_mandate: item?.dates?.cutoff_mandate ?? new Date(0), // NA
      allotment_date: item?.dates?.allotment_date ?? new Date(0), // NA
    };

    const ipoShares: Ipo_Shares = {
      // NA
      anchor_shares_offerred: item?.fuckyou?.anchor_shares_offerred ?? 0,
      qib_shares_offerred: item?.fuckyou?.qib_shares_offerred ?? 0,
      nii_bnii_shares_offerred: item?.fuckyou?.nii_bnii_shares_offerred ?? 0,
      nii_snii_shares_offerred: item?.shares?.nii_snii_shares_offerred ?? 0,
      retail_shares_offerred: item?.shares?.retail_shares_offerred ?? 0,
    };

    const ipoFinances: Ipo_Finances = {
      pe: item?.performance?.roe ?? 0,
      market_cap: item?.performance?.market_cap ?? 0, // NA
      roe: item?.performance?.roe ?? 0,
      roce: item?.performance?.roce ?? 0,
      eps: item?.performance?.eps ?? 0,
      ronw: item?.performance?.ronw ?? 0,
      debt: item?.performance?.debt ?? 0,
    };

    const ipoSubs: Ipo_Subscriptions = {
      shares_bid: item?.subscription?.shares_bid ?? 0,
      qib: item?.subscription?.qib ?? 0,
      nii_snii: item?.subscription?.nii_snii ?? 0,
      nii_bnii: item?.subscription?.nii_bnii ?? 0,
      retail: item?.subscription?.retail ?? 0,
      updated_at: item?.subscription?.updated_at ?? new Date(0),
    };

    const ipoFinProg: Ipo_FinProgress = {
      details: [
        {
          period_ended: "",
          assets: 0,
          revenue: 0,
          profit_after_tax: 0,
          borrowing: 0,
          reserves: 0,
          networth: 0,
        },
      ],
    };

    const data = {
      ipo: ipo,
      anchor: ipoAnchor,
      contact: ipoContact,
      dates: ipoDates,
      finance: ipoFinances,
      finProgress: ipoFinProg,
      gmp: ipoGmp,
      lots: ipoLots,
      otherDetails: ipoOther,
      prices: ipoPrices,
      reservations: ipoReserve,
      review: ipoReview,
      shares: ipoShares,
      subscription: ipoSubs,
      tracker: ipoTracker,
    };

    completeData.push(data);
  });

  return completeData;
};

export default formatData;
