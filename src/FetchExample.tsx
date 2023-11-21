import { useEffect, useState } from 'react';
import { type MenuList } from 'src/server/data';

export const FetchExample = () => {
  const [storeMenu, setStoreMenu] = useState<MenuList[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      const response = await fetch(`${location.href}api/store/1234`);
      const { openHour, closeHour, storeMenu } = (await response.json()) as {
        openHour: number;
        closeHour: number;
        storeMenu: MenuList[];
      };

      setStoreMenu(storeMenu);

      const hour = new Date(Date.now()).getHours();
      setIsOpen(hour >= openHour && hour < closeHour);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <>
      {isOpen ? <div>영업중</div> : <div>영업종료</div>}
      {storeMenu.map(({ id, title }) => (
        <div key={id}>{title}</div>
      ))}
    </>
  );
};
