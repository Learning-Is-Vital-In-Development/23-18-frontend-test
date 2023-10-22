import styles from './style.module.css';
import MenuItem from '../MenuItem';
import { 메뉴목록 } from 'src/dohye1/types';

interface Props {
  menuList: 메뉴목록[];
}

export default function MenuList({ menuList }: Props) {
  return (
    <div className={styles.container}>
      {menuList.map(({ title, description, items }, index) => (
        <ul className={styles.group} key={`${title}-${index}`}>
          {title && <div className={styles.title}>{title}</div>}
          {description && <div className={styles.title}>{description}</div>}
          <li className={styles.list}>
            {items.map((menu, index) => (
              <MenuItem item={menu} key={`${menu.title}-${index}`} />
            ))}
          </li>
        </ul>
      ))}
    </div>
  );
}
