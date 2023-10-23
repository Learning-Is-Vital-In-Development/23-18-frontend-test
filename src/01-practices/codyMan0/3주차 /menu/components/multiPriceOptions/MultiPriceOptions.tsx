import { Option } from '../../../type';
import PriceAmount from '../priceAmount/PriceAmount';

const MultiPriceOptions = ({ options }: Option) => {
  return (
    <div>
      <PriceAmount isPriceMoreThanOne={true} />
      <ol>
        {options.map((option, index) => {
          const { name, price } = option;
          return (
            <li key={price + index}>
              <label>
                <input type="radio" name={name} value={price} />
                {name}
              </label>
              <div>{price}</div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default MultiPriceOptions;
