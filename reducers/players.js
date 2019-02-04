const players = (state = [], action) => {
  switch (action.type) {
    case "CLEAR_ALL":
      return [];
    case "CLEAR_POINTS":
      return state.map(player => ({ name: player.name, points: 0 }));
    case "ADD_PLAYER":
      return state.concat({ name: action.name, points: 0 });
    case "ADD_POINTS":
      state[action.index].points =
        parseInt(state[action.index].points) + parseInt(action.points);
      return [].concat(state);
    case "REMOVE_PLAYER":
      state.splice(action.index, 1);
      return [].concat(state);
    default:
      return state;
  }
};

export default players;
