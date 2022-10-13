let domain = {
  name: "ice cream bill",
  defaults: ["scoops", "flavour", "container"],
  blocks: [
    { name: "scoops", input: 1 },
    { name: "flavour", input: ["strawberry", "vanilla"] },
    { name: "container", input: ["cup", "cone"] },
  ],
};
// let domain = {
//   name: "sub",
//   defaults: ["length", "bread", "Toppings"],
//   blocks: [
//     { name: "length", input: 1 },
//     { name: "bread", input: ["plain", "garlic"] },
//     { name: "Toppings", input: ["onion", "tomato"] },
//   ],
// };
export default domain;
