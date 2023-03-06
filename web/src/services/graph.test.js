import { getNthLayer } from "./graph";

describe("graph",()=>{
  test("computes nth layer", ()=>{
    const myGraph ={
      "dog": {
        "black": {
          "small": {
            "10": {}
          },
          "big": {
            "12": {}
          }
        },
        "white": {
          "big": {
            "13": {}
          }
        }
      },
      "cat": {"black": {
          "small": {
            "10": {}
          },
          "big": {
            "12": {}
          }
        },
        "white": {
          "big": {
            "13": {}
          }
        }}
    }
    const actual = getNthLayer(myGraph,1,2)
    expect(actual.length).toBe(4)
    expect(actual[0].name).toBe('small')
    expect(actual[0].noOfLeafNode).toBe(2)
    expect(actual[1].name).toBe('big')
    expect(actual[1].noOfLeafNode).toBe(1)
  })

  test("first layer",()=>{
    const graph = {"varnish":{"1":{"7":{}},"2":{"7":{}}},"aqua":{"2":{"6":{}}}}
    const firstLayer = getNthLayer(graph,0,0);
    expect(firstLayer.length).toBe(2)
    expect(firstLayer[0].noOfLeafNode).toBe(1)
    expect(firstLayer[1].noOfLeafNode).toBe(1)
  })
  test("second layer",()=>{
    const graph = {"varnish":{"1":{"7":{},"8":{}}},"aqua":{"1":{"6":{}},"2":{"9":{}}}}
    const secondLayer = getNthLayer(graph,1);
    expect(secondLayer.length).toBe(3)
  })
  test("third layer",()=>{
    const graph = {"varnish":{"1":{"7":{},"8":{}}},"aqua":{"1":{"6":{}},"2":{"9":{}}}}
    const thirdLayer = getNthLayer(graph,2);
    expect(thirdLayer.length).toBe(4)
  })
})
