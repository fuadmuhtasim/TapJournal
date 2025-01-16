// import React, { useEffect } from 'react';

// const FetchUserDetails = () => {
//   // Fetch function to get user details
//   const getUserDetails = async () => {
//     try {
//       const response = await fetch("https://tapdatabase.onrender.com/User1", {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'same-origin',  // Adjust based on your needs for credentials
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("Fetched user details:", data);
//     } catch (error) {
//       console.error("Error fetching user:", error);
//     }
//   };

//   // useEffect hook to call fetch on component mount
//   useEffect(() => {
//     getUserDetails();
//   }, []);  // Empty dependency array ensures it runs only once when the component mounts

//   return (
//     <div>
//       <h1>User Details</h1>
//       <p>Check the console for user details fetched from the API.</p>
//     </div>
//   );
// };

// export default FetchUserDetails;
