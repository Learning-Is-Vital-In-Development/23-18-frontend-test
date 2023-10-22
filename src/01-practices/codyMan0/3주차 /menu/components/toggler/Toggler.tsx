interface Props {
  menuCount: number;
  increase: () => void;
  decrease: () => void;
}

const Toggler = ({ menuCount, increase, decrease }: Props) => {
  return (
    <>
      <button type="button" onClick={increase}>
        +
      </button>
      <span>{menuCount}</span>
      <button type="button" onClick={decrease}>
        -
      </button>
    </>
  );
};

export default Toggler;
