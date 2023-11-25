import { useQuery } from '@tanstack/react-query';
import { MenuList } from '../types';

interface StoreOperation {
  openHour: number;
  closeHour: number;
  storeMenu: MenuList[];
}

export const useStoreOperationTime = (id = 'test') =>
  useQuery<StoreOperation>({
    queryKey: ['store', 'oper', 'time', id],
    queryFn: () => fetch(`${location.href}api/store/${id}`).then((res) => res.json()),
  });
