let domain = {
  name: "ice cream bill",
  defaults: ["scoops", "flavour", "container"],
  blocks: [
    { name: "scoops", input: 1 },
    { name: "flavour", input: ["strawberry", "vanilla"] },
    { name: "container", input: ["cup", "cone"] },
  ],
};
export default domain;
