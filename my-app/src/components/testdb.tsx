//This is a test file to work with the database
interface Items {
    id: string,
    title: string,
    url: string,
    isActive?: boolean
    description: string
}
interface UserDetails {
    id: string,
    title: string,
    url: string,
    items: Items []
}
//I am getting an array of UserDetails from here. Not UserDetails itself.
// const getUser = async() : Promise<UserDetails[]> =>{
//     try{
//         const response = await fetch("http://localhost:4000/User1");
//         if (!response.ok) { 
//             throw new Error(`HTTP error! status: ${response.status}`); 
//         }
//         const data = await response.json();
//         return data;
//     }
//     catch (error){ 
//         console.error("Error fetching user:", error);
//         throw error;
//     }
// }
// // Example usage:
//     const userData = await getUser();
//     console.log("Fetched User Data:", userData);
//     // Accessing data:
//     console.log(userData[0].id);
//     console.log(userData[0].title);
//     console.log(userData[0].url);
//     console.log(userData[0].items);
//     console.log(userData[1].id);
//     console.log(userData[1].title);
//     console.log(userData[1].url);
//     console.log(userData[1].items);
//     // Iterating through the items in the list
//     for (const item of userData[1].items) {
//         // Assuming 'item' is an object, access its properties
//         console.log(" - Item:", item.id, item.title, item.url);
//         if (item.isActive == true) {
//             console.log("  true")
//         }
//     }
// // Another function to post item to Database:
// const addItemToJournalEntries = async (newItem: Items): Promise<void> => {
//     try {
//         // Step 1: Fetch the current data
//         const response = await fetch("http://localhost:4000/User1");
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const userDetails: UserDetails[] = await response.json();
//         // Step 2: Find the JournalEntries object
//         const journalEntries = userDetails.find(user => user.id === "JournalEntries");
//         if (!journalEntries) {
//             throw new Error("JournalEntries not found in the database.");
//         }
//         // Step 3: Add the new item to the items array
//         const lastItemId = journalEntries.items[journalEntries.items.length - 1].id;
//         const newItemId = (parseInt(lastItemId) + 1).toString();
//         newItem.id = newItemId;
//         journalEntries.items.push(newItem);
//         // Step 4: Send a PUT request to update the entire JournalEntries object
//         const putResponse = await fetch(`http://localhost:4000/User1/${journalEntries.id}`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(journalEntries),
//         });
//         // Failed to update data from database
//         if (!putResponse.ok) {
//             throw new Error(`Failed to update database. HTTP error: ${putResponse.status}`);
//         }
//         console.log("Item successfully added to JournalEntries.");
//     } catch (error) {
//         console.error("Error adding item to JournalEntries:", error);
//         throw error;
//     }
// };
// // Example usage:
// const newItem: Items = {
//     id: "100",
//     title: "Fifty Six",
//     url: "#",
// };
// addItemToJournalEntries(newItem);

// const deleteItemJournalEntries = async (id: string): Promise<void> => {
//     try {
//         // Step 1: Fetch the current data
//         const response = await fetch("http://localhost:4000/User1");
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const userDetails: UserDetails[] = await response.json();

//         // Step 2: Find the JournalEntries object
//         const journalEntries = userDetails.find(user => user.id === "JournalEntries");
//         if (!journalEntries) {
//             throw new Error("JournalEntries not found in the database.");
//         }
//         // Step 3: Filter out the item with the specified ID
//         const updatedItems = journalEntries.items.filter(item => item.id !== id);

//         // Step 4: Update the journalEntries object
//         const updatedJournalEntries = { ...journalEntries, items: updatedItems };

//         console.log(updatedJournalEntries);

//         // Step 5: Send the updated data back to the server using the correct PUT URL
//         const updateResponse = await fetch(`http://localhost:4000/User1/JournalEntries`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(updatedJournalEntries),
//         });

//         if (!updateResponse.ok) {
//             throw new Error(`Failed to update data! status: ${updateResponse.status}`);
//         }
//         console.log(`Item with ID ${id} deleted successfully.`);
//     } catch (error) {
//         console.error("Error deleting item:", error);
//     }
// };


// // Example: Deleting an item with ID "1" from JournalEntries
// deleteItemJournalEntries("1");



// const modifyJournalEntry = async (id: string): Promise<void> => {
//     try {
//         // Step 1: Fetch the current data
//         const response = await fetch("http://localhost:4000/User1");
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const userDetails: UserDetails[] = await response.json();

//         // Step 2: Find the JournalEntries object
//         const journalEntries = userDetails.find(user => user.id === "JournalEntries");
//         if (!journalEntries) {
//             throw new Error("JournalEntries not found in the database.");
//         }
//         // Step 3: Find the item by ID and modify its description and title
//         const updatedItems = journalEntries.items.map(item =>
//             item.id === id
//                 ? {
//                     ...item,
//                     description: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
//                     title: "XXXXXXXXX"
//                 }
//                 : item
//         );

//         // Step 4: Update the journalEntries object
//         const updatedJournalEntries = { ...journalEntries, items: updatedItems };

//         console.log(updatedJournalEntries);

//         // Step 5: Send the updated data back to the server using the correct PUT URL
//         const updateResponse = await fetch(`http://localhost:4000/User1/JournalEntries`, {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(updatedJournalEntries),
//         });

//         if (!updateResponse.ok) {
//             throw new Error(`Failed to update data! status: ${updateResponse.status}`);
//         }
//         console.log(`Item with ID ${id} updated successfully.`);
//     } catch (error) {
//         console.error("Error updating item:", error);
//     }
// };

// modifyJournalEntry("6");

