import styles from './MenuItem.module.css';
import { MenuItem } from './types';
import { formatKrPrice } from './util';

export interface Props {
  item: MenuItem;
}

export default function Item({ item }: Props) {
  const { title, description, price, imgUrl, unit, recommended = false } = item;

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.description}>{description}</p>}
        <p className={styles.price}>
          {unit && <span>{unit} : </span>}
          {formatKrPrice(price)}원
        </p>
        {recommended && <div className={styles.badge}>사장님 추천</div>}
      </div>
      <img src={imgUrl} alt="title" />
    </div>
  );
}
