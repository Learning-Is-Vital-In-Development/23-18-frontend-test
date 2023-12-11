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
  const { data, isLoading } = useGetStoreMenuList(storeId!);

  const handleClickMenu = useCallback(
    (menuId: MenuItem['id']) => navigate(`/store/${storeId}/menu/${menuId}`),
    [storeId, navigate],
  );

  if (isLoading) return <CustomLoading />;
  if (!data) return <CustomNoMatch />;

  const store = data.storeMenu[0];
  return (
    <CustomMenuList
      key={store.id}
      storeMenus={store}
      selectedMenus={cartList}
      handleClickItem={handleClickMenu}
    />
  );
};

export default StoreDetail;
