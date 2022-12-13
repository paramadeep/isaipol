import { atom } from "jotai";
import { domainAtom, rawDomainFileAtom } from "./domainAtom";
import {parse,print} from 'recast'

const saveDomainAtom =  atom(get=>{
  const domain = get(domainAtom);
  const rawDomainFile = get(rawDomainFileAtom);
  if (!rawDomainFile){
    console.log("empty :(");
    return ""
  }
  const fileAst = parse(rawDomainFile,{
    parser: require("@babel/parser")
  });
  const domainAst = parse(`export default { savedDomain:   ${JSON.stringify(domain)} }`);
  console.log(fileAst.program.body[0]);
  const domainObjectAst = domainAst.program.body[0].declaration.properties[0]
  fileAst.program.body.find(n=>n.type === 'ExportDefaultDeclaration').declaration.properties.push(domainObjectAst)
  return print(fileAst).code
})
export default saveDomainAtom;
