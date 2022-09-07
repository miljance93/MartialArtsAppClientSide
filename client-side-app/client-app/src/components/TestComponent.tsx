import Props from "../app/models/properties";

const TestComponent = ({
  placeholder,
  value,
  onChangeHandler,
  onClickHandler,
}: Props) => {
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
      />
      <button onClick={onClickHandler}>Submit</button>
    </div>
  );
};

export default TestComponent;
