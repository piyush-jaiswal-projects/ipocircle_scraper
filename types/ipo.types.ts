export enum IPO_Series {
  main,
  sme
}

export type Ipo = {
  ipo_id: string;
  name: string;
  series: string;
  opening_date: string;
  closing_date: string;
}

export type FormattedData = Ipo & {
  details: IpoDetails,
  reservations: IpoReservation,
  timeline: IpoTimeline,
  lotsize: IpoLotsize,
  promoterholdings: IpoPromoterHolding,
  financials: IpoFinancials,
  kpi: IpoKpi,
  contact: IpoContact,
  registrarContact: RegistrarContact
}

export type IpoDetails = {
  ipo_id: string;
  ipo_date: string;
  listing_date: string;
  face_value: string;
  price: string;
  lot_size: string;
  total_issue_size: string;
  fresh_issue: string;
  issue_type: string;
  listing_at: string;
  share_holding_pre_issue: string;
  share_holding_post_issue: string;
  market_maker_portion: string;
  about: string;
  objectOfIssue: string;
};

export type IpoReservation = {
  ipo_id: string;
  retail_shares_offerred: string;
  other_shares_offerred: string;
  total_shares_offerred: string;
  anchor_shares_offerred: string;
  market_maker_shares_offerred: string;
  qib_shares_offerred: string;
  nii_hnii_shares_offerred: string;
};

export type IpoTimeline = {
  ipo_id: string;
  open_date: string;
  close_date: string;
  basis_of_allotment: string;
  initiation_of_refunds: string;
  credit_of_shares_to_demat: string;
  listing_date: string;
  cutoff_time_for_upi_mandate: string;
};

export type IpoLotsize = {
  ipo_id: string;
  application: string;
  lots: string;
  shares: string;
  amount: string;
};

export type IpoPromoterHolding = {
  ipo_id: string;
  shareholding_preissue: string;
  shareholding_postissue: string;
};

export type IpoFinancials = {
  ipo_id: string;
  period_ended: string[];
  assets: string[];
  revenue: string[];
  profit_after_tax: string[];
  net_worth: string[];
  reserves_and_surplus: string[];
  total_borrowing: string[];
};

export type IpoKpi = {
  ipo_id: string;
  roe: string;
  roce: string;
  ronw: string;
  pbv: string;
  pat_marin_percent: string;
  eps_rs_preIpo: string;
  eps_rs_postIpo: string;
  pe_preIpo: string;
  pe_postIpo: string;
};

export type IpoContact = {
  ipo_id: string;
  address: string;
  phone: string;
  email: string;
  website: string;
};

export type RegistrarContact = {
  ipo_id: string;
  name: string;
  phone: string;
  email: string;
  website: string;
};


export type Ipo_Tracker = {
  company_name: string;
  sector: string;
  issue_price: number;
  current_price: number;
  listing_price: number;
  dayend_price: number;
  year: number;
}

export type Ipo_Prices = {
  min_price: number;
  max_price: number;
  dayend_price: number;
  final_price: number;
}

export type Ipo_ContactDetails = {
  company_address: string;
  company_phone: string;
  company_email: string;
  company_website: string;
  company_logo: string;
  registrar_address: string;
  registrar_phone: string;
  registrar_email: string;
  registrar_website: string;
  registrar_name: string;
}

export type Ipo_Lots = {
  category: string[],
  lots_min: number[],
  lots_max: number[],
  min_retail_lots: number[],
  max_retail_lots: number[],
  min_shni_lots: number[],
  max_shni_lots: number[],
  min_bhni_lots: number[],
  max_bhni_lots: number[],
  min_retail_shares: number[],
  max_retail_shares: number[],
  min_shni_shares: number[],
  max_shni_shares: number[],
  min_bhni_shares: number[],
  max_bhni_shares: number[],
  min_retail_price: number[],
  max_retail_price: number[],
  min_shni_price: number[],
  max_shni_price: number[],
  min_bhni_price: number[],
  max_bhni_price: number[],
}

export type Ipo_OtherDetails = {
  bse_code: string;
  bse_url: string;
  nse_code: string;
  nse_url: string;
  drhp: string;
  anchor_list: string[];
  defunct: boolean;
  retail_discount: string;
  employee_discount: string;
  ofs: string;
  credit_of: string;
  time_upf: string;
  gen_holding_pre: string;
  gen_holding_post: string;
  promoter_holding_pre: string;
  promoter_holding_post: string;
}

export type Ipo_Review = {
  review: string;
}

export type Ipo_Reservations = {
  category: string[];
  shares_offerred: number[];
}

export type Ipo_Gmp = {
  instant: Date[]; // Assuming DateTime is a Date type
  percent_value: number[];
  absolute_value: number[];
}

export type Ipo_Anchor = {
  anchor_bid_date: Date; // Assuming DateTime is a Date type
  anchor_lockin_half: Date; // Assuming DateTime is a Date type
  anchor_lockin_full: Date; // Assuming DateTime is a Date type
  anchor_lockin_rest: Date; // Assuming DateTime is a Date type
  anchor_portion: number;
  anchor_shares_offerred: number;
}

export type Ipo_Dates = {
  opening_date: Date; 
  closing_date: Date; 
  basis_date: Date; 
  init_refunds: Date; 
  credit_of_shares_to_demat: Date;
  listing_date: Date; 
  cutoff_mandate: Date; 
  allotment_date: Date; 
}

export type Ipo_Shares = {
  anchor_shares_offerred: number;
  qib_shares_offerred: number;
  nii_bnii_shares_offerred: number;
  nii_snii_shares_offerred: number;
  retail_shares_offerred: number;
}

export type Ipo_Finances = {
  pe: number;
  market_cap: number;
  roe: number;
  roce: number;
  eps: number;
  ronw: number;
  debt: number;
}

export type Ipo_Subscriptions = {
  shares_bid: number;
  qib: number;
  nii_snii: number;
  nii_bnii: number;
  retail: number;
  updated_at: Date;
}

export type Ipo_FinProgress = {
  details: Financial_Details[];
}

export type Financial_Details = {
  period_ended: string;
  assets: number;
  revenue: number;
  profit_after_tax: number;
  networth: number;
  reserves: number;
  borrowing: number;
}

