const PriceAmount = ({ isPriceMoreThanOne }: { isPriceMoreThanOne: boolean }) => {
  return (
    <div>
      <h2>가격</h2>
      {isPriceMoreThanOne ? `필수` : `${5000}원`}
    </div>
  );
};

export default PriceAmount;
