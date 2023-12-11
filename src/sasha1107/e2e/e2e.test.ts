import { test, expect } from '@playwright/test';

test('HomePage', async ({ page }) => {
  await page.goto('http://localhost:3000');
  // 페이지 제목 찾기
  const title = page.getByRole('heading', { name: /Home/ });
  const button = page.getByRole('button', { name: /가게로 이동/ });
  await expect(title).toBeVisible();
  await expect(button).toBeVisible();
  await button.click();
  expect(page.url()).toBe('http://localhost:3000/store/a382f0b9');

  // 오픈 상태 확인
  // const isOpen = page.getByText('영업중');
  // await expect(isOpen).toBeVisible();

  const 마라로제 = page.getByText('마라로제');
  await expect(마라로제).toBeVisible();
  await 마라로제.click();

  const 배달최소주문금액 = page.getByText('배달최소주문금액');
  await expect(배달최소주문금액).toBeVisible();
  // 메뉴 이름 확인
  const menuName = page.getByText('떡볶이');
  await expect(menuName).toBeVisible();

  // 담기 버튼
  const addButton = page.getByRole('button', { name: /최종금액/ });
  await expect(addButton).toHaveText('9,900원 담기');

  // 수량 증가 버튼
  const incrementButton = page.getByRole('button', { name: /수량 증가/ });
  await expect(incrementButton).toBeVisible();
  await incrementButton.click();

  await expect(addButton).toHaveText('19,800원 담기');

  await addButton.click();
  expect(page.url()).toContain('http://localhost:3000/store/a382f0b9?data=');

  // 두 번째 메뉴 담기
  const menu2 = page.getByText('일첩 세트');
  await expect(menu2).toBeVisible();
  await menu2.click();

  const addButton2 = page.getByRole('button', { name: /최종금액/ });
  await expect(addButton2).toHaveText('15,000원 담기');
  const incrementButton2 = page.getByRole('button', { name: /수량 증가/ });
  await expect(incrementButton2).toBeVisible();
  await incrementButton2.click();
  await expect(addButton2).toHaveText('30,000원 담기');
  await addButton2.click();
  expect(page.url()).toContain('http://localhost:3000/store/a382f0b9?data=');

  // 주문하기 버튼
  const orderButton = page.getByRole('button', { name: /주문하기/ });
  await expect(orderButton).toBeVisible();
  await orderButton.click();

  // 결과 페이지
  expect(page.url()).toContain('http://localhost:3000/result');
  const resultTitle = page.getByRole('heading', { name: /장바구니/ });
  await expect(resultTitle).toBeVisible();
  const resultPrice = page.getByTestId('resultPrice');
  await expect(resultPrice).toHaveText('총 금액 49,800원');
});
