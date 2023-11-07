import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MenuInterface } from '../types';
import useQueryString from '../hooks/useQueryString';
import encodeBase64 from '../utils/encodeBase64';

const MenuOption = (props: MenuInterface) => {
  const { name, options, image } = props;
  const { storeId } = useParams();
  const [price] = useState(options[0].price);
  const [quantity, setQuantity] = useState(1);
  const MIN_ORDER_PRICE = 9900;
  const navigate = useNavigate();
  const { cart, price: accumulatePrice } = useQueryString();
  return (
    <>
      <div>
        {image && <img src={image} alt={`${name} 이미지`} />}
        <div>
          <button
            role="button"
            disabled={quantity === 1}
            aria-label="수량 감소"
            onClick={() => setQuantity((prev) => prev - 1)}
          >
            -
          </button>
          <span>{quantity}개</span>
          <button role="button" aria-label="수량 증가" onClick={() => setQuantity((prev) => prev + 1)}>
            +
          </button>
        </div>
        <span>배달최소주문금액</span>
        <span>{MIN_ORDER_PRICE.toLocaleString()}원</span>
        <button
          role="button"
          aria-label="최종금액"
          onClick={() => {
            const newItem = { menuId: props.id, quantity };
            const existingItem = cart.find((item) => item.menuId === newItem.menuId);
            if (existingItem) {
              existingItem.quantity += newItem.quantity;
            } else {
              cart.push(newItem);
            }
            const newPrice = Number(accumulatePrice) + quantity * price;
            navigate(`/store/${storeId}?data=${encodeBase64(cart)}&price=${newPrice}`);
          }}
        >
          {(quantity * price).toLocaleString()}원 담기
          {/* menuId, amount */}
        </button>
      </div>
    </>
  );
};

export default MenuOption;
