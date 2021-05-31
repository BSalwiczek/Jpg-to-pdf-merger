import React from "react";
import Photo from "./Photo";
import update from "immutability-helper";

export default function PhotosDisplay({ photos, setPhotos }) {
  // console.log(photos);

  const moveImage = (dragIndex, hoverIndex) => {
    const draggedImage = photos[dragIndex];
    console.log("dragged Image", dragIndex, hoverIndex, draggedImage);

    setPhotos(
      update(photos, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedImage],
        ],
      })
    );
  };

  return (
    <>
      <div className="photos">
        {photos.map((photo, index) => (
          <Photo
            key={photo.id}
            photo={photo}
            moveImage={moveImage}
            index={index}
            setPhotos={setPhotos}
          ></Photo>
        ))}
      </div>
    </>
  );
}
