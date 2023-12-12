import { useQuery } from '@tanstack/react-query';
import { Menus, MenuItem } from '../../types/Model';

export interface StoreMenuList {
  storeMenu: Menus[];
}

export interface StoreMenu {
  menu: MenuItem;
}

function useGetStoreMenuList(storeId: Menus['id']) {
  return useQuery<unknown, Error, StoreMenuList>({
    queryKey: ['store', storeId],
    queryFn: () => fetch(`${location.origin}/api/store/${storeId}`).then((res) => res.json()),
  });
}

function useGetStoreMenu(storeId: Menus['id'], menuId: MenuItem['id']) {
  return useQuery<unknown, Error, StoreMenu>({
    queryKey: ['store', 'menu', storeId, menuId],
    queryFn: () => fetch(`${location.origin}/api/store/${storeId}/menu/${menuId}`).then((res) => res.json()),
  });
}

export { useGetStoreMenuList, useGetStoreMenu };
