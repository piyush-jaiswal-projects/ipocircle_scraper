import { CompFin_VALUE } from "../types/companyFinance.types";

export class CompanyFinances {
    ipo_id: string;
    y2024: CompFin_VALUE;
    y2023: CompFin_VALUE;
    y2022: CompFin_VALUE;
    y2021: CompFin_VALUE;
    y2020: CompFin_VALUE;
    y2019: CompFin_VALUE;
  
    constructor() {
      (this.ipo_id = ""),
        (this.y2019 = {
          assets: 0,
          revenue: 0,
          profit_after_tax: 0,
          networth: 0,
          reserves: 0,
          borrowing: 0,
        }),
        (this.y2020 = {
          assets: 0,
          revenue: 0,
          profit_after_tax: 0,
          networth: 0,
          reserves: 0,
          borrowing: 0,
        }),
        (this.y2021 = {
          assets: 0,
          revenue: 0,
          profit_after_tax: 0,
          networth: 0,
          reserves: 0,
          borrowing: 0,
        }),
        (this.y2022 = {
          assets: 0,
          revenue: 0,
          profit_after_tax: 0,
          networth: 0,
          reserves: 0,
          borrowing: 0,
        }),
        (this.y2023 = {
          assets: 0,
          revenue: 0,
          profit_after_tax: 0,
          networth: 0,
          reserves: 0,
          borrowing: 0,
        }),
        (this.y2024 = {
          assets: 0,
          revenue: 0,
          profit_after_tax: 0,
          networth: 0,
          reserves: 0,
          borrowing: 0,
        });
    }
  }
  