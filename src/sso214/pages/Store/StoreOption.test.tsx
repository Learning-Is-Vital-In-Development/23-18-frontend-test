import { renderHook, waitFor } from '@testing-library/react';
import { getStoreMenu } from '../../../server/data';
import { renderWithRouter, wrapper } from '../../utils';
import { TEST_ID } from '../../constant/TEST_ID';
import { MenuItem, Menus } from '../../types/Model';
import { useGetStoreMenu } from '../../apis/hooks';

function renderStoreOption(storeId?: Menus['id'], menuId?: MenuItem['id']) {
  const STORE_ID = storeId ?? getStoreMenu()[1].id;
  const MENU_ID = menuId ?? getStoreMenu()[1].menus[0].id;

  const getStoreMenuHook = () => renderHook(() => useGetStoreMenu(STORE_ID, MENU_ID), { wrapper });

  const { user, ...result } = renderWithRouter([`/store/${STORE_ID}`, `/store/${STORE_ID}/menu/${MENU_ID}`]);

  const Form = () => result.queryByTestId(TEST_ID.MENU_OPTION.FORM);
  const Name = () => result.queryByTestId(TEST_ID.MENU_OPTION.NAME);
  const Price = () => result.queryByTestId(TEST_ID.MENU_OPTION.PRICE);
  const Prices = () => result.queryByTestId(TEST_ID.RADIOS.RADIO_GROUP);
  const PricesItems = () => result.queryAllByTestId(TEST_ID.RADIOS.RADIO_ITEM);
  const PricesItemsRadio = (index: number) => PricesItems()[index].children[0];
  const NumberAdjuster = () => result.getByTestId(TEST_ID.NUMBER_ADJUSTER.NUMBER_ADJUSTER);
  const NumberAdjusterDecreaseButton = () => result.getByTestId(TEST_ID.NUMBER_ADJUSTER.DECREASE_BUTTON);
  const NumberAdjusterIncreaseButton = () => result.getByTestId(TEST_ID.NUMBER_ADJUSTER.INCREASE_BUTTON);
  const SubmitButton = () => result.getByTestId(TEST_ID.MENU_OPTION.SUBMIT_BUTTON);
  const NoMatch = () => result.queryByTestId(TEST_ID.NO_MATCH.NO_MATCH);

  const StoreDetailPageTitle = () => result.queryByTestId(TEST_ID.MENU_LIST.TITLE);
  const StoreDetailItems = () => result.queryAllByTestId(TEST_ID.MENU_LIST.ITEM);
  const StoreDetailItem = (index: number) => StoreDetailItems()[index];
  const StoreDetailPageOrderButton = () => result.queryByTestId(TEST_ID.MENU_LIST.ORDER_BUTTON);
  const StoreDetailPageOrderButtonCount = () => result.queryByTestId(TEST_ID.MENU_LIST.ORDER_BUTTON_COUNT);
  const StoreDetailPageOrderButtonAmount = () => result.queryByTestId(TEST_ID.MENU_LIST.ORDER_BUTTON_AMOUNT);

  async function clickRadio(index: number) {
    await user.click(PricesItemsRadio(index));
  }
  async function clickDecreaseButton() {
    await user.click(NumberAdjusterDecreaseButton());
  }
  async function clickIncreaseButton() {
    await user.click(NumberAdjusterIncreaseButton());
  }
  async function clickSubmitButton() {
    await user.click(SubmitButton());
  }
  async function clickStoreDetailItem(index: number) {
    await user.click(StoreDetailItem(index));
  }

  return {
    getStoreMenuHook,

    Form,
    Name,
    Price,
    Prices,
    NumberAdjuster,
    NoMatch,

    StoreDetailPageTitle,
    StoreDetailItems,
    StoreDetailItem,
    StoreDetailPageOrderButton,
    StoreDetailPageOrderButtonCount,
    StoreDetailPageOrderButtonAmount,

    clickRadio,
    clickDecreaseButton,
    clickIncreaseButton,
    clickSubmitButton,
    clickStoreDetailItem,
  };
}

describe('/store/:storeId/menu/:menuId', () => {
  it('해당 경로 접속 시, 화면이 올바르게 노출된다.', async () => {
    const { Form, Name, getStoreMenuHook } = renderStoreOption();
    const { result } = getStoreMenuHook();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(Form()).toBeInTheDocument();
    expect(Name()).toHaveTextContent((result.current.data?.menu ?? ({} as MenuItem)).name);
  });

  it('잘못된 storeId로 접근 시 <NoMatch /> 페이지가 노출된다.', async () => {
    const { Form, NoMatch, getStoreMenuHook } = renderStoreOption('abc', 'efg');
    const { result } = getStoreMenuHook();

    await waitFor(() => expect(result.current.isStale).toBe(true));

    expect(Form()).not.toBeInTheDocument();
    // expect(NoMatch()).toBeInTheDocument();
  });

  it('수량 초기값이 1로 노출된다.', async () => {
    const { NumberAdjuster, getStoreMenuHook } = renderStoreOption();
    const { result } = getStoreMenuHook();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(NumberAdjuster()).toHaveTextContent('1개');
  });

  it('담기 버튼 클릭 시, 선택한 옵션이 장바구니에 담기고 /store/:storeId 경로로 이동한다.', async () => {
    const {
      clickSubmitButton,
      Form,
      StoreDetailPageTitle,
      clickRadio,
      clickIncreaseButton,
      StoreDetailPageOrderButtonCount,
      StoreDetailPageOrderButtonAmount,
      getStoreMenuHook,
    } = renderStoreOption();
    const { result } = getStoreMenuHook();

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    await clickRadio(1);
    await clickIncreaseButton();
    await clickIncreaseButton();
    await clickSubmitButton();

    expect(Form()).not.toBeInTheDocument();
    expect(StoreDetailPageTitle()).toBeInTheDocument();
    expect(StoreDetailPageOrderButtonCount()).toHaveTextContent('1');
    expect(StoreDetailPageOrderButtonAmount()).toHaveTextContent(
      `${(result.current.data?.menu ?? ({} as MenuItem)).options[1].price * 3}원`,
    );
  });

  // it.skip('브라우저의 뒤로가기 버튼 클릭 시, 장바구니에는 변동이 없고 /store/:storeId 경로로 이동한다.', () => {
  // const {
  //   MENU,
  //   Name,
  //   StoreDetailPageOrderButtonCount,
  //   StoreDetailPageOrderButtonAmount,
  //   clickRadio,
  //   clickIncreaseButton,
  //   clickSubmitButton,
  //   clickStoreDetailItem,
  // } = renderStoreOption();
  // await clickRadio(2);
  // await clickIncreaseButton();
  // await clickIncreaseButton();
  // await clickSubmitButton();
  //
  // expect(StoreDetailPageOrderButtonCount()).toHaveTextContent('1');
  // expect(StoreDetailPageOrderButtonAmount()).toHaveTextContent(`${MENU.options[2].price * 3}원`);
  //
  // await clickStoreDetailItem(0);
  // await clickRadio(2);
  // await clickIncreaseButton();
  //
  // expect(Name()).toHaveTextContent(MENU.name);
  // window.history.go(`/store/1`);
  // window.history.go(`/store/1/menu/1`);
  // window.history.pushState(null, null, '/store/1');
  // screen.debug();
  // window.history.pushState(null, null, '/store/1/menu/1');
  // screen.debug();
  // window.history.back();
  // screen.debug();
  // expect(StoreDetailPageOrderButtonCount()).toHaveTextContent('1');
  // expect(StoreDetailPageOrderButtonAmount()).toHaveTextContent(`${MENU.options[2].price * 3}원`);
  // expect(StoreDetailPageOrderButtonCount()).toHaveTextContent('1');
  // expect(StoreDetailPageOrderButtonAmount()).toHaveTextContent(`${MENU.options[2].price * 3}원`);
  // });
});
