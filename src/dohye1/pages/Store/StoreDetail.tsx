import { useParams } from 'react-router-dom';
import MenuListComp from '../../component/MenuList';
import { TEST_ID } from '../../constant';
import { useMemo } from 'react';
import { useStoreOperationTime } from '../../hooks/useMenu';

export default function StoreDetail() {
  const { storeId } = useParams();

  const title = storeId;

  const { data, isFetching } = useStoreOperationTime(storeId);

  const isOpen = useMemo(() => {
    if (!data) return null;
    const { openHour, closeHour } = data;
    const curHour = new Date(Date.now()).getHours();
    return curHour >= openHour && curHour < closeHour;
  }, [data]);

  if (isFetching) {
    return <div>loading...</div>;
  }

  if (!data || isOpen === null) {
    return <div>fail to load</div>;
  }

  return (
    <div>
      <h2 data-testid={TEST_ID.STORE_TITLE} key={TEST_ID.STORE_TITLE}>
        {title}
      </h2>
      <h3 data-testid={TEST_ID.OPER_YN}>{isOpen ? '영업중' : '영업종료'}</h3>
      <MenuListComp menuList={data?.storeMenu ?? []} />
    </div>
  );
}
