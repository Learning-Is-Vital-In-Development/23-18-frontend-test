import { useNavigate } from 'react-router-dom';
import { CustomHeading, CustomList } from '../../components';
import { getStoreMenu, MenuList } from '../../../server/data';
import { TEST_ID } from '../../constant/TEST_ID';

const Store = () => {
  const navigate = useNavigate();

  return (
    <>
      <CustomHeading headingLevel="h1">Store</CustomHeading>
      <CustomList<MenuList>
        containerTag="ul"
        renderItem={({ item }) => (
          <li key={item.id} data-testid={TEST_ID.STORE.STORE_LIST_ITEM}>
            <button onClick={() => navigate(`/store/${item.id}`)}>{item.title}</button>
          </li>
        )}
        keyExtractor={(item) => item.id}
        data={getStoreMenu()}
        data-testid={TEST_ID.STORE.STORE_LIST}
      />
    </>
  );
};

export default Store;
