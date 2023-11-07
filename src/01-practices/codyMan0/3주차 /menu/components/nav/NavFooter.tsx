const NavFooter = ({ minPriceNum }: { minPriceNum: number }) => {
  const totalPrice = 123;
  return (
    <div>
      <div>
        <span>배달최소주문금액</span>
        <span>{minPriceNum}</span>
      </div>
      <form>
        <button type="submit">{`${totalPrice}담기`}</button>
      </form>
    </div>
  );
};

export default NavFooter;
