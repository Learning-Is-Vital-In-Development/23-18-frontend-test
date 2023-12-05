export interface MenuInterface {
  id: number;
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
  id: number;
  title: string;
  menus: MenuInterface[];
}
export interface StoreInterface {
  openHour: number;
  closeHour: number;
  storeMenu: MenuListInterface[];
}
