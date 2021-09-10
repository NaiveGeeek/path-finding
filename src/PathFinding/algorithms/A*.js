export const AStar = (grid, startNode, endNode) => {
  startNode.distance = 0;
  startNode.f = 0;
  const OpenList = heap((nodeA, nodeB) => {
    return nodeA.f - nodeB.f;
  }, []);
  OpenList.add(startNode);
  const ClosedList = new Set();
  while (!OpenList.empty()) {
    const node = OpenList.remove();
    node.isVisited = true;
    ClosedList.add(node);
    if (node === endNode) {
      return Array.from(ClosedList);
    }
    const neighbors = getAllNeighbors(node, grid);
    for (let i = 0; i < neighbors.length; i++) {
      const neighborNode = neighbors[i];
      if (ClosedList.has(neighborNode)) {
        continue;
      }
      if (neighborNode.isWall) {
        continue;
      }
      let x = neighborNode.row;
      let y = neighborNode.col;
      let ng = node.distance + 1;
      if (!neighborNode.isVisited || ng < neighborNode.distance) {
        neighborNode.distance = ng;
        neighborNode.h =
          Math.abs(x - endNode.row) + Math.abs(y - endNode.col);
        neighborNode.f = neighborNode.distance + neighborNode.h;
        neighborNode.previousNode = node;
        if (!neighborNode.isVisited) {
          OpenList.add(neighborNode);
          neighborNode.isVisited = true;
        } else {
          OpenList.update();
        }
      }
    }
  }
  return Array.from(ClosedList);
};



//this code is acting as priority Queue
function heap(compareFunction, array = []) {
  const data = array;
  const heapSort = ()=>{data.sort(compareFunction)};
  const add = function (node) {
    data.push(node);
    heapSort();
  };

  const remove = function () {
    const node = data.shift();
    return node;
  };

  const empty = function () {
    return data.length === 0;
  };
  const updateItems = function () {
    heapSort();
  };
  return {
    data: data,
    add: add,
    remove: remove,
    empty: empty,
    update: updateItems,
  };
}

function getAllNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors;
}
