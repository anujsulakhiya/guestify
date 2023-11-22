import React, { useState, useEffect, useCallback } from "react";
import { Form, Alert, InputGroup, Button, ButtonGroup } from "react-bootstrap";
import guestServices from "../../services/guests.services";
import AutoComplete from "react-autocomplete";
import addresesServices from "../../services/addreses.services";

const AddGuests = ({ id, setGuestsId }) => {
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [invitationType, setInvitationType] = useState("family");
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [flag, setFlag] = useState(true);

  const [addressList, setAddressList] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await addresesServices.getAllAddreses();
        setAddressList(data.docs.map((doc) => doc.data().place));
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    console.log(
      "The place is : ",
      place,
      "The name is : ",
      name,
      "The invitation type is : ",
      invitationType
    );
    if (place === "" || name === "" || invitationType === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }
    const newGuests = {
      place,
      full_name: name,
      invitation_type: invitationType,
    };
    console.log(newGuests);

    try {
      if (id !== undefined && id !== "") {
        await guestServices.updateGuest(id, newGuests);
        setGuestsId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        const { error, msg } = await guestServices.addGuests(newGuests);
        setMessage({ error, msg });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setPlace("");
    setName("");
    setInvitationType("family");
  };

  const editHandler = useCallback(async () => {
    setMessage("");
    try {
      const docSnap = await guestServices.getGuestId(id);
      console.log("the record is :", docSnap.data());
      setPlace(docSnap.data().place);
      setName(docSnap.data().full_name);
      setInvitationType(docSnap.data().invitationType);
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
          <Form.Group className="mb-3" controlId="formGuestsPlace">
            <InputGroup style={{ zIndex: 999 }}>
              <InputGroup.Text id="formGuestsPlace">B</InputGroup.Text>
              <AutoComplete
                inputProps={{
                  type: "text",
                  placeholder: "Guests Place",
                  value: place,
                  onChange: (e) => setPlace(e.target.value),
                }}
                items={addressList}
                shouldItemRender={(item, value) =>
                  item.toLowerCase().indexOf(value.toLowerCase()) !== -1
                }
                getItemValue={(item) => item}
                renderItem={(item, isHighlighted) => (
                  <div
                    key={item} // Use 'item' as the key
                    style={{
                      background: isHighlighted ? "lightgray" : "white",
                      padding: "5px 10px",
                    }}
                  >
                    {item}
                  </div>
                )}
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                onSelect={(value) => setPlace(value)}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBookAuthor">
            <InputGroup>
              <InputGroup.Text id="formBookAuthor">A</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Guests Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
          <ButtonGroup aria-label="Basic example" className="mb-3">
            <Button
              disabled={flag}
              variant="success"
              onClick={(e) => {
                setInvitationType("family");
                setFlag(true);
              }}
            >
              Family
            </Button>
            <Button
              variant="danger"
              disabled={!flag}
              onClick={(e) => {
                setInvitationType("single");
                setFlag(false);
              }}
            >
              Single
            </Button>
          </ButtonGroup>
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

export default AddGuests;
