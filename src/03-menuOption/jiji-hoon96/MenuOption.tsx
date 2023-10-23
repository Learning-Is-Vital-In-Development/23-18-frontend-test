import { useState } from 'react';
import S from './MenuOption.module.css';
import { MenuOptionsProps } from './types';

interface MenuOptionListProps {
  optionList: MenuOptionsProps[];
}

export const MenuOption = ({ optionList }: MenuOptionListProps) => {
  const [count, setCount] = useState(0);
  return (
    <>
      {optionList.map((option, index) => (
        <div className={S.wrap} key={index}>
          <div className={S.imgBox}>
            <img src={option.image ?? 'baseURL'} alt={option.name} />
          </div>
          <div className={S.main}>
            <div className={S.mainHeader}>
              {option.isPopular && <span className={S.popularTag}>인기</span>}
              <h1>{option.name}</h1>
            </div>
            <div className={S.description}>
              <span>{option.description}</span>
            </div>
            <div>
              <span className={S.name}>{`메뉴 리뷰 ${option.review}개 {'>'}`}</span>
            </div>
          </div>
          <div className={S.main}>
            <div className={S.mainHeader}>
              <p className={S.name}>가격</p>
              <span className={S.essential}>필수</span>
            </div>
            {option.optionSelect && (
              <ul className={S.tagList}>
                {option.selectList.map((select, index) => (
                  <li key={index} className={S.optionList}>
                    <div>
                      <input type="radio" />
                      <span>{select.name}</span>
                    </div>
                    <span>{select.price}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={S.mainHeader}>
            <p className={S.name}>수량</p>
            <div className={S.amountBox}>
              <button onClick={() => setCount((prev) => prev - 1)}>-</button>
              <input value={option.count} defaultValue={count} />
              <button onClick={() => setCount((prev) => prev + 1)}>+</button>
            </div>
          </div>
          <div className={S.textarea}>
            <span>메뉴 사진은 연출된 이미지로 실제 조리된 음식과 다를 수 있습니다.</span>
          </div>
          <div className={S.footer}>
            <div className={S.info}>
              <p>배달최소금액</p>
              <span>{option.minOrderPrice}</span>
            </div>
            <div>
              <button className={S.add}>{`${option.totalPrice} 담기`}</button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
