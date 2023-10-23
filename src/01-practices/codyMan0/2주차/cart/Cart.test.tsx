import { render, screen } from '@testing-library/react';
import { Cart } from './Cart';
import { MenuList } from '../type';

describe('Example', () => {
  const menuList: MenuList = {
    title: '따끈한 삼첩분식 신상',
    menus: [
      {
        name: '[꼬마] 새우마요김밥',
        description: '고소한 새우튀김과 특제 마요소스',
        options: [
          {
            name: '2줄',
            price: 2700,
          },
        ],
        image: './asset/img.jpeg',
        isPopular: false,
        tags: [''],
      },
    ],
  };

  it('should render hidden', () => {
    render(<Cart menuList={menuList} />);

    const restaurantNameElement = screen.getByText(menuList.title);
    expect(restaurantNameElement).toBeInTheDocument();
  });
});
