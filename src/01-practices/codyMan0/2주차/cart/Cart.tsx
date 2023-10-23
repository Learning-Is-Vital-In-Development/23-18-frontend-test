import { CartItem } from '../cartItem/CartItem';
import { MenuList } from '../type';

interface CartProps {
  menuList: MenuList;
}

export const Cart = ({ menuList }: CartProps) => {
  const { title, menus } = menuList;
  return (
    <div className="layout">
      <h1>{title}</h1>
      {menus.map((menu, index) => {
        return <CartItem key={index} menu={menu} />;
      })}
    </div>
  );
};
