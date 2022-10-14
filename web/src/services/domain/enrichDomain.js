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

const enrichDomainBlocks = (domain) => {
  domain.blocks.forEach((b) => (b.value = getValueByType(b.input)));
};

const updateDefaultBlocks = (domain) => {
  domain.defaultBlocks = domain.blocks.filter((block) =>
    domain.defaults.includes(block.name)
  );
};

const updateInitialOutput = (domain) => {
  domain.initialOutput = domain.output.reduce((base, key) => {
    base[key] = 0;
    return base;
  }, {});
};

const enrichDomain = (domain) => {
  enrichDomainBlocks(domain);
  updateDefaultBlocks(domain);
  updateInitialOutput(domain);
};
export default enrichDomain;
