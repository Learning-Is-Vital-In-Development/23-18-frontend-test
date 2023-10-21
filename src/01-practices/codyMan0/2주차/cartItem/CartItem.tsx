// import styles from './Cart.module.css';
import { Menu } from '../type';

interface CartProps {
  menu: Menu;
}
const BADGE = '사장님 추천';

export const CartItem = ({ menu }: CartProps) => {
  const { name, description, image, options, isPopular } = menu;
  return (
    <div className="card-item">
      <div>
        <h2>{name}</h2>
        <h3>{description}</h3>
        {options.map((option, index) => {
          const { name, price } = option;
          return <p key={index}>{name ? `${name} : ${price}` : `${price}`}</p>;
        })}
        {isPopular ? <p>{BADGE}</p> : null}
      </div>
      <div>
        <img src={image} alt="foodImages" />
      </div>
    </div>
  );
};
