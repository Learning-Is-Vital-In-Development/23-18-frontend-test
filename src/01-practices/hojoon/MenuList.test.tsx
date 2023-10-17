import { render } from '@testing-library/react';
import { MenuList } from './MenuList';

const mockMenus = [
  {
    name: '메뉴1',
    description: '설명1',
    image: 'image1.jpg',
    options: [
      { name: '옵션A', price: 5000 },
      { name: '옵션B', price: 7000 },
    ],
    isPopular: true,
    tags: ['태그A', '태그B'],
  },
  {
    name: '메뉴2',
    description: '설명2',
    image: 'image2.jpg',
    options: [{ price: 8000 }, { price: 6000 }],
    isPopular: false,
    tags: ['태그X', '태그Y'],
  },
  {
    name: '메뉴3',
    description: '설명3',
    image: 'image3.jpg',
    options: [
      { name: '옵션Z', price: 10000 },
      { name: '옵션Y', price: 9000 },
    ],
    isPopular: true,
    tags: ['태그Z'],
  },
];

describe('<MenuList />', () => {
  it('renders a list of menus', () => {
    const { getByText, queryByText } = render(<MenuList menus={mockMenus} />);

    // name이 잘 되는지
    expect(getByText('메뉴1')).toBeInTheDocument();
    expect(getByText('메뉴2')).toBeInTheDocument();
    expect(getByText('메뉴3')).toBeInTheDocument();

    // 설명이 잘 되는지
    expect(getByText('설명1')).toBeInTheDocument();
    expect(getByText('설명2')).toBeInTheDocument();
    expect(getByText('설명3')).toBeInTheDocument();

    // 옵션에 이름이 있을 때랑 없을때 잘 되는지
    expect(getByText('옵션A : 5000')).toBeInTheDocument();
    expect(getByText('옵션B : 7000')).toBeInTheDocument();
    expect(getByText('8000')).toBeInTheDocument();
    expect(getByText('6000')).toBeInTheDocument();
    expect(getByText('옵션Z : 10000')).toBeInTheDocument();
    expect(getByText('옵션Y : 9000')).toBeInTheDocument();

    // 태그들 잘 되는지
    expect(getByText('태그A')).toBeInTheDocument();
    expect(getByText('태그X')).toBeInTheDocument();
    expect(getByText('태그Z')).toBeInTheDocument();

    //메뉴 2는 인기 메뉴가 아니다.

    expect(getByText('인기')).toBeInTheDocument();
    // expect(queryByText('메뉴2 인기')).not.toBeInTheDocument();
  });
});
