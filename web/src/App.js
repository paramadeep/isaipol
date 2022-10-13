import "./App.css";
import { Composer } from "./components/Composer";
import { useState } from "react";
import loadedDomain from "./loadedDomain";

function App() {
  let [domain] = useState(loadedDomain);
  return (
    <div className="App">
      <Composer domain={domain} />
    </div>
  );
}

export default App;
