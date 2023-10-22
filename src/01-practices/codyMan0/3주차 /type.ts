export interface Menu extends Option {
  title: string;
  description: string;
  images: string[];
  minPriceNum: number;

  isPopular: boolean;
}

export interface Option {
  options: {
    name?: string;
    price: number;
  }[];
}
