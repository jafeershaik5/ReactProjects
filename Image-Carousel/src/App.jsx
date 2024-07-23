// import { images } from "./images.js";
// import { useEffect, useState, useRef } from "react";
// import "./App.css";

// export default function App() {
//   const [img, setImg] = useState(0);
//   const ref = useRef(null);
//   const nextImg = () => {
//     setImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//   };
//   const prevImg = () => {
//     setImg((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   };
//   useEffect(() => {
//     ref.current = setInterval(nextImg, 1000);
//     return () => {
//       clearInterval(ref.current);
//     };
//   }, []);
//   return (
//     <div
//       onMouseEnter={() => clearInterval(ref.current)}
//       onMouseLeave={() => (ref.current = setInterval(nextImg, 1000))}
//       className="container"
//     >
//       <button className="left-btn" onClick={prevImg}>
//         {"<"}
//       </button>
//       <div className="image">
//         {images.map((im, i) => {
//           return (
//             <img
//               key={i}
//               src={im}
//               alt=""
//               className={img === i ? "active" : "hidden"}
//             />
//           );
//         })}
//       </div>
//       <button className="right-btn" style={{ backgroundColor: "red" }} onClick={nextImg}>
//         {">"}
//       </button>
//     </div>
//   );
// }


import React from 'react'
import ImageCarousel from './ImageCarousel'

function App() {
  return (
    <div><ImageCarousel /></div>
  )
}

export default App