function getValueByType(input) {
  if (typeof input == "number") {
    return input;
  }
  if (Array.isArray(input)) {
    return input[0];
  }
  throw Error(
    `Invalid Input ${JSON.stringify(
      input
    )}, only numbers and string arrays are allowed`
  );
}

function getBlockType(input) {
  if (typeof input == "number") {
    return "number";
  }
  if (Array.isArray(input)) {
    return "array";
  }
  throw new Error(
    `Invalid Input ${JSON.stringify(
      input
    )}, only numbers and string arrays are allowed`
  );
}

const enrichDomainBlocks = (domain) => {
  domain.blocks.forEach((b) => (b.value = getValueByType(b.input)));
  domain.blocks.forEach((b) => (b.type = getBlockType(b.input)));
};

const updateDefaultBlocks = (domain) => {
  domain.blocks.forEach((block) => {
    block.isDefault = domain.defaults.includes(block.name);
    block.show = domain.defaults.includes(block.name);
  });
};

const updateInitialOutput = (domain) => {
  domain.initialOutput = domain.output.reduce((base, key) => {
    base[key] = 0;
    return base;
  }, {});
};

const addBaseLane = (domain) => {
  if (domain.lanes == null || domain.lanes.length === 0) {
    domain.lanes = [];
    domain.lanes.push({
      id: 1,
      name: domain.name,
      blocks: domain.blocks,
      output: domain.output,
      initialOutput: domain.initialOutput,
    });
  }
};

function loadSavedDomain(domain) {
  if (!domain.savedDomain){
    return domain
  }
  const savedDomain = domain.savedDomain
  const baseBlocks = domain.blocks;
  savedDomain.lanes.forEach((lane)=> {
    lane.blocks.forEach((block)=>{
      block = {...baseBlocks,value:block.value,show:block.show}
    });
  })
  return {...savedDomain, blocks: baseBlocks}
}

const enrichDomain = (domain) => {
  enrichDomainBlocks(domain);
  updateDefaultBlocks(domain);
  updateInitialOutput(domain);
  addBaseLane(domain);
  return loadSavedDomain(domain) ;
};
export default enrichDomain;
