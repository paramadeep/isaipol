import { Button, Form, Modal } from "react-bootstrap";
import { domainNamesAtom, selectedDomainAtom } from "../states/domainAtom";
import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";

const DomainSelector = () => {
  const domainNames = useAtomValue(domainNamesAtom);
  const [localDomain, setLocalDomain] = useState();
  const [selectedDomain, setSelectedDomain] = useAtom(selectedDomainAtom);

  const handleChange = (event) => {
    setLocalDomain(event.target.value);
  };

  return (
    <Modal show={selectedDomain == null} size="sm">
      <Modal.Header>
        <Modal.Title>Select Costing Item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {domainNames.map((name, index) => (
            <Form.Check
              key={index}
              name="domainSelect"
              type={"radio"}
              label={name}
              id={name}
              value={name}
              onChange={handleChange}
            />
          ))}
          <Button
            className={"m-2"}
            disabled={localDomain == null}
            onClick={() => setSelectedDomain(localDomain)}
          >
            Lets Rock...
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DomainSelector;
