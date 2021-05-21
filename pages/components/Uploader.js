import React, { createRef } from "react";
import cuid from "cuid";
import { Button } from "@material-ui/core";

export default function Uploader({ setPhotos }) {
  const fileInput = createRef();

  function triggerInput() {
    fileInput.current.click();
  }

  function submitPhotos(e) {
    // console.log(e.target.files);

    const uploaded = Array.from(e.target.files).map((el) => {
      return {
        id: cuid(),
        photo: el,
        name: el.name,
        lastModified: el.lastModified,
      };
    });
    setPhotos((photos) => [...photos, ...uploaded]);
  }

  return (
    <>
      <input
        type="file"
        style={{
          display: "none",
        }}
        multiple
        ref={fileInput}
        onChange={(e) => submitPhotos(e)}
      ></input>
      <Button onClick={() => triggerInput()}>Upload</Button>
    </>
  );
}
