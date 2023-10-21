export interface Menu {
  name: string;
  description: string;
  options: {
    name?: string;
    price: number;
  }[];
  image?: string;
  isPopular?: boolean;
  tags: string[];
}

export interface MenuList {
  title: string;
  menus: Menu[];
}
