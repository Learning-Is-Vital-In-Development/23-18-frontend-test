import { TEST_ID } from '../../constant';
import { screen, renderHook, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useStoreOperationTime } from '../../hooks/useMenu';
import { queryWrapper, renderWithRouter } from '../../utils';
import { http, HttpResponse } from 'msw';
import { server } from '../../../server/mockServer';

const storeId = 'test-id';
const menuId = 'menu-id';

describe('메뉴 선택 페이지', () => {
  describe('페이지 경로: /store/:storeId', () => {
    it('해당 페이지에 접근 시, 메뉴 목록(2주차의 MenuList)을 보여줍니다.', async () => {
      const { findByText } = renderWithRouter([`/store/${storeId}`]);

      const { result } = renderHook(() => useStoreOperationTime(), { wrapper: queryWrapper });

      await waitFor(() => {
        return result.current.isSuccess;
      });

      expect(await findByText(storeId)).toBeInTheDocument();
    });
    it('메뉴 목록을 1개 이상 가지고 있습니다.', async () => {
      const { findAllByTestId } = renderWithRouter([`/store/${storeId}`]);

      const { result } = renderHook(() => useStoreOperationTime(), { wrapper: queryWrapper });

      await waitFor(() => {
        return result.current.isSuccess;
      });

      const groupList = await findAllByTestId(TEST_ID.MENU_GROUP);

      expect(groupList.length).toBeGreaterThanOrEqual(1);
    });
    it('메뉴를 클릭 하면, 옵션 선택 페이지로 이동해야 합니다.', async () => {
      const { findAllByTestId, user } = renderWithRouter([`/store/${storeId}`]);
      const { result } = renderHook(() => useStoreOperationTime(), { wrapper: queryWrapper });

      await waitFor(() => {
        return result.current.isSuccess;
      });

      const itemList = await findAllByTestId(TEST_ID.MENU_ITEM);

      await user.click(itemList[0]);

      expect(screen.getByTestId(TEST_ID.GROUP_TITLE)).toBeInTheDocument();
    });
    it('장바구니에 담긴 음식이 없는 경우, 하단 주문하기 버튼이 보이지 않아야 합니다.', () => {
      const { queryByRole } = renderWithRouter([`/store/${storeId}/menu/${menuId}`]);
      const orderButton = queryByRole('button', { name: 'order' });
      expect(orderButton).not.toBeInTheDocument();
    });
    it('장바구니에 담긴 음식이 있는 경우, 하단 주문하기 버튼이 {개수} 주문하기 {총 금액} 형태로 노출돼야 합니다.', async () => {
      const item = { price: 30_000, count: 3 };

      const { result } = renderHook(() => useStoreOperationTime(), { wrapper: queryWrapper });

      await waitFor(() => {
        return result.current.isSuccess;
      });

      const { findByTestId } = renderWithRouter([`/store/${storeId}`], {
        cartList: { test: item },
      });

      const orderButton = await findByTestId(TEST_ID.ORDER);

      expect(orderButton).toHaveTextContent(`${1} 주문하기 ${item.count * item.price}원`);
    });
  });

  // 8주차 요구사항
  describe('현재 시간이 영업시간에 해당하면 영업중, 해당하지 않으면 영업종료를 화면 최상단에 노출합니다.', () => {
    describe('예를 들어 openHour: 9, closeHour: 22 일 때,', () => {
      it('8시 59분에는 영업종료', async () => {
        server.use(
          http.get('/api/store/:storeId', () => {
            return HttpResponse.json({
              openHour: 9,
              closeHour: 22,
              storeMenu: [],
            });
          }),
        );
        const { result } = renderHook(() => useStoreOperationTime(storeId), { wrapper: queryWrapper });

        const today = new Date();
        const d = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 59);
        Date.now = function () {
          return d.getTime();
        };

        const { findByTestId } = renderWithRouter([`/store/${storeId}`]);
        await waitFor(() => result.current.isSuccess);

        expect(await findByTestId(TEST_ID.OPER_YN)).toHaveTextContent('영업종료');
      });
      it('9시 00분에는 영업중', async () => {
        server.use(
          http.get('/api/store/:storeId', () => {
            return HttpResponse.json({
              openHour: 9,
              closeHour: 22,
              storeMenu: [],
            });
          }),
        );
        const { result } = renderHook(() => useStoreOperationTime(storeId), { wrapper: queryWrapper });

        const today = new Date();
        const d = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 9, 0);
        Date.now = function () {
          return d.getTime();
        };

        const { findByTestId } = renderWithRouter([`/store/${storeId}`]);
        await waitFor(() => result.current.isSuccess);

        expect(await findByTestId(TEST_ID.OPER_YN)).toHaveTextContent('영업중');
      });
      it('21시 59분에는 영업중', async () => {
        server.use(
          http.get('/api/store/:storeId', () => {
            return HttpResponse.json({
              openHour: 9,
              closeHour: 22,
              storeMenu: [],
            });
          }),
        );
        const { result } = renderHook(() => useStoreOperationTime(storeId), { wrapper: queryWrapper });

        const today = new Date();
        const d = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 21, 59);
        Date.now = function () {
          return d.getTime();
        };

        const { findByTestId } = renderWithRouter([`/store/${storeId}`]);
        await waitFor(() => result.current.isSuccess);

        expect(await findByTestId(TEST_ID.OPER_YN)).toHaveTextContent('영업중');
      });
      it('22시 00분에는 영업종료', async () => {
        server.use(
          http.get('/api/store/:storeId', () => {
            return HttpResponse.json({
              openHour: 9,
              closeHour: 22,
              storeMenu: [],
            });
          }),
        );
        const { result } = renderHook(() => useStoreOperationTime(storeId), { wrapper: queryWrapper });

        const today = new Date();
        const d = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 22, 0);
        Date.now = function () {
          return d.getTime();
        };

        const { findByTestId } = renderWithRouter([`/store/${storeId}`]);
        await waitFor(() => result.current.isSuccess);

        expect(await findByTestId(TEST_ID.OPER_YN)).toHaveTextContent('영업종료');
      });
    });
  });
});
