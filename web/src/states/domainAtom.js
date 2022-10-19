import { atom } from "jotai";
import inlineDomain from "../services/domain/inlineDomain";

const domain = atom(inlineDomain);

export default domain;
