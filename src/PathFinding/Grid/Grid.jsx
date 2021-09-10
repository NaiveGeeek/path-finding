import React, { Component } from "react";
import { getNodesInShortestPathOrder } from "../algorithms/dijikstra";
import Node from "../Node/Node";
import "./Grid.css";
const ROWS = 20;
const COLUMNS = 50;
export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
    };
    this.startNode = { row: 10, column: 5 };
    this.destinationNode = { row: 10, column: 45 };
    this.createNode = this.createNode.bind(this);
    this.mouseDown = false;
    this.mouseMove = false;
    this.mouseUp = true;
    this.isMovingStartNode = false;
    this.isMovingDestinationNode = false;
    this.isCreatingWall = false;
    this.canDraw = true;
    this.shortestPathGenerated = false;
    this.visitedNodesInOrder = [];
    this.nodesInShortestPathOrder = [];
    // Todo  once basic application is running
    this.isMultipleDestinationAvailable = false;
    this.listOfMultipleDestination = [];
    this.props.registerGrid(this);
  }

  createNode(row, column, node = {}) {
    // console.log(node.isStartNode);
    const isStartNode =
      this.startNode.row === row && this.startNode.column === column;
    const isDestinationNode =
      this.destinationNode.row === row &&
      this.destinationNode.column === column;
    return {
      ...node,
      row: row,
      col: column,
      isStartNode: isStartNode,
      isDestinationNode: isDestinationNode,
      isVisited: false,
      isWall:
        isStartNode || isDestinationNode
          ? false
          : node.isWall
          ? node.isWall
          : false,
      distance: Infinity,
      previousNode: null,
    };
  }

  registerNode = (row, col, node) => {
    const { grid } = this.state;
    grid[row][col] = { ...grid[row][col], nodeClass: node };
  };

  clearPath = () => {
    this.toggleVisitedAndShortestPathNode(false, false);
    this.shortestPathGenerated = false;
  };

  clearGrid = () => {
    // create New Grid
    const newGrid = [];
    const { grid } = this.state;
    for (let i = 0; i < ROWS; i++) {
      const Rows = [];
      for (let j = 0; j < COLUMNS; j++) {
        Rows.push({
          ...grid[i][j],
          isWall: false,
          isVisited: false,
          previousNode: null,
          distance: Infinity,
        });
      }
      newGrid.push(Rows);
    }
    this.setGrid(newGrid);
    this.clearPath();
  };

  clearWall = () => {
    this.clearGrid();
  };

  setGrid = (newGrid) => {
    this.setState({
      grid: newGrid,
    });
  };

  handleMouseDown = (row, col) => {
    if (this.canDraw) {
      this.mouseDown = true;
      if (row === this.startNode.row && this.startNode.column === col) {
        this.isMovingStartNode = true;
      } else if (
        row === this.destinationNode.row &&
        this.destinationNode.column === col
      ) {
        this.isMovingDestinationNode = true;
      } else {
        this.isCreatingWall = true;
        const newGrid = this.upadteGridWithNewInfo(row, col);
        this.setGrid(newGrid);
      }
    }
  };

  handleMouseEnter = (row, col) => {
    if (this.mouseDown && this.canDraw) {
      this.mouseMove = true;
      if (this.isMovingStartNode) {
        this.startNode =
          this.destinationNode.row === row &&
          this.destinationNode.column === col
            ? this.startNode
            : { row: row, column: col };
        const newGrid = this.createNewNodeList();
        this.setGrid(newGrid);
      } else if (this.isMovingDestinationNode) {
        this.destinationNode =
          this.startNode.row === row && this.startNode.column === col
            ? this.destinationNode
            : { row: row, column: col };
        const newGrid = this.createNewNodeList();
        this.setGrid(newGrid);
      } else {
        const newGrid = this.upadteGridWithNewInfo(row, col);
        this.setGrid(newGrid);
      }
    }
  };
  componentDidUpdate() {
    if (this.shortestPathGenerated) {
      this.updategridWhileMovingoneOfTarget();
    }
  }

  updategridWhileMovingoneOfTarget = () => {
    const { selectedAlgo } = this.props;
    this.toggleVisitedAndShortestPathNode(false, false);
    const { grid } = this.state;
    const startNode = grid[this.startNode.row][this.startNode.column];
    const endNode = grid[this.destinationNode.row][this.destinationNode.column];
    this.visitedNodesInOrder = selectedAlgo(grid, startNode, endNode);
    this.nodesInShortestPathOrder = getNodesInShortestPathOrder(endNode);
    this.toggleVisitedAndShortestPathNode(true, true);
  };

  handleMouseUp = () => {
    this.mouseDown = false;
    this.mouseMove = false;
    this.isMovingStartNode = false;
    this.isMovingDestinationNode = false;
    this.isCreatingWall = false;
  };

  upadteGridWithNewInfo = (row, col) => {
    const { grid } = this.state;
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: node.isDestinationNode || node.isStartNode ? false : !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  componentDidMount() {
    const newGrid = this.createNewNodeList();
    this.setState({
      grid: newGrid,
    });
  }
  createNewNodeList = () => {
    const newGrid = [];
    const { grid } = this.state;
    for (let i = 0; i < ROWS; i++) {
      const columns = [];
      for (let j = 0; j < COLUMNS; j++) {
        columns.push(this.createNode(i, j, grid[i] ? grid[i][j] : {}));
      }
      newGrid.push(columns);
    }
    return newGrid;
  };

  animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        node.nodeClass.toggleNodeVisited(node.isVisited);
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        node.nodeClass.toggleShortestPathNodeVisited(node.isVisited);
        if (i === nodesInShortestPathOrder.length - 1) {
          this.shortestPathGenerated = true;
        }
      }, 50 * i);
    }
  }

  visualizeAlgo() {
    this.clearPath();
    const { grid } = this.state;
    const { selectedAlgo } = this.props;
    const startNode = grid[this.startNode.row][this.startNode.column];
    const finishNode =
      grid[this.destinationNode.row][this.destinationNode.column];
    this.visitedNodesInOrder = selectedAlgo(grid, startNode, finishNode);
    this.nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateAlgo(this.visitedNodesInOrder, this.nodesInShortestPathOrder);
  }
  toggleVisitedAndShortestPathNode = (valVisited, valShortest) => {
    this.visitedNodesInOrder = this.visitedNodesInOrder.map((el) => {
      el.nodeClass.toggleNodeVisited(valVisited);
      el.isVisited = false;
      return el;
    });
    this.nodesInShortestPathOrder = this.nodesInShortestPathOrder.map((el) => {
      el.nodeClass.toggleShortestPathNodeVisited(valShortest);
      return el;
    });
  };

  render() {
    const { grid } = this.state;
    return (
      <>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col, isStartNode, isDestinationNode, isWall } =
                    node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isDestinationNode}
                      isStart={isStartNode}
                      isWall={isWall}
                      onMouseDown={this.handleMouseDown}
                      onMouseEnter={this.handleMouseEnter}
                      onMouseUp={this.handleMouseUp}
                      row={row}
                      registerNode={this.registerNode}
                    ></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
