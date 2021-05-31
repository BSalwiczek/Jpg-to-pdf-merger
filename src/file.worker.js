import { jsPDF } from "jspdf";

function getPngDimensions(base64) {
  const header = atob(base64.slice(0, 50)).slice(16, 24);
  const uint8 = Uint8Array.from(header, (c) => c.charCodeAt(0));
  const dataView = new DataView(uint8.buffer);

  return {
    width: dataView.getInt32(0),
    height: dataView.getInt32(4),
  };
}

function merge(photos) {
  return new Promise((resolve, reject) => {
    let doc = null;

    // doc = new jsPDF("l", "mm", [100, 100]);
    // doc = new jsPDF();

    photos.forEach((el, i) => {
      // let img = new Image();
      // img = document.createElement("img");
      // img.src = el.src;
      const base64 = el.src.split(",")[1];
      const { width, height } = getPngDimensions(base64);
      const ratio = width / height;

      // console.log(el);

      if (ratio < 1) {
        if (i == 0) {
          doc = new jsPDF("p", "mm", [width, height]);
        } else {
          doc.addPage([width, height], "p");
        }
      } else {
        if (i == 0) {
          doc = new jsPDF("l", "mm", [width, height]);
        } else {
          doc.addPage([width, height], "l");
        }
      }
      console.log(el);
      doc.addImage(el.src, "JPEG", 0, 0, width, height);
      // doc.addImage(img, "JPEG", 0, 0, img.width, img.height);

      postMessage({
        end: false,
        progress: (i + 1) / photos.length,
      });
    });

    postMessage({ name: "data", data: doc.output("datauristring") });
  });
}

onmessage = (e) => {
  // console.log(e);
  const { photos } = e.data;

  // console.log(photos);

  merge(photos);

  postMessage({
    end: true,
    progress: 100,
  });
};
