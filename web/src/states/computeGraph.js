const getNThLevelNodes = (graph, index) => {
  let nodes = [graph.children];
  for (let i = 0; i < index; i++) {
    nodes = nodes.flatMap(node => Object.keys(node.children).flatMap(key => node.children[key]));
  }
  return nodes;
};

const getUniqValues = (lanes, group) => [...new Set(lanes.filter(lane => lane[group]).map(lane => lane[group].toString()))];

const justGraph = (graph)=>{
  let newGraph = {}
  const parent = graph.children;
  Object.keys(parent).forEach(nodeKey => {
    const node = parent[nodeKey]
    if (node.children && node.children === {}){
      newGraph = nodeKey
    } else {
      newGraph[nodeKey] = justGraph(node)
    }
  })
  return newGraph
}

export const computeGraph = (lanes, reportTitle) => {
  const graph = { children: {lanes, children:{}, "title": "root"}};
  for (let index = 0; index < reportTitle.length; index++) {
    const rowTitle = reportTitle[index];
    const nodes = getNThLevelNodes(graph, index);
    nodes.forEach(node => {
      const uniqValues = getUniqValues(node.lanes, rowTitle);
      uniqValues.forEach(uniqValue => {
        const nodeValue = {
          lanes: node.lanes.filter(lane => lane[rowTitle] == uniqValue),
          children: {},
          title: rowTitle
        };
        node.children[uniqValue] = nodeValue;
      });
    });
  }
  return justGraph(graph.children);
};
