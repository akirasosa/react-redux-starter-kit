const PLAYERS_FETCH_REQUEST = 'PLAYERS_FETCH_REQUEST'
const PLAYERS_FETCH_SUCCESS = 'PLAYERS_FETCH_SUCCESS'

export const fetchPlayers = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch({
        type: PLAYERS_FETCH_REQUEST,
      })
      setTimeout(() => {
        // TODO get newPlayers from API
        const newPlayers = getState().playersApp.players.map(p => {
          return {
            ...p,
            scores: randomScores()
          }
        })
        dispatch({
          type: PLAYERS_FETCH_SUCCESS,
          payload: newPlayers,
        })
        resolve()
      }, 1000)
    })
  }
}

function randomScores () {
  return Array(18).fill().map(_ => Math.floor(Math.random() * (8 - 3) + 3))
}

const initialState = {
  players: [
    {
      id: '1',
      name: 'Test1',
      scores: randomScores(),
    },
    {
      id: '2',
      name: 'Test2',
      scores: randomScores(),
    },
  ],
  loading: false,
}

const playersReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAYERS_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case PLAYERS_FETCH_SUCCESS:
      return {
        players: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export default playersReducer
