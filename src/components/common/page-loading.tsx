"use client";

// export default function PageLoading() {
//   return (
//     <div className="h-screen bg-white bg-opacity-60 z-10 w-full flex items-center justify-center">
//     <div className="flex items-center">
//       {/* <span className="text-3xl mr-4">Loading</span> */}
//       <svg className="animate-spin h-8 w-8 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none"
//         viewBox="0 0 24 24">
//         <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth={4} stroke="currentColor"></circle>
//         <path className="opacity-75" fill="currentColor"
//           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
//         </path>
//       </svg>
//     </div>
//   </div>
//   );
// }

export default function PageLoading() {
  return (
    <div className="h-screen bg-white bg-opacity-60 z-10 w-full flex items-center justify-center">
      <div className="flex items-center">
        {/* <span className="text-3xl mr-4">Loading</span> */}
        <div className="flex gap-2">
          <div className="w-5 h-5 rounded-full animate-pulse bg-neutral-600"></div>
          <div className="w-5 h-5 rounded-full animate-pulse bg-neutral-600"></div>
          <div className="w-5 h-5 rounded-full animate-pulse bg-neutral-600"></div>
        </div>
      </div>
    </div>
  );
}

// export default function Loader() {
//   return (
//     <div>
//       <CutoutTextLoader
//         background="white"
//         // NOTE: Using GIFs for the background looks super cool :)
//         imgUrl="/outside.jpg"
//       />
//     </div>
//   );
// };

// const CutoutTextLoader = ({
//   background,
//   imgUrl,
// }: {
//   background: string;
//   imgUrl: string;
// }) => {
//   return (
//     <div className="relative h-screen">
//       <div
//         className="absolute inset-0 z-0"
//         style={{
//           backgroundImage: `url(${imgUrl})`,
//           backgroundPosition: "center",
//           backgroundSize: "cover",
//         }}
//       />
//       <div
//         style={{ background }}
//         className="absolute inset-0 animate-pulse z-10"
//       />
//       <div className="absolute inset-0 flex items-center justify-center z-20">
//         {/* <span
//           className="font-black text-center bg-clip-text text-transparent pointer-events-none"
//           style={{
//             backgroundImage: `url(${imgUrl})`,
//             backgroundPosition: "center",
//             backgroundSize: "cover",
//             fontSize: "clamp(3rem, 12vw, 10rem)",
//           }}
//         >
//           Loading...
//         </span> */}
//         <svg className="animate-spin size-8 font-black" xmlns="http://www.w3.org/2000/svg" fill="none"
//         viewBox="0 0 24 24">
//         <circle className="opacity-25" cx="12" cy="12" r="10" strokeWidth={4} stroke="currentColor"></circle>
//         <path className="opacity-75" fill="currentColor"
//           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
//         </path>
//       </svg>
//       </div>
//     </div>
//   );
// };
