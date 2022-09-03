import Props from "../app/models/properties";

const TestComponent = ({ placeholder }: Props) => {
  const nekaFunkcija = () => {
    console.log("nesto logujem");
  };

  const setName = () => {
    console.log("set name");
  };

  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value="Stefan"
        onChange={setName}
      />
      <button onClick={nekaFunkcija}>Submit</button>
    </div>
  );
};

export default TestComponent;
