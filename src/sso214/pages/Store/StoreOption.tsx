import { useNavigate, useParams } from 'react-router';
import { useCart } from '../../hooks/useCart';
import { useGetStoreMenu } from '../../apis/hooks';
import { SelectedMenuItem } from '../../types/Model';
import { CustomMenuOption, CustomLoading } from '../../components';

const StoreOption = () => {
  const navigate = useNavigate();
  const { storeId, menuId } = useParams();
  const { addToCart } = useCart();
  const { data, isLoading } = useGetStoreMenu(storeId!, menuId!);

  const handleSubmit = (item: SelectedMenuItem) => {
    addToCart(item);
    navigate(`/store/${storeId}`);
  };

  if (isLoading) return <CustomLoading />;
  if (!data) return <h1>data is empty</h1>;
  return <CustomMenuOption menu={data.menu} handleSubmit={handleSubmit} />;
};

export default StoreOption;
