export interface MenuItem {
  id: string;
  name: string;
  options: {
    name?: string;
    price: number;
  }[];
  image?: string;
  description?: string;
  isPopular?: boolean;
  tags?: string[];
}

export interface Menus {
  id: string;
  title: string;
  menus: MenuItem[];
}

export interface SelectedMenuItemOption {
  selectedOption: {
    index: number;
    count: number;
  };
}

export type SelectedMenuItem = MenuItem & SelectedMenuItemOption;
