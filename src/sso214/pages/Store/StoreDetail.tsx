import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useGetStoreMenuList } from '../../apis/hooks';
import { useCart } from '../../hooks/useCart';
import { MenuItem } from '../../types/Model';
import { CustomMenuList, CustomNoMatch, CustomLoading } from '../../components';

const StoreDetail = () => {
  const navigate = useNavigate();
  const { storeId } = useParams();
  const { cartList } = useCart();
  const { data: menuList, isLoading } = useGetStoreMenuList(storeId!);

  const handleClickMenu = useCallback(
    (menuId: MenuItem['id']) => navigate(`/store/${storeId}/menu/${menuId}`),
    [storeId, navigate],
  );

  const data = menuList ? menuList?.storeMenu.filter((menu) => menu.id === storeId)?.[0] : undefined;

  if (isLoading) return <CustomLoading />;
  if (!data) return <CustomNoMatch />;
  return (
    <CustomMenuList
      key={data.id}
      storeMenus={data}
      selectedMenus={cartList}
      handleClickItem={handleClickMenu}
    />
  );
};

export default StoreDetail;
