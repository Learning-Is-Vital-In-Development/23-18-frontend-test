export interface 메뉴 {
  title: string;
  price: number;
  imgUrl: string;
  unit?: string;
  description?: string;
  recommended?: boolean;
}

export interface 메뉴목록 {
  title?: string;
  description?: string;
  items: 메뉴[];
}
