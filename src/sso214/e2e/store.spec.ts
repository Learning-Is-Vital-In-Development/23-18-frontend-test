import { test, expect } from '@playwright/test';
import { TEST_ID } from '../constant/TEST_ID';
import { getStoreMenu } from '../../server/data';

// const helperFunc = async () => {
//   // Browser : 브라우저의 인스턴스를 나타냄. Playwright는 브라우저 인스턴스를 시작하고 브라우저 인스턴스를 닫는 것으로 끝남
//   // 브라우저 인스턴스를 만드는데 비용이 많이 들기 떄문에 일 인스턴스가 여러 브라우저 컨텍스트를 통해 수행할 수 있는 작업을 극대화하도록 설계됨
//   const { chromium } = require('playwright');
//   const browser = await chromium.launch();
//   await browser.close();
//
//   // Browser Context : 브라우저 인스턴스 내에서 분리된 유사 세션
//   // 각 테스트를 새로운 브라우저 컨텍스트에서 실행하여 브라우저 상태를 테스트 간에 분리하는 것이 좋다.
//   // 컨텍스트별로 다른 기기를 시뮬레이션 가능
//   const browser = await chromium.launch();
//   const context = await browser.newContext();
//
//   // pages and frames
//   // 컨텍스트는 컨텍스트 내의 단일 탭 또는 팝업 창을 나타내는 페이지를 가질 수 있음
//   // URL로 이동해서 페이지의 콘텐츠와 상호작용할 때 사용
//   const page1 = await context.newPage(); //페이지 1 생성
//   await page1.goto('url'); //브라우저에 url 입력하는 것처럼 동작
//   await page1.fill('#search', 'query');
//   await page.click('.nav_locale');
//
//   console.log(page.url());
//
//   await page.click('data-test-id=foo');
// };

function helpFunc() {
  const STORE_URL = 'http://localhost:3000/store';
  const MENU_LIST = getStoreMenu()[1];
  const MENU = MENU_LIST.menus[0];

  return {
    STORE_URL,
    MENU_LIST,
    MENU,
  };
}

test('/store', async ({ page }) => {
  const { STORE_URL, MENU_LIST, MENU } = helpFunc();

  await page.goto(STORE_URL);

  // '/store' : title 확인
  const storeHeading = page.getByTestId(TEST_ID.HEADING.HEADING);
  await expect(storeHeading).toHaveText('Store');

  // '/store' : 메뉴 상세 페이지로 이동 확인
  const storeFirstItemButton = page.getByRole('button', { name: MENU_LIST.title });
  await storeFirstItemButton.click();
  await expect(page).toHaveURL(`${STORE_URL}/${MENU_LIST.id}`);

  // '/store/:storeId' : title 확인
  const storeDetailTitle = page.getByTestId(TEST_ID.MENU_LIST.TITLE);
  await expect(storeDetailTitle).toHaveText(MENU_LIST.title);

  // '/store/:storeId' : 메뉴 옵션 페이지로 이동 확인
  const storeDetailFirstItemButton = page.getByRole('heading', { name: MENU.name });
  await storeDetailFirstItemButton.click();
  await expect(page).toHaveURL(`${STORE_URL}/${MENU_LIST.id}/menu/${MENU.id}`);

  // '/store/:storeId/menu/:menuId' : 메뉴 이름 확인
  const storeOptionTitle = page.getByTestId(TEST_ID.MENU_OPTION.NAME);
  await expect(storeOptionTitle).toHaveText(MENU.name);

  // '/store/:storeId/menu/:menuId' : 초기 option radios / 수량 / total amount 값 확인
  const storeOptionPrice = page.getByTestId(TEST_ID.MENU_OPTION.PRICE);
  const storeOptionFirstRadio = page.getByRole('radio', { name: MENU?.options[0].name });
  const storeOptionSecondRadio = page.getByRole('radio', { name: MENU?.options[1].name });
  const storeOptionNumberAdjusterValue = page.getByTestId(TEST_ID.NUMBER_ADJUSTER.VALUE);
  const storeOptionNumberAdjusterDecreaseButton = page.getByTestId(TEST_ID.NUMBER_ADJUSTER.DECREASE_BUTTON);
  const storeOptionNumberAdjusterIncreaseButton = page.getByTestId(TEST_ID.NUMBER_ADJUSTER.INCREASE_BUTTON);
  const storeOptionSubmitButton = page.getByTestId(TEST_ID.MENU_OPTION.SUBMIT_BUTTON);
  if (MENU?.options.length > 1) {
    await expect(storeOptionFirstRadio).toBeChecked();
  } else {
    await expect(storeOptionPrice).toHaveText(`${MENU.options[0].price}원`);
  }
  await expect(storeOptionNumberAdjusterValue).toHaveText(`${1}개`);
  await expect(storeOptionSubmitButton).toHaveText(`${MENU.options[0].price}원 담기`);

  // '/store/:storeId/menu/:menuId' : 이벤트에 따라 total amount 값 변경 확인
  await storeOptionSecondRadio.click();
  await expect(storeOptionSecondRadio).toBeChecked();
  await expect(storeOptionSubmitButton).toHaveText(`${MENU.options[1].price}원 담기`);
  await storeOptionNumberAdjusterIncreaseButton.click();
  await storeOptionNumberAdjusterIncreaseButton.click();
  await expect(storeOptionSubmitButton).toHaveText(`${MENU.options[1].price * 3}원 담기`);
  await storeOptionNumberAdjusterDecreaseButton.click();
  await expect(storeOptionSubmitButton).toHaveText(`${MENU.options[1].price * 2}원 담기`);

  // '/store/:storeId/menu/:menuId' : submit 버튼 클릭 시 메뉴 디테일 페이지로 이동 확인
  await storeOptionSubmitButton.click();
  await expect(page).toHaveURL(`${STORE_URL}/${MENU_LIST.id}`);

  // '/store/:storeId' : 메뉴 옵션 페이지에서 선택한 값 확인
  const storeDetailOrderButton = page.getByTestId(TEST_ID.MENU_LIST.ORDER_BUTTON);
  await expect(storeDetailOrderButton).toHaveText(`${1}주문하기${MENU.options[1].price * 2}원`);

  // '/store/:storeId' : 다시 메뉴 옵션 페이지로 이동해서 이벤트 작동 후 아이템이 추가로 담기는지 확인
  await storeDetailFirstItemButton.click();
  await storeOptionNumberAdjusterIncreaseButton.click();
  await storeOptionNumberAdjusterIncreaseButton.click();
  await storeOptionSubmitButton.click();
  await expect(storeDetailOrderButton).toHaveText(
    `${2}주문하기${MENU.options[1].price * 2 + MENU.options[0].price * 3}원`,
  );

  // '/store/:storeId' : 다시 메뉴 옵션 페이지로 이동해서 이벤트 작동 후 뒤로가기 시, 아이템 변경이 없는지 확인
  await storeDetailFirstItemButton.click();
  await storeOptionNumberAdjusterIncreaseButton.click();
  await storeOptionNumberAdjusterIncreaseButton.click();
  await page.goBack();
  await expect(page).toHaveURL(`${STORE_URL}/${MENU_LIST.id}`);
  await expect(storeDetailOrderButton).toHaveText(
    `${2}주문하기${MENU.options[1].price * 2 + MENU.options[0].price * 3}원`,
  );

  // '/store/:storeId' : 잘못된 storeId 접근 시 에러 페이지 확인
  const storeDetailNotMatchElement = page.getByTestId(TEST_ID.NO_MATCH.NO_MATCH);
  await page.goto(`${STORE_URL}/123`);
  await expect(storeDetailTitle).not.toBeVisible();
  await expect(storeDetailNotMatchElement).toBeVisible();

  // '/store/:storeId/menu/:menuId' : 잘못된 menuId로 접근 시 에러 페이지 확인
  const storeOptionNotMatchElement = page.getByTestId(TEST_ID.NO_MATCH.NO_MATCH);
  await page.goto(`${STORE_URL}/123/menu/123`);
  await expect(storeOptionTitle).not.toBeVisible();
  // await expect(storeOptionNotMatchElement).toBeVisible();
});
