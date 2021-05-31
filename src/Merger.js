import React from "react";
import { Button } from "@material-ui/core";
import { useWorker } from "@koale/useworker";
import Worker from "worker-loader!./file.worker.js";

export default function Merger({ photos, setProgress }) {
  // function merge() {
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
  //       // setProgress((i + 1) / photos.length);
  //     });
  //     doc.save("x.pdf");
  //   });
  // }
  // const [mergeWorker] = useWorker(merge);
  const mergeClick = async () => {
    // alert("sad");
    const worker = new Worker();
    worker.postMessage({ photos });
    worker.addEventListener("message", function (event) {
      if (event.data.name == "data") {
        const link = document.createElement("a");
        // create a blobURI pointing to our Blob
        link.href = event.data.data;
        link.download = "x.pdf";
        // some browser needs the anchor to be in the doc
        document.body.append(link);
        link.click();
        link.remove();
        // in case the Blob uses a lot of memory
        setTimeout(() => URL.revokeObjectURL(link.href), 7000);
      }
    });
  };
  return <Button onClick={mergeClick}>Merge</Button>;
}
