import { Menu } from './Menu';
import type { MenuInfo } from './types';

interface MenuListProps {
  menus: MenuInfo[];
}

export const MenuList = ({ menus }: MenuListProps) => {
  return (
    <div className="menuList">
      {menus.map((menu, index) => (
        <Menu key={index} menuInfo={menu} />
      ))}
    </div>
  );
};
