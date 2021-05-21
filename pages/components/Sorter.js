import { MenuItem, Select, InputLabel } from "@material-ui/core";
import { useState } from "react";

export default function Sorter({ setPhotos }) {
  const [sorting, setSorting] = useState("0");

  const select = (e) => {
    const new_sorting = e.target.value;
    setSorting(new_sorting);
    setPhotos((prev) => {
      return [...prev].sort((a, b) => {
        if (new_sorting == "1") {
          return a.lastModified - b.lastModified;
        } else if (new_sorting == "2") {
          return b.lastModified - a.lastModified;
        } else if (new_sorting == "3") {
          return a.name.localeCompare(b.name);
        } else if (new_sorting == "4") {
          return b.name.localeCompare(a.name);
        }
        return a;
      });
    });
  };

  return (
    <>
      <InputLabel id="label">Sorting</InputLabel>
      <Select labelId="label" id="select" value={sorting} onChange={select}>
        <MenuItem value="0">Custom</MenuItem>
        <MenuItem value="1">Oldest first</MenuItem>
        <MenuItem value="2">Newest first</MenuItem>
        <MenuItem value="3">A-Z</MenuItem>
        <MenuItem value="4">Z-A</MenuItem>
      </Select>
    </>
  );
}
