import { useState } from 'react';
import { ICON } from '../constant';
import { Menu } from '../type';
import MultiPriceOptions from './components/multiPriceOptions/MultiPriceOptions';
import SinglePriceOption from './components/singlePriceOptions/SinglePriceOption';
import NavFooter from './components/nav/NavFooter';

interface MenuProps {
  menu: Menu;
}

const SlideImgComponent = () => {
  return <div>123</div>;
};

const MenuForm = ({ menu }: MenuProps) => {
  const { title, description, images, minPriceNum, options, isPopular } = menu;
  const [menuCount, setMenuCount] = useState<number>(1);

  //임시 상수
  const reviewNum = 6;

  //SinglePriceOptions시 보여질 수량 상태 handler
  const increaseForSingleOption = () => {
    setMenuCount((prev) => prev + 1);
  };
  const decreaseForSingleOption = () => {
    setMenuCount((prev) => prev - 1);
  };

  return (
    <div className="layout">
      <header>헤더 UI</header>
      <div className="content">
        <div>{images.length > 0 ? <SlideImgComponent /> : <img src="" alt="" />}</div>
        <div className="basic-info-part">
          {/* 인기를 어떻게 구현해야 좋을까?  */}
          {isPopular ? (
            <div>
              {ICON}
              <h1>{title}</h1>
            </div>
          ) : (
            <h1>{title}</h1>
          )}
          <div>{description}</div>
          <span>
            <p>{`메뉴 리뷰 ${reviewNum}개`}</p>
          </span>
        </div>
        {options.length > 0 ? (
          <MultiPriceOptions options={options} />
        ) : (
          <SinglePriceOption
            menuCount={menuCount}
            increase={increaseForSingleOption}
            decrease={decreaseForSingleOption}
          />
        )}
      </div>
      <NavFooter minPriceNum={minPriceNum} />
    </div>
  );
};

export default MenuForm;
