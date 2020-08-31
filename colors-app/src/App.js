import React from 'react';
import { Route, Switch } from "react-router-dom";
import Palette from './Palette'
import seedColors from './seedColors'
import PaletteList from './PaletteList'
import './App.css'
import { generatePalette } from "./colorHelper";


function App() {
  const findPalette = (id) => {
    return seedColors.find((palette) => {
      //return the first object in the array
      return palette.id === id
    })
  }
  return (
    <Switch>
      <Route exact path='/' render={(routeProps) => <PaletteList
        palettes={seedColors}
        {...routeProps}
      />} />
      <Route
        exact
        path='/palette/:id'
        render={(routeProps) => <Palette
          palette={generatePalette(
            findPalette(routeProps.match.params.id)
          )} />}
      />

      <Route
        exact
        path='/palette/:paletteId/:colorId'
        render={() => <h1>ok</h1>}
      />
    </Switch>
    // <div className="App">
    //   <Palette palette={generatePalette(seedColors[4])} />
    // </div>
  );
}

export default App;
