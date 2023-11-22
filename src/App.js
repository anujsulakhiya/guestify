import { useState } from "react";
import { Container, Navbar, Row, Col } from "react-bootstrap";
import "./App.css";
import AddAddresses from "./components/address/Form";
import AddresessList from "./components/address/List";
import AddGuests from "./components/guests/Form";
import GuestsList from "./components/guests/List";

function App() {
  const [addressId, setAddressId] = useState("");
  const [guestId, setGuestId] = useState("");

  const getAddressIdHandler = (id) => {
    console.log("The Address ID of document to be edited: ", id);
    setAddressId(id);
  };

  const getGuestIdHandler = (id) => {
    console.log("The Guests ID of document to be edited: ", id);
    setGuestId(id);
  };
  return (
    <>
      <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home">Manage Address</Navbar.Brand>
        </Container>
      </Navbar>

      <Container style={{ width: "400px" }}>
        <Row>
          <Col>
            <AddAddresses id={addressId} setAddressId={setAddressId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <AddresessList getAddressId={getAddressIdHandler} />
          </Col>
        </Row>
      </Container>
      <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home">Manage Guests</Navbar.Brand>
        </Container>
      </Navbar>

      <Container style={{ width: "400px" }}>
        <Row>
          <Col>
            <AddGuests id={guestId} setGuestsId={setGuestId} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <GuestsList getGuestId={getGuestIdHandler} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
