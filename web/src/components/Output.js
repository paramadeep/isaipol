const Output = ({ values, fields }) => {
  return (
    <div data-testid={"output"}>
      {fields.map((f, index) => (
        <div key={index}>{`${f}: ${values[f]}`}</div>
      ))}
    </div>
  );
};

export default Output;
