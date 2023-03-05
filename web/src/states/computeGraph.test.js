import { computeGraph } from "./computeGraph";

describe('compute graph',()=>{
  test('valid graph', ()=>{
    const graph = computeGraph([{'a':1},{'a':2}],['a']);
    expect(graph.children.children['1'].lanes.length).toBe(1)
    expect(graph.children.children['2'].lanes.length).toBe(1)
    expect(graph.children.children['1'].lanes[0].a).toBe(1)
    expect(graph.children.children['2'].lanes[0].a).toBe(2)
  })
  test('ignore lanes without values', ()=>{
    const graph = computeGraph([{'a':1, 'b':2},{'b':3}],['a']);
    expect(Object.keys(graph.children.children).length).toBe(1)
    expect(graph.children.children['1'].lanes.length).toBe(1)
    expect(graph.children.children['1'].lanes[0].a).toBe(1)
  })
  test('multi level graph', ()=>{
    const graph = computeGraph([{'a':1, 'b':1, 'c': 1},{'a':1, 'b':1, 'c': 2},{'a':1, 'b':2, 'c': 2}],['a','b','c']);
    expect(Object.keys(graph.children.children).length).toBe(1)
    expect(graph.children.children['1'].lanes.length).toBe(1)
    expect(Object.keys(graph.children.children['1'].lanes[0].a).length).toBe(2)
  })
})
