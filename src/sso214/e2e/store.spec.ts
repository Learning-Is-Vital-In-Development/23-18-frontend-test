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

  return {
    STORE_URL,
  };
}

test.describe('/store', () => {
  test('/store', async ({ page }) => {
    const { STORE_URL } = helpFunc();

    await page.goto(STORE_URL);

    // Title
    const heading = page.getByTestId(TEST_ID.HEADING.HEADING);
    await expect(heading).toHaveText('Store');

    // /store/:storeId 링크 이동
    // const storeList = page.getByTestId(TEST_ID.STORE.STORE_LIST);
    const storeListItem = await page.$(`data-testid=${TEST_ID.STORE.STORE_LIST} >> css=li:first-child`);
    console.log(storeListItem);
    await storeListItem?.click();
    // await storeList.children[0].click();
    await expect(page).toHaveURL(`${STORE_URL}/${getStoreMenu()[0].id}`);
  });

  // test('/store/:storeId', async ({ page }) => {
  //   const { STORE_URL } = helpFunc();
  //
  //   await page.goto(`${STORE_URL}/1`);
  //   await expect(page).toHaveURL(`${STORE_URL}/1`);
  // });

  // test('/store/:storeId/menu/:menuId', async ({ page }) => {
  //   //
  // });
});

// test('/store', async ({ page }) => {
//   await page.goto('http://localhost:3000/store');
//
//   // store 페이지 heading 확인
//   const heading = page.getByTestId(TEST_ID.HEADING.HEADING);
//   await expect(heading).toBeVisible();
//
//   // await expect(page).toHaveTitle('Store');
//
//   // 1. title이 올바르게 노출되는지 = store
//   // 2. 리스트 클릭 시 해당 페이지로 이동하는지
// });

// test('store/:storeId', async ({ page }) => {
//   await page.goto('http://localhost:3000');
//
//   // 1. API로 받아온 내용이 잘 들어갔는지
//   // 2. 페이지 이동
// });
//
// test('store/:storeId', async ({ page }) => {
//   await page.goto('http://localhost:3000');
//
//   // 이벤트
//   // 장바구니 담기
//   // 다시 /store/storeid ㅔㅍ이지로 이동
//   // 장바구니에 잘 들어갔는지 확인
// });
