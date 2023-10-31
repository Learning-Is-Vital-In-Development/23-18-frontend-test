import { render } from '@testing-library/react';
import { MenuList } from '../components';
import menuData from '../constants/menu.json';
import type { MenuListInterface } from '../types';

const mockData: MenuListInterface = menuData;

describe('Menu Component', () => {
  it('should render MenuList component', () => {
    const { getAllByRole, getByRole } = render(<MenuList data={mockData} />);

    const { menus, title } = mockData;

    expect(getByRole('heading')).toHaveTextContent(title);
    expect(getAllByRole('listitem').length).toBe(menus.length);
  });
});
