import { MenuInfo } from './types';

interface MenuProps {
  menuInfo: MenuInfo;
}

export const Menu = ({ menuInfo }: MenuProps) => {
  const { name, options, image, description, isPopular, tags } = menuInfo;
  return (
    <div className="menuBox">
      <div className="infoBox">
        <p className="name">{name}</p>
        {isPopular && <span>인기</span>}
        <p className="description">{description}</p>
        {options.map((option, idx) => (
          <li key={idx}>{option.name ? `${option.name} : ${option.price}` : option.price}</li>
        ))}
        {tags?.map((tag) => <span key={tag}>{tag}</span>)}
      </div>
      <div className="imgBox">
        <img src={image} alt="메뉴이미지" />
      </div>
    </div>
  );
};
