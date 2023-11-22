import { db } from "../firebase-config";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query, 
  where
} from "firebase/firestore";

const addressesCollectionRef = collection(db, "addresses");
class AddressesDataService {
  addAddresess = async (newAddress) => {
    try {
      // Check if the address already exists in the database
      const addressQuery = query(addressesCollectionRef, where("place", "==", newAddress.place));
      const snapshot = await getDocs(addressQuery);
      if (!snapshot.empty) {
        // Address already exists, update it instead
        console.log("Address already exists", newAddress.place);
        return {
          error: true,
          msg: "Address already exists!",
        };
      } else {
        // Address does not exist, add it as a new document
        addDoc(addressesCollectionRef, newAddress);
        return {
          error: false,
          msg: "New Addresses added successfully!",
        };
      }
    } catch (error) {
      console.error("Error adding address:", error);
      throw error;
    }
  };
  updateAddreses = (id, updatedAddreses) => {
    const bookDoc = doc(db, "addresses", id);
    return updateDoc(bookDoc, updatedAddreses);
  };

  deleteAddreses = (id) => {
    const bookDoc = doc(db, "addresses", id);
    return deleteDoc(bookDoc);
  };

  getAllAddreses = () => {
    return getDocs(addressesCollectionRef);
  };

  getAddress = (id) => {
    const bookDoc = doc(db, "addresses", id);
    return getDoc(bookDoc);
  };
}

export default new AddressesDataService();
