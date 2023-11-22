import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import addresesServices from "../../services/addreses.services";

const AddresessList = ({ getAddressId }) => {
  const [addresess, setAddresess] = useState([]);
  useEffect(() => {
    getAddreses();
  }, []);

  const getAddreses = async () => {
    const data = await addresesServices.getAllAddreses();
    console.log(data.docs);
    setAddresess(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await addresesServices.deleteAddreses(id);
    getAddreses();
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
        <Button variant="dark edit" onClick={getAddreses}>
          Refresh List
        </Button>
      </div>

      {/* <pre>{JSON.stringify(addresess, undefined, 2)}</pre>} */}
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Place</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {addresess.map((doc, index) => {
            return (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.place}</td>
                <td>
                  <Button
                    variant="secondary"
                    className="edit"
                    onClick={(e) => getAddressId(doc.id)}
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

export default AddresessList;
