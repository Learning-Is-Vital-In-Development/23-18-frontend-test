import { render } from '@testing-library/react';
import { Menu } from './Menu';

const mockMenuInfo = {
  name: '테스트 메뉴',
  description: '테스트 설명',
  image: 'test-image.jpg',
  options: [{ name: '옵션1', price: 1000 }, { price: 2000 }],
  isPopular: true,
  tags: ['태그1', '태그2'],
};

describe('<Menu />', () => {
  it('renders the menu with provided information', () => {
    const { getByText, getByAltText } = render(<Menu menuInfo={mockMenuInfo} />);

    // Check if menu name is rendered
    expect(getByText('테스트 메뉴')).toBeInTheDocument();

    // Check if description is rendered
    expect(getByText('테스트 설명')).toBeInTheDocument();

    // Check if image is rendered
    const image = getByAltText('메뉴이미지');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-image.jpg');

    // Check if options are rendered
    expect(getByText('옵션1 : 1000')).toBeInTheDocument();
    expect(getByText('2000')).toBeInTheDocument();

    // Check if tags are rendered
    expect(getByText('태그1')).toBeInTheDocument();
    expect(getByText('태그2')).toBeInTheDocument();
  });
});
