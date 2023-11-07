import { useParams, useNavigate } from 'react-router-dom';

import exampleData from '../constants/example.json';
import { MenuList } from '../components';
import useQueryString from '../hooks/useQueryString';

const Store = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const storeData = exampleData.find((item) => item.listId === Number(storeId));
  const { cart, price, queryString } = useQueryString();
  const totalAmount = cart.map((item) => item.quantity).reduce((acc, cur) => acc + cur, 0);
  if (!storeData) return null;
  return (
    <>
      <MenuList data={storeData} />
      {cart.length > 0 && (
        <button
          role="button"
          aria-label="주문하기"
          onClick={() => navigate(`/result${queryString}&storeId=${storeId}`)}
        >
          {cart.map((item) => item.quantity).reduce((acc, cur) => acc + cur, 0) > 0 && (
            <span>{totalAmount}</span>
          )}
          주문하기
          {price > 0 && <span>{price.toLocaleString()}원</span>}
        </button>
      )}
    </>
  );
};

export default Store;
