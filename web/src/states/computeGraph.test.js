import { computeGraph } from "./computeGraph";

describe('compute graph',()=>{
  test('multi level graph', ()=>{
    const graph = computeGraph([
      {'type':'dog', 'color':'black', 'size': 'small', 'cost': 10},
      {'type':'cat', 'size': 'small', 'cost': 10},
      {'type':'dog', 'color':'black', 'size': 'big', 'cost': 12},
      {'type':'dog', 'color':'white', 'size': 'big', 'cost': 13}],['type','color','size','cost']);
    expect(Object.keys(graph.dog.black.small['10']).length).toBe(0)
    expect(Object.keys(graph.dog.black.big['12']).length).toBe(0)
    expect(Object.keys(graph.dog.white.big['13']).length).toBe(0)
    expect(Object.keys(graph.cat).length).toBe(0)
  })
})
