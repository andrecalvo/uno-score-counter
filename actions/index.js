export const addPlayer = name => ({
  type: "ADD_PLAYER",
  name
});

export const removePlayer = index => ({
  type: "REMOVE_PLAYER",
  index
});

export const addPoints = (index, points) => ({
  type: "ADD_POINTS",
  index,
  points
});

export const clearAll = () => ({
  type: "CLEAR_ALL"
});

export const clearPoints = () => ({
  type: "CLEAR_POINTS"
});
