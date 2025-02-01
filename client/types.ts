export interface MarketingMember {
    marketing: string;
    month: string;
    omzet: number;
    commissionPercentage: number;
    commissionNominal: number;
  }
  
  export interface ApiResponse {
    success: boolean;
    data: MarketingMember[];
  }
  