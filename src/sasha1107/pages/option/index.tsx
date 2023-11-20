import { MenuOption } from '../../components';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import type { MenuInterface } from '../../types';

const Option = () => {
  const { menuId, storeId } = useParams();
  const navigate = useNavigate();
  const fetchMenu = async (storeId: string, menuId: string): Promise<{ menu: MenuInterface }> => {
    const response = await fetch(`http://${location.host}/api/store/${storeId}/menu/${menuId}`);
    return response.json() as Promise<{ menu: MenuInterface }>;
  };
  const { data, isLoading } = useQuery({
    queryKey: ['menu', storeId, menuId],
    queryFn: () => fetchMenu(storeId!, menuId!),
  });
  if (!data) return null;
  if (isLoading) return <div>로딩중...</div>;
  return (
    <div>
      <button role="button" aria-label="뒤로가기" onClick={() => navigate(-1)}>
        뒤로가기
      </button>
      <MenuOption {...data.menu} />
    </div>
  );
};

export default Option;
