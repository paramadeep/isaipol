import enrichDomain from "./enrichDomain";

const domain = {
  name: "ice cream bill",
  defaults: ["quantity", "scoops", "flavour", "container"],
  blocks: [
    { name: "quantity", input: 1 },
    { name: "scoops", input: 1 },
    {
      name: "flavour",
      input: ["strawberry", "vanilla"],
      compute: (i, o) => {
        const costMap = { strawberry: 30, vanilla: 20 };
        o.cost = i.scoops * costMap[i.flavour] * i.quantity;
      },
    },
    {
      name: "container",
      input: ["cup", "cone"],
      compute: (i, o) => {
        const costMap = { cup: 3, cone: 2 };
        o.cost = o.cost + costMap[i.container] * i.quantity;
        o.CostPeritem = o.CostPeritem + costMap[i.container];
      },
    },
    {
      name: "sauce",
      input: ["chocolate", "blackcurrant"],
      compute: (i, o) => {
        const costMap = { cup: 5, cone: 2 };
        o.cost = o.cost + costMap[i.container];
      },
    },
  ],
  output: ["cost", "costPeritem"],
};
enrichDomain(domain);
export default domain;

// domain.blocks.forEach(b=> )
// let domain = {
//   name: "subway",
//   defaults: ["length", "bread", "Toppings"],
//   blocks: [
//     { name: "length", input: 1 },
//     { name: "bread", input: ["plain", "garlic"] },
//     { name: "Toppings", input: ["onion", "tomato"] },
//   ],
// };
