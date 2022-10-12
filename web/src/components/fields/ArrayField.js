function Options({ options }) {
  return options.map((option, index) => <option key={index}>{option}</option>);
}

export function ArrayField({ input }) {
  return (
    <select data-testid={"arrayField"}>
      <Options options={input} />
    </select>
  );
}
