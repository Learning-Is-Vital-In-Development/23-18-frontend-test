import { getMenuGroupList } from '../../utils';
import MenuList from '.';
import { render } from '@testing-library/react';

describe('메뉴 리스트 그리기', () => {
  it('메뉴 리스트가 내가 넘겨준 길이만큼 그려졌나?', () => {
    const menuList = getMenuGroupList(['인기메뉴', '포케', '보울']);

    const listNode = render(<MenuList menuList={menuList} />);

    const groupLength = listNode.getAllByRole('list');

    expect(groupLength.length).toBe(menuList.length);
  });
});
