import enrichDomain from "./enrichDomain";
import domains from "../../domains";
domains.forEach((d) => enrichDomain(d));
export default domains;
