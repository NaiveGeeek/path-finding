import React, {PureComponent } from "react";
import "./Node.css";

export default class Node extends PureComponent {
  constructor(props){
   super(props);
   const{row,col,registerNode} = this.props;
   registerNode(row,col,this);
   this.state={
    isNodeVisited:false,
    isNodeInShortestPath: false, 
   }
  } 
 
  toggleNodeVisited=(value = false)=>{
    this.setState({
      isNodeVisited:value,
    });
  }
  toggleShortestPathNodeVisited = (value= false)=>{
    this.setState({
     isNodeInShortestPath:value,
    });
  }
  render() {
    const {
      col,
      isFinish,
      isStart,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row,
    } = this.props;
    // console.log(isFinish);
    const{isNodeInShortestPath,isNodeVisited} =this.state;
    const extraClassName = isFinish
      ? "node-finish"
      : isStart
      ? "node-start":"";
    const wallClass = isWall?"node-wall-fade-in":"node-wall-fade-out";
    const shortestPathClass = isNodeInShortestPath && !(isStart|| isFinish)?"node-shortest-path":"";
    const visitedPathClass = (isNodeVisited && !isNodeInShortestPath) && !(isStart|| isFinish)?"node-visited":"";

    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${extraClassName} ${wallClass} ${shortestPathClass} ${visitedPathClass}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      ></div>
    );
  }
}
