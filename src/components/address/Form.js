import React, { useState, useEffect, useCallback } from "react";
import { Form, Alert, InputGroup, Button } from "react-bootstrap";
import addresesServices from "../../services/addreses.services";

const AddAddresses = ({ id, setAddressesId }) => {
  const [place, setPlace] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (place === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newAddresses = {
      place,
    };
    console.log(newAddresses);

    try {
      if (id !== undefined && id !== "") {
        await addresesServices.updateAddreses(id, newAddresses);
        setAddressesId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        const { error, msg } = await addresesServices.addAddresess(
          newAddresses
        );
        setMessage({ error, msg });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setPlace("");
  };

  const editHandler = useCallback(async () => {
    setMessage("");
    try {
      const docSnap = await addresesServices.getAddress(id);
      console.log("the record is :", docSnap.data());
      setPlace(docSnap.data().place);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  }, [id]);

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id, editHandler]);
  return (
    <>
      <div className="p-4 box">
        {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formAddressesPlace">
            <InputGroup>
              <InputGroup.Text id="formAddressesPlace">B</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Addresses Place"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="Submit">
              Add/ Update
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default AddAddresses;
