import { 메뉴, 메뉴목록 } from '../types';
import { fakerKO as faker } from '@faker-js/faker';

const TITLE = ['연어포케', '우삼겹포케', '오리고기 포케', '들기름 메밀면 샐러드'];
const UNIT = ['2개', '3개', '1팩'];

export const getSingleMenu = (): 메뉴 => ({
  title: faker.helpers.arrayElement(TITLE),
  price: faker.number.int({ min: 9_000, max: 40_000 }),
  imgUrl: faker.image.urlLoremFlickr({ category: 'food' }),
  unit: faker.datatype.boolean() ? faker.helpers.arrayElement(UNIT) : undefined,
  description: faker.lorem.sentence({ min: 4, max: 5 }),
  recommended: faker.datatype.boolean(),
});

export const getMenuGroup = (title: string): 메뉴목록 => ({
  title,
  items: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }).map(getSingleMenu),
});

export const getMenuGroupList = (titleList?: string[]): 메뉴목록[] =>
  (
    titleList ??
    Array.from({ length: faker.number.int({ min: 1, max: 4 }) }).map(() =>
      faker.lorem.word({ length: { min: 3, max: 8 } }),
    )
  ).map((title) => getMenuGroup(title));
