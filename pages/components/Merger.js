import React from "react";
import { jsPDF } from "jspdf";
import { Button } from "@material-ui/core";
import { useWorker } from "@koale/useworker";

export default function Merger({ photos, setProgress }) {
  function merge() {
    return new Promise((resolve, reject) => {
      let doc = null;

      photos.forEach((el, i) => {
        let img = new Image();
        img.src = el.src;
        const ratio = img.width / img.height;

        console.log(ratio);

        if (ratio < 1) {
          if (i == 0) {
            doc = new jsPDF("p", "mm", [img.width, img.height]);
          } else {
            doc.addPage([img.width, img.height], "p");
          }
        } else {
          if (i == 0) {
            doc = new jsPDF("l", "mm", [img.width, img.height]);
          } else {
            doc.addPage([img.width, img.height], "l");
          }
        }

        doc.addImage(img, "JPEG", 0, 0, img.width, img.height);

        // setProgress((i + 1) / photos.length);
      });

      doc.save("x.pdf");
    });
  }
  // const [mergeWorker] = useWorker(merge);

  // const mergeClick = async () => {
  //   const result = await mergeWorker(photos);
  // };

  return <Button onClick={merge}>Merge</Button>;
}
