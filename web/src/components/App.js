import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DomainSelector from "./DomainSelector";
import SelectedDomain from "./SelectedDomain";

const App = () => {
  return (
    <>
      <DomainSelector />
      <SelectedDomain />
    </>
  );
};

export default App;
