import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

import Uploader from "./components/Uploader";
import Merger from "./components/Merger";
import PhotosDisplay from "./components/PhotosDisplay";
import { ButtonGroup } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import Sorter from "./components/Sorter";

const HTML5Backend = require("react-dnd-html5-backend").HTML5Backend;
const DndProvider = require("react-dnd").DndProvider;

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    console.log(photos);
  }, [photos]);

  let progressBar = "";
  if (progress > 0)
    progressBar = <LinearProgress variant="determinate" value={progress} />;

  return (
    <>
      {progressBar}
      <br />
      <Sorter setPhotos={setPhotos}></Sorter>
      <DndProvider backend={HTML5Backend}>
        <PhotosDisplay setPhotos={setPhotos} photos={photos}></PhotosDisplay>
      </DndProvider>

      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="contained primary button group"
      >
        <Uploader setPhotos={setPhotos}></Uploader>
        <Merger photos={photos} setProgress={setProgress}></Merger>
      </ButtonGroup>
    </>
  );
}
