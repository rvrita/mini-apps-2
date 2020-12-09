export const NEW_GAME = 'NEW_GAME';

var newGame = (boardParams) => ({
  type: NEW_GAME,
  payload: boardParams,
});

export default newGame;