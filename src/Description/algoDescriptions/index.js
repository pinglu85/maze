import { MAZE_ALGO_IDS, PATHFINDING_ALGO_IDS } from '../../constants/algoIds';
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

const algosDescriptions = new Map([
  // Maze algorithms
  [MAZE_ALGO_IDS.huntAndKill, huntAndKill],
  [MAZE_ALGO_IDS.recursiveBacktracker, recursiveBacktracker],
  [MAZE_ALGO_IDS.recursiveDivision, recursiveDivision],
  [MAZE_ALGO_IDS.growingTreeRandom, growingTree],
  [MAZE_ALGO_IDS.growingTreeLast, growingTree],
  [MAZE_ALGO_IDS.growingTreeMix, growingTree],
  [MAZE_ALGO_IDS.binaryTree, binaryTree],
  [MAZE_ALGO_IDS.randomizedKruskalsAlgo, randomizedKruskalsAlgo],
  [MAZE_ALGO_IDS.aldousBroderAlgo, aldousBroderAlgo],
  [MAZE_ALGO_IDS.openGrid, openGrid],

  // Pathfinding algorithms
  [PATHFINDING_ALGO_IDS.dijkstrasAlgo, dijkstrasAlgo],
  [PATHFINDING_ALGO_IDS.aStarSearch, aStarSearch],
]);

export default algosDescriptions;
