import { FormattedData } from "../types/ipo.types";

const formatData = async (rawData: any[]) => {
  try {
    var completeData: FormattedData[] = [];
    rawData?.forEach((data) => {
      var finalData: FormattedData = {
        ipo_id: "",
        name: "",
        series: "",
        opening_date: "",
        closing_date: "",
        details: {
          ipo_id: "",
          ipo_date: "",
          listing_date: "",
          face_value: "",
          price: "",
          lot_size: "",
          total_issue_size: "",
          fresh_issue: "",
          issue_type: "",
          listing_at: "",
          share_holding_pre_issue: "",
          share_holding_post_issue: "",
          market_maker_portion: "",
          about: "",
          objectOfIssue: "",
        },
        reservations: {
          ipo_id: "",
          retail_shares_offerred: "",
          other_shares_offerred: "",
          total_shares_offerred: "",
          qib_shares_offerred: "",
          anchor_shares_offerred: "",
          market_maker_shares_offerred: "",
          nii_hnii_shares_offerred: "",
        },
        timeline: {
          ipo_id: "",
          open_date: "",
          close_date: "",
          basis_of_allotment: "",
          initiation_of_refunds: "",
          credit_of_shares_to_demat: "",
          listing_date: "",
          cutoff_time_for_upi_mandate: "",
        },
        lotsize: {
          ipo_id: "",
          application: "",
          lots: "",
          shares: "",
          amount: "",
        },
        promoterholdings: {
          ipo_id: "",
          shareholding_preissue: "",
          shareholding_postissue: "",
        },
        financials: {
          ipo_id: "",
          period_ended: [],
          assets: [],
          revenue: [],
          profit_after_tax: [],
          net_worth: [],
          reserves_and_surplus: [],
          total_borrowing: [],
        },
        kpi: {
          ipo_id: "",
          roe: "",
          roce: "",
          ronw: "",
          pbv: "",
          pat_marin_percent: "",
          eps_rs_preIpo: "",
          eps_rs_postIpo: "",
          pe_preIpo: "",
          pe_postIpo: "",
        },
        contact: {
          ipo_id: "",
          address: "",
          phone: "",
          email: "",
          website: "",
        },
        registrarContact: {
          ipo_id: "",
          name: "",
          phone: "",
          email: "",
          website: "",
        },
      };

      finalData.ipo_id = createIpoId(data) || "";
      finalData.name = data.CompanyName || "";
      finalData.opening_date = data.Dates?.split(" -")[0] || "";
      finalData.closing_date = data.Dates?.split("- ")[1] || "";
      finalData.series = getIpoSeries(data) || "";
      finalData.details = {
        ipo_id: createIpoId(data) || "",
        ipo_date: data.Dates || "",
        listing_date: data["Listing Date"] || "",
        face_value: data["Face Value"] || "",
        price: data["Price Band"] || "",
        lot_size: data["Lot Size"] || "",
        total_issue_size: data["Total Issue Size"] || "",
        fresh_issue: data["Fesh Issue"] || "",
        issue_type: data["Issue Type"] || "",
        listing_at: data["Listing At"] || "",
        share_holding_pre_issue: data["Share holding pre issue"] || "",
        share_holding_post_issue: data["Share holding post issue"] || "",
        market_maker_portion: data["Market Maker portion"] || "",
        about: data.ipoSummary || "",
        objectOfIssue: data.objectsOfTheIssue || "",
      };
      finalData.reservations = {
        ipo_id: createIpoId(data) || "",
        retail_shares_offerred: data["Retail Shares Offered"] || "",
        other_shares_offerred: data["Other Shares Offered"] || "",
        total_shares_offerred: data["Total Shares Offered"] || "",
        qib_shares_offerred: data["QIB Shares Offered"] || "",
        anchor_shares_offerred: data["Anchor Investor Shares Offered"] || "",
        market_maker_shares_offerred: data["Market Maker Shares Offered"] || "",
        nii_hnii_shares_offerred: data["NII (HNI) Shares Offered"] || "",
      };
      finalData.timeline = {
        ipo_id: createIpoId(data) || "",
        open_date: data["IPO Open Date"] || "",
        close_date: data["IPO Close Date"] || "",
        basis_of_allotment: data["Basis of Allotment"] || "",
        initiation_of_refunds: data["Initiation of Refunds"] || "",
        credit_of_shares_to_demat: data["Credit of Shares to Demat"] || "",
        cutoff_time_for_upi_mandate:
          data["Cut-off time for UPI mandate confirmation"] || "",
        listing_date: data["Listing Date"] || "",
      };
      finalData.lotsize = {
        ipo_id: createIpoId(data) || "",
        application: data.Application || "",
        lots: data.Lots || "",
        shares: data.Shares || "",
        amount: data.Amount || "",
      };
      finalData.promoterholdings = {
        ipo_id: createIpoId(data) || "",
        shareholding_postissue: data["Share Holding Post Issue"] || "",
        shareholding_preissue: data["Share Holding Pre Issue"] || "",
      };
      finalData.financials = {
        ipo_id: createIpoId(data) || "",
        period_ended: data.periodEnded || "",
        assets: data.assets || "",
        revenue: data.revenue || "",
        profit_after_tax: data.profitAfterTax || "",
        net_worth: data.netWorth || "",
        reserves_and_surplus: data.reservesAndSurplus || "",
        total_borrowing: data.totalBorrowing || "",
      };
      finalData.kpi = {
        ipo_id: createIpoId(data) || "",
        roe: data.ROE || "",
        roce: data.ROCE || "",
        ronw: data.RoNW || "",
        pbv: data["P/BV"] || "",
        pat_marin_percent: data["PAT Margin (%)"] || "",
        eps_rs_preIpo:
          data["kpi2-PreIpo"] && data["kpi2-PreIpo"].length > 0
            ? data["kpi2-PreIpo"][0]
            : "",
        eps_rs_postIpo:
          data["kpi2-PostIpo"] && data["kpi2-PostIpo"].length > 0
            ? data["kpi2-PostIpo"][0]
            : "",
        pe_postIpo:
          data["kpi2-PostIpo"] && data["kpi2-PostIpo"].length > 0
            ? data["kpi2-PostIpo"][1]
            : "",
        pe_preIpo:
          data["kpi2-PreIpo"] && data["kpi2-PreIpo"].length > 0
            ? data["kpi2-PreIpo"][1]
            : "",
      };
      finalData.contact = {
        ipo_id: createIpoId(data) || "",
        address: data.contactDetails?.address || "",
        phone: data.contactDetails?.phone || "",
        email: data.contactDetails?.email || "",
        website: data.contactDetails?.website || "",
      };
      finalData.registrarContact = {
        ipo_id: createIpoId(data) || "",
        name: data.registrar?.name || "",
        phone: data.registrar?.phone || "",
        email: data.registrar?.email || "",
        website: data.registrar?.website || "",
      };
      completeData.push(finalData);
    });

    return completeData;
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

export default formatData;

function createIpoId(data: any) {
  return (
    "IPO-" +
    data.CompanyName?.split(" ")[0]?.toUpperCase() +
    data.CompanyName?.split(" ")[1]?.toUpperCase() +
    "-" +
    new Date(data["IPO Close Date"]).getDate() +
    new Date(data["IPO Close Date"]).getFullYear()
  );
}

function getIpoSeries(data: any) {
  return data["Listing At"]?.slice(4, 7) === "SME" ? "sme" : "main";
}
