import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import DomainLoader from "./DomainLoader";
import SelectedDomain from "./SelectedDomain";

const App = () => {
  return (
    <>
      <DomainLoader />
      <SelectedDomain />
    </>
  );
};

export default App;
