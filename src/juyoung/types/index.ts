export interface MenuInterface {
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
export interface MenuListInterface {
  title: string;
  menus: MenuInterface[];
}
