import { useQueryString } from '../../hooks';
import { useLocation } from 'react-router-dom';
import type { StoreInterface } from '../../types';

import { useQuery } from '@tanstack/react-query';

const Result = () => {
  const { cart, price } = useQueryString();
  const { search } = useLocation();
  const storeId = new URLSearchParams(search).get('storeId');

  const fetchMenus = async (storeId: string): Promise<StoreInterface> => {
    const response = await fetch(`http://${location.host}/api/store/${storeId}`);
    return response.json() as Promise<StoreInterface>;
  };
  const { data, isLoading } = useQuery({
    queryKey: ['store', storeId],
    queryFn: () => fetchMenus(storeId!),
  });

  if (!data) return null;
  if (isLoading) return <div>로딩중...</div>;
  return (
    <div>
      <h2>장바구니</h2>
      <ol>
        {cart.map((item) => {
          const menuData = data.storeMenu
            .flatMap((item) => item.menus)
            .find((menu) => menu.id === item.menuId);
          return (
            <li key={item.menuId}>
              <span>{menuData?.name}</span>
              {menuData?.image && <img src={menuData?.image} alt={`${menuData?.name} 이미지`} />}
              <span>{item.quantity}</span>
            </li>
          );
        })}
      </ol>
      <div data-testid="resultPrice">총 금액 {price.toLocaleString()}원</div>
    </div>
  );
};

export default Result;
