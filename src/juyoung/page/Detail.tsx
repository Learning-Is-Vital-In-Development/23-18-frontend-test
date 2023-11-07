import { useParams, useNavigate } from 'react-router-dom';
import exampleData from '../../juyoung/constants/example.json';
import MenuOption from '../components/MenuOption';

const Detail = () => {
  const { menuId, storeId } = useParams();
  const store = exampleData.find((item) => item.listId === Number(storeId));
  const menu = store?.menus.find((item) => item.id === Number(menuId));
  const navigate = useNavigate();

  if (!menu) return null;

  return (
    <div>
      <button role="button" aria-label="뒤로가기" onClick={() => navigate(-1)}>
        뒤로가기
      </button>
      <MenuOption {...menu} />
    </div>
  );
};

export default Detail;
