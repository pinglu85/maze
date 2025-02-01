# Maze Generator & Solver Visualizer

This is a web application built with JavaScript, JSX and HTML5 Canvas API, designed to visualize maze generation and pathfinding algorithms. I built this application out of fascination with these algorithms and as an opportunity to improve my frontend development skills, deepen my understanding of frontend concepts, and experiment with custom implementations. You can access it here: https://pinglu85.github.io/maze/

## Implementation Details

- Canvas-Based Rendering: Utilizes the HTML5 Canvas API to visualize both maze generation and pathfinding algorithms.

- Custom State Management: Implements a Redux-like state management system to handle application state.

- JSX Support: Supports JSX by implementing custom functions to create DOM elements.

- User-Centric Design: Iteratively refined the user interface in Figma based on feedback from usability testing. This process addressed user confusion and resulted in a more user-friendly interface.

- Responsive Design: While primarily designed for desktop, the web app is optimized to display properly on mobile devices.

## Maze Algorithms

This application includes the following maze algorithms:

- **Hunt-and-Kill**: Produces mazes that have long, twisty passages and relatively few dead ends.

- **Recursive Backtracker**: Produces mazes that have long, twisty passages and relatively few dead ends; much faster than Hunt-and-Kill.

- **Recursive Division**: A fast algorithm that builds walls rather than breaking through them.

- **Growing Tree**: Depends heavily on how the next cell is selected from the set.

- **Binary Tree**: Produces mazes that have a very biased texture.

- **Randomized Kruskal's Algorithm**: Produces very regular, uniform mazes; largely unbiased.

- **Aldous-Broder Algorithm**: One of the least efficient maze algorithms, but unbiased.

## Pathfinding Algorithms

This application includes the following pathfinding algorithms:

- **Dijkstra's Algorithm**: The classic pathfinding algorithm that guarantees the shortest path.

- **A\* Search**: One of the best pathfinding algorithms; uses heuristics to guarantee the shortest path and is much faster than Dijkstra's Algorithm.

## Reference

Buck, James (2015). _Mazes for Programmers_. Pragmatic Bookshelf.

## To-dos

- [ ] Implement the ability to play, pause, cancel, or manually step through the maze generation and pathfinding algorithms using generators.
- [ ] Make the visualization speed adjustable by the user.
- [ ] Add dark mode.
