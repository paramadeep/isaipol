const getNThLevelNodes = (graph, index) => {
  let nodes = [graph.children];
  for (let i = 1; i < index; i++) {
    nodes = nodes.map(node => Object.keys(node.children).map(key => node.children[key]));
  }
  return nodes;
};

const getUniqValues = (lanes, group) => [...new Set(lanes.filter(lane => lane[group]).map(lane => lane[group].toString()))];

export const computeGraph = (lanes, reportTitle) => {
  const graph = { children: {lanes}};
  for (let index = 0; index < reportTitle.length; index++) {
    const rowTitle = reportTitle[index];
    const nodes = getNThLevelNodes(graph, index);
    nodes.forEach(node => {
      const uniqValues = getUniqValues(node.lanes, rowTitle);
      node.children = {};
      uniqValues.forEach(uniqValue => {
        node.children[uniqValue] = {
          lanes: node.lanes.filter(lane => lane[rowTitle] == uniqValue),
          children: {}
        };
      });
    });
  }
  return graph;
};
