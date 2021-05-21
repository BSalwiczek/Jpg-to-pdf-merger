// import { jsPDF } from "jspdf";

// function merge(photos) {
//   return new Promise((resolve, reject) => {
//     let doc = null;

//     photos.forEach((el, i) => {
//       let img = new Image();
//       img.src = el.src;
//       const ratio = img.width / img.height;

//       console.log(ratio);

//       if (ratio < 1) {
//         if (i == 0) {
//           doc = new jsPDF("p", "mm", [img.width, img.height]);
//         } else {
//           doc.addPage([img.width, img.height], "p");
//         }
//       } else {
//         if (i == 0) {
//           doc = new jsPDF("l", "mm", [img.width, img.height]);
//         } else {
//           doc.addPage([img.width, img.height], "l");
//         }
//       }

//       doc.addImage(img, "JPEG", 0, 0, img.width, img.height);

//       postMessage({
//         end: false,
//         progress: (i + 1) / photos.length,
//       });
//     });

//     doc.save("x.pdf");
//   });
// }

// onmessage = (e) => {
//   const { photos } = e.data;

//   merge(photos);

//   postMessage({
//     end: true,
//     progress: 100,
//   });
// };
