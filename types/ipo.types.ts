enum IPO_Series {
  main,
  sme
}

export type Ipo_Init = {
  name: string;
  series: IPO_Series;
  description: string;
  face_value: number;
  total_issue: string;
  fresh_issue: string;
  issue_type: string;
  listing_at: string[];
  pre_open_nse: string;
  pre_open_bse: string;
  lot_size: number;
  priceband_min: number;
  priceband_max: number;
  objectIssueData: string;
}

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

