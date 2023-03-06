export const computeNoOfLeafNodes = (node, depth) => {
  if (depth == 0) {
    return 1;
  }
  let nodes = Object.keys(node).map(key=>node[key])
  for (let i = 0; i < depth; i++) {
    nodes = nodes.flatMap( node => Object.keys(node).flatMap(key=>node[key]))
  }
  return nodes.length;
};


export const getNthLayer = (graph, layerDepth, childCountTillDepth) => {
  let nodesKeys = Object.keys(graph);
  let nodes = nodesKeys.map(key=>graph[key]);
  for (let i = 0; i < layerDepth; i++) {
    nodesKeys = nodes.flatMap(node => Object.keys(node));
    nodes = nodes.flatMap(node => Object.keys(node).map(key=>node[key]));
  }
  return nodes.map((node, index) => {
    const name = nodesKeys[index];
    const noOfLeafNode = computeNoOfLeafNodes(node, layerDepth - childCountTillDepth);
    return { name, noOfLeafNode, node };
  });
};
