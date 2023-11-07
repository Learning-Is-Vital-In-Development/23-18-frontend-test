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
  listId: number;
  title: string;
  menus: MenuInterface[];
}
