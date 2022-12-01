const iceCream = {
  name: "ice cream bill",
  defaults: ["quantity", "coating", "finish"],
  customTopFields: [
    { name: "Quotation For", value: "" },
    { name: "Quotation Date", value: new Date().toLocaleDateString() },
  ],
  customBottomFields: [{ name: "Delivery Date", value: "" }],
  blocks: [
    { name: "quantity", input: 1 },
    {
      name: "coating",
      input: ["varnish", "aqua"],
      compute: (i, o) => {
        const costMap = { varnish: 3, aqua: 2 };
        o.cost = o.cost + costMap[i.coating];
      },
    },
    {
      name: "finish",
      input: ["matt", "gloss"],
      compute: (i, o) => {
        const costMap = { matt: 4, gloss: 5 };
        o.cost = o.cost + costMap[i.finish];
      },
    },
    {
      name: "colors",
      input: ["four", "double", "single"],
      compute: (i, o) => {
        const costMap = { four: 3, double: 2, single: 1 };
        o.cost = o.cost + costMap[i.colors] * i.quantity;
      },
    },
    {
      name: "side",
      input: 2,
    },
  ],
  output: ["cost"],
  reportRow: "quantity",
  reportValue: "cost",
  reportGroup: ["coating"],
  reportSpecs: ["side"],
  customFields: ["customer name"],
};
console.log("I am loaded");
export default iceCream;
