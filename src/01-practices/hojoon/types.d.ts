export interface MenuInfo {
  name: string;
  options: {
    name?: string;
    price: number;
  }[];
  image?: string;
  description?: string;
  isPopular: boolean;
  tags: string[];
}
