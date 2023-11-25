import { getMenuGroupList, queryWrapper, renderWithRouter } from '../../utils';
import { TEST_ID } from '../../constant';
import { http, HttpResponse } from 'msw';
import { server } from '../../../server/mockServer';
import { renderHook, waitFor } from '@testing-library/react';
import { useStoreOperationTime } from '../../hooks/useMenu';

describe('메뉴 리스트 그리기', () => {
  it('메뉴 리스트가 내가 넘겨준 길이만큼 그려졌나?', async () => {
    const menuList = getMenuGroupList(['인기메뉴', '포케', '보울']);

    server.use(
      http.get('/api/store/:storeId', () => {
        return HttpResponse.json({
          storeMenu: menuList,
        });
      }),
    );

    const { findAllByTestId } = renderWithRouter([`/store/1`]);

    const { result } = renderHook(() => useStoreOperationTime(), { wrapper: queryWrapper });

    await waitFor(() => {
      return result.current.isSuccess;
    });
    const groupLength = await findAllByTestId(TEST_ID.MENU_GROUP);

    expect(groupLength.length).toBe(menuList.length);
  });
});
