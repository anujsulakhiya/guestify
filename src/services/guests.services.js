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

const guestsCollectionRef = collection(db, "guests");
class GuestsDataService {
  addGuests = async (newGuest) => {
    try {
      // Check if the address already exists in the database
      const addressQuery = query(guestsCollectionRef, where("full_name", "==", newGuest.full_name));
      const snapshot = await getDocs(addressQuery);
      if (!snapshot.empty) {
        // Guest already exists, update it instead
        console.log("Guest already exists", newGuest.full_name);
        return {
          error: true,
          msg: "Guest already exists!",
        };
      } else {
        // Guest does not exist, add it as a new document
        addDoc(guestsCollectionRef, newGuest);
        return {
          error: false,
          msg: "New Guests added successfully!",
        };
      }
    } catch (error) {
      console.error("Error adding address:", error);
      throw error;
    }
  };
  updateGuest = (id, updatedGuest) => {
    const bookDoc = doc(db, "guests", id);
    return updateDoc(bookDoc, updatedGuest);
  };

  deleteGuests = (id) => {
    const bookDoc = doc(db, "guests", id);
    return deleteDoc(bookDoc);
  };

  getAllGuests = () => {
    return getDocs(guestsCollectionRef);
  };

  getGuestId = (id) => {
    const bookDoc = doc(db, "guests", id);
    return getDoc(bookDoc);
  };
}

export default new GuestsDataService();
