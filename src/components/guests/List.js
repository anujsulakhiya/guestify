import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import guestServices from "../../services/guests.services";
// import axios from "axios";
const GuestsList = ({ getGuestId }) => {
  const [guests, setGuests] = useState([]);
  useEffect(() => {
    getGuests();
  }, []);

  const getGuests = async () => {
    const data = await guestServices.getAllGuests();
    console.log(data.docs);
    setGuests(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await guestServices.deleteGuests(id);
    getGuests();
  };

//   const translateToHindi = async (place) => {
//     try {
//       const response = await axios.get(
//         "https://translation.googleapis.com/language/translate/v2",
//         {
//           params: {
//             q: place,
//             source: "en",
//             target: "hi",
//             key: "YOUR_GOOGLE_TRANSLATE_API_KEY",
//           },
//         }
//       );

//       const hindiName = response.data.data.translations[0].translatedText;
//       return hindiName;
//     } catch (error) {
//       console.error("Error translating to Hindi:", error);
//       return place; // If translation fails, return the original English name
//     }
//   };

//   const renderHindiName = async (place) => {
//     const hindiName = await translateToHindi(place);
//     return hindiName;
//   };
  return (
    <>
      <div className="mb-2">
        <Button variant="dark edit" onClick={getGuests}>
          Refresh List
        </Button>
      </div>

      {/* <pre>{JSON.stringify(guests, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Place</th>
            <th>Name</th>
            <th>Invitation Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.place}</td>
                <td>{doc.full_name}</td>
                <td>{doc.invitation_type}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getGuestId(doc.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={(e) => deleteHandler(doc.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default GuestsList;
