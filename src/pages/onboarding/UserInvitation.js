// import React, { useState, useRef } from "react";

// const UserInvitation = ({ moveToNextStep }) => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     jobTitle: "",
//     email: "",
//     phoneNumber: "",
//     gender: "",
//     dateOfBirth: "",
//   });
//   const [imagePreview, setImagePreview] = useState(null);

//   const fileInputRef = useRef(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleButtonClick = () => {
//     fileInputRef.current.click();
//   };

//   // const handleFileChange = (e) => {
//   //   const file = e.target.files[0];

//   //   console.log("Selected file:", file)
//   // }

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     const imageUrl = URL.createObjectURL(file);
//     setImagePreview(imageUrl);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     moveToNextStep();
//     console.log(formData);
//   };

//   return (
//     <div
//       style={{
//         marginRight: "10px",
//         marginTop: "15px"
//       }}
//     >
//       <h2
//         className="text-lg font-semibold mb-2"
//         style={{
//           fontSize: "24px",
//           fontWeight: "600",
//           fontFamily: "outFit, Sans-serif",
//           color: "#505050",
//           marginTop: "15px",
//         }}
//       >
//         Invite Users
//       </h2>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           borderRadius: "14px",
//           marginTop: "20px",
//         }}
//       >
//         <div
//           style={{
//             borderRadius: "14px",
//             background: "#fff",
//             width: "100%",
//             padding: "15px",
//           }}
//         >
//           <div
//             style={{
//               marginBottom: "10px",
//               padding: "5px",
//             }}
//           >
//             <h2
//               style={{
//                 fontSize: "24px",
//                 color: "#505050",
//                 fontFamily: "outFit, Sans-serif",
//                 fontWeight: "600",
//                 padding: "5px",
//               }}
//             >
//               Create User
//             </h2>
//             <div
//               className="flex flex-col mb-4 w-full sm:flex-row sm:items-center"
//               style={{
//                 width: "100%",
//               }}
//             >
//               <div className="mt-4 sm:w-1/2 sm:mr-4">
//                 <label
//                   className="font-semibold mr-2"
//                   style={{
//                     fontSize: "16px",
//                     fontWeight: "600",
//                     color: "#505050",
//                     fontFamily: "outFit, Sans-serif",
//                   }}
//                 >
//                   Email Address
//                 </label>
//                 <br />
//                 <p
//                   style={{
//                     color: "#a1a1a1",
//                     fontFamily: "outFit, Sans-serif",
//                     fontSize: "14px",
//                     fontWeight: "400",
//                     marginTop: "10px",
//                     marginBottom: "10px",
//                   }}
//                 >
//                   Email addresses of the users you want to invite, separated by
//                   commas.
//                 </p>
//                 <input
//                   type="email"
//                   className="border border-gray-300 px-2 py-1 rounded-md w-full"
//                   placeholder="Enter email addresses"
//                   style={{
//                     padding: "10px",
//                   }}
//                 />
//               </div>
//               <div className="mt-4 sm:w-1/2">
//                 <label
//                   className="font-semibold mr-2"
//                   style={{
//                     fontSize: "16px",
//                     fontWeight: "600",
//                     color: "#505050",
//                     fontFamily: "outFit, Sans-serif",
//                   }}
//                 >
//                   Choose User Group
//                 </label>
//                 <br />
//                 <p
//                   style={{
//                     color: "#a1a1a1",
//                     fontFamily: "outFit, Sans-serif",
//                     fontSize: "14px",
//                     fontWeight: "400",
//                     marginTop: "10px",
//                     marginBottom: "10px",
//                   }}
//                 >
//                   Select the user group that best fits the role and access level
//                   for the invited users
//                 </p>
//                 <select
//                   className="border border-gray-300 px-2 py-1 rounded-md w-full"
//                   style={{
//                     padding: "10px",
//                   }}
//                 >
//                   <option value="">Choose User group</option>
//                   <option value="permission1">Permission 1</option>
//                   <option value="permission2">Permission 2</option>
//                   {/* Add more options as needed */}
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//         }}
//       >
//         <div
//           style={{
//             width: "100%",
//             display: "flex",
//             justifyContent: "end",
//             marginTop: "20px",
//           }}
//         >
//           <button
//             type="submit"
//             style={{
//               padding: "7px 20px 7px 20px",
//               background: "#4467a1",
//               borderRadius: "28px",
//               color: "#fff",
//               marginTop: "10px",
//             }}
//             onClick={handleSubmit}
//           >
//             Save User Group
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserInvitation;
