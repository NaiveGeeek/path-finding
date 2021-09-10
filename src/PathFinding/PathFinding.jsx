import React, { Component } from "react";
import Grid from "./Grid/Grid";
import NavBar from "./Navbar/Navbar";
import { AStar } from "./algorithms/A*";
import { dijkstra } from "./algorithms/dijikstra";
import { ASTAR, DIJIKSTRA } from "./Utils/constant";

export default class PathFinding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAlgo: null,
    };
    this.grid = null;
  }

  registerGrid = (grid) => {
    this.grid = grid;
  };

  selectAlgo = (value = "") => {
    switch (value) {
      case ASTAR: {
        this.setState({
          selectedAlgo: AStar,
        });
        break;
      }
      case DIJIKSTRA: {
        this.setState({
          selectedAlgo: dijkstra,
        });
        break;
      }
      default:{
          break;
      }
    }
  };

  clearPath = () => {
    this.grid.clearPath();
  };

  clearGrid = () => {
    this.grid.clearGrid();
  };

  visualizeAlgo = () => {
    if (this.grid && this.state.selectedAlgo !== null) {
      this.grid.visualizeAlgo();
    } else {
      alert("Please Select Algo To visualize");
    }
  };

  render() {
    return (
      <>
        <NavBar
          clearBoard={this.clearGrid}
          clearPath={this.clearPath}
          changeAlgorithm={this.selectAlgo}
          visualizeAlgo={this.visualizeAlgo}
        />
        <Grid
          registerGrid={this.registerGrid}
          selectedAlgo={this.state.selectedAlgo}
        />
      </>
    );
  }
}
