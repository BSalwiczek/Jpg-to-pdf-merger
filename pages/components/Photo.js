import { Button } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const MAX_WIDTH = 1024;
const MAX_HEIGHT = 1024;

const resizeImage = (img) => {
  let canvas = document.createElement("canvas");

  let width = img.width;
  let height = img.height;

  console.log(width);
  console.log(height);

  if (width > MAX_WIDTH) {
    let resize_factor = MAX_WIDTH / width;
    width = MAX_WIDTH;
    height = height * resize_factor;
  }
  if (height > MAX_HEIGHT) {
    let resize_factor = MAX_HEIGHT / height;
    height = MAX_HEIGHT;
    width = width * resize_factor;
  }
  canvas.width = width;
  canvas.height = height;

  let ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);

  return ctx.canvas.toDataURL(img, "image/jpeg", 0);
};

export default function Photo({ photo, setPhotos, index, moveImage }) {
  const imageRef = useRef(null);
  const imageContRef = useRef(null);

  useEffect(() => {
    // imageRef.current.src = "";

    let img = new Image();
    let objectUrl = URL.createObjectURL(photo.photo);

    img.onload = () => {
      let src = resizeImage(img);
      imageRef.current.src = src;

      URL.revokeObjectURL(objectUrl);

      setPhotos((prev) => {
        return [...prev].map((el) => {
          if (el.id == photo.id) {
            return { ...el, src, photo: undefined };
          }
          return el;
        });
      });
    };

    img.src = objectUrl;
  }, []);

  const [, drop] = useDrop({
    accept: "Photo",
    hover(item) {
      if (!imageContRef.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex == hoverIndex) return;

      moveImage(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "Photo",
    id: photo.id,
    index,
    item: {
      type: "Photo",
      id: photo.id,
      index,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(imageContRef));

  const remove = () => {
    setPhotos((prev) => prev.filter((el) => el.id !== photo.id));
  };

  return (
    <div
      style={{ opacity: isDragging ? 0 : 1 }}
      className="photo"
      ref={imageContRef}
    >
      <img ref={imageRef} />
      <Button
        variant="contained"
        color="secondary"
        className="remove"
        onClick={remove}
      >
        <CancelIcon></CancelIcon>
      </Button>
    </div>
  );
}
