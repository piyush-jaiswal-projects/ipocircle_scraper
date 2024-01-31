export interface RawIpoData {
    name: string;
    details: {
      ipo_date: string[][];
      listing_date: {
        $L: string;
        $u: undefined;
        $d: Date;
        $y: number;
        $M: number;
        $D: number;
        $W: number;
        $H: number;
        $m: number;
        $s: number;
        $ms: number;
        $x: {};
        $isDayjsObject: boolean;
      };
      face_value: number;
      price: number[];
      shares_in_lot: number;
      issue_size: number;
      fresh_issue: number;
      issue_type: string;
      listing_at: string[];
      gen_holding_pre_issue: number;
      gen_holding_post_issue: number;
      market_maker_portion: number;
    };
    reservation: {
      anchor: number;
      market_maker: number;
      qib: number;
      nii: number;
      retail: number;
      total: number;
    };
    anchor: {
      anchor_bid_date: {
        $L: string;
        $u: undefined;
        $d: Date;
        $y: number;
        $M: number;
        $D: number;
        $W: number;
        $H: number;
        $m: number;
        $s: number;
        $ms: number;
        $x: {};
        $isDayjsObject: boolean;
      };
      anchor_shares: number;
      anchor_portion: number;
      anchor_lockinhalf: {
        $L: string;
        $u: undefined;
        $d: Date;
        $y: number;
        $M: number;
        $D: number;
        $W: number;
        $H: number;
        $m: number;
        $s: number;
        $ms: number;
        $x: {};
        $isDayjsObject: boolean;
      };
      anchor_lockinrest: {
        $L: string;
        $u: undefined;
        $d: Date;
        $y: number;
        $M: number;
        $D: number;
        $W: number;
        $H: number;
        $m: number;
        $s: number;
        $ms: number;
        $x: {};
        $isDayjsObject: boolean;
      };
    };
    lotsize: {
      retail_min: number;
      retail_max: number;
        nii_min: number;
        snii_min: number;
        snii_max: number;
        bnii_min: number;
    };
    promoter_holding: {
      promoter_holdings_preissue: number;
      promoter_holdings_postissue: number;
    };
    performance: {
      roe: number;
      roce: number;
      debt: number;
      ronw: number;
      eps: number;
      pe: number;
    };
    subscription: {
      qib: number;
        nii: number;
        bnii: number;
        snii: number;
      retail: number;
      total: number;
    };
  }
  