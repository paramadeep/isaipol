import React from "react";
import { GraphTable } from "./GraphTable";
import { render, screen } from "@testing-library/react";

describe("graph table", ()=>{
  test("should render", ()=> {
    const titles= ['flavour','topping','quantity/cost'];
    const graphValues=  {'vanilla': {'choco': { path: ['vanilla','choco'], lanes: [],children: {"100": {lanes:[],children:{}}}},'pista':{'jam':{"200":2}}};
    // const graphValues= { 'vanilla': {'choco': {"100":1}},'pista':{'jam':{"200":2}}};
    render(<GraphTable graphTitles={titles} graphValues={graphValues}/>)
    expect(screen.getByText('vanilla')).toBeVisible()
  })
})
