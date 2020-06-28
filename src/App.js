import React from "react";
import Global from "./styles/global";
import Home from "./pages/Home/Home";
import {DisplayMapClass} from './DisplayMapClass';
import {Autocomplete} from './utils/Autocomplete';

const lorem =
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, sed iure blanditiis voluptatum nulla quidem minus quam tempora obcaecati necessitatibus inventore! Vitae totam quam pariatur facilis fugit maxime adipisci eaque.";
 
const data = [
  {
    id: Math.random(),
    title: "Box titulo 1",
    text: lorem,
    bgColor: "#D5CAFA"
  },
  {
    id: Math.random(),
    title: "Box titulo 2",
    text: lorem,
    bgColor: "#EDA9A9"
  },
  {
    id: Math.random(),
    title: "Box titulo 3",
    text: lorem,
    bgColor: "#F2EE8D"
  },
  {
    id: Math.random(),
    title: "Box titulo 4",
    text: lorem,
    bgColor: "#9FEACD"
  }
];

function App() {
  return (
    <>
      <Global />
      <Autocomplete
        suggestions={[
          "Alligator",
          "Bask",
          "Crocodilian",
          "Death Roll",
          "Eggs",
          "Jaws",
          "Reptile",
          "Solitary",
          "Tail",
          "Wetlands"
        ]}
        id="autocompleteSearch"
        className="autocomplete"
      />
      <DisplayMapClass />
      <Home boxData={data} />
    </>
  );
}

export default App;