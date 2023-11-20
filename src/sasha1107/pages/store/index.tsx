import { useParams, useNavigate } from 'react-router-dom';
import { MenuList } from '../../components';
import { useQueryString } from '../../hooks';
import { useQuery } from '@tanstack/react-query';

import type { StoreInterface } from '../../types';

const Store = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const fetchMenus = async (storeId: string): Promise<StoreInterface> => {
    const response = await fetch(`http://${location.host}/api/store/${storeId}`);
    return response.json() as Promise<StoreInterface>;
  };
  const { data, isLoading } = useQuery({
    queryKey: ['store', storeId],
    queryFn: () => fetchMenus(storeId!),
  });
  const { cart, price, queryString } = useQueryString();
  const totalAmount = cart.map((item) => item.quantity).reduce((acc, cur) => acc + cur, 0);
  if (!data) return null;
  if (isLoading) return <div>로딩중...</div>;
  return (
    <>
      {data.storeMenu.map((item) => (
        <MenuList key={item.id} data={item} />
      ))}
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
