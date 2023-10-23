import Toggler from '../toggler/Toggler';

interface Props {
  menuCount: number;
  increase: () => void;
  decrease: () => void;
}

const SinglePriceOption = ({ menuCount, increase, decrease }: Props) => {
  return (
    <div>
      {/* <PriceAmount isPriceMoreThanOne={true} /> */}
      <div className="divider"></div>
      <div>
        <h2>수량</h2>
        <Toggler menuCount={menuCount} increase={increase} decrease={decrease} />
      </div>
    </div>
  );
};

export default SinglePriceOption;
