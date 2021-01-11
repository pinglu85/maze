import huntAndKill from './huntAndKill';
import recursiveBacktracker from './recursiveBacktracker';
import recursiveDivision from './recursiveDivision';
import growingTree from './growingTree';
import binaryTree from './binaryTree';
import randomizedKruskalsAlgo from './randomizedKruskalsAlgo';
import aldousBroderAlgo from './aldousBroderAlgo';
import openGrid from './openGrid';
import dijkstrasAlgo from './dijkstrasAlgo';
import aStarSearch from './aStarSearch';

const algosDescriptions = {
  // Maze algorithms
  'Hunt-and-Kill': huntAndKill,
  'Recursive Backtracker': recursiveBacktracker,
  'Recursive Division': recursiveDivision,
  'Growing Tree (random)': growingTree,
  'Growing Tree (last)': growingTree,
  'Growing Tree (mix)': growingTree,
  'Binary Tree': binaryTree,
  "Randomized Kruskal's Algorithm": randomizedKruskalsAlgo,
  'Aldous-Broder Algorithm': aldousBroderAlgo,

  'Open Grid': openGrid,

  // Pathfinding algorithms
  "Dijkstra's Algorithm": dijkstrasAlgo,
  'A* Search': aStarSearch,
};

export default algosDescriptions;
