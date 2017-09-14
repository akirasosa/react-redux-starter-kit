const PLAYERS_EDIT = 'PLAYERS_EDIT'
const PLAYERS_CANCEL_EDIT = 'PLAYERS_CANCEL_EDIT'
const PLAYERS_SAVE = 'PLAYERS_SAVE'
const PLAYERS_CHANGE_SCORE = 'PLAYERS_CHANGE_SCORE'
const PLAYERS_FETCH_REQUEST = 'PLAYERS_FETCH_REQUEST'
const PLAYERS_FETCH_SUCCESS = 'PLAYERS_FETCH_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------

export function editPlayer (id) {
  return {
    type: PLAYERS_EDIT,
    payload: id
  }
}

export function cancelEdit () {
  return {
    type: PLAYERS_CANCEL_EDIT,
  }
}

export function savePlayer () {
  // TODO save changes to server...
  return {
    type: PLAYERS_SAVE,
  }
}

export function changeScore (idx, score) {
  return {
    type: PLAYERS_CHANGE_SCORE,
    payload: { idx: idx, score: score }
  }
}

export const fetchPlayers = () => {
  return (dispatch, getState) => {
    dispatch({
      type: PLAYERS_FETCH_REQUEST,
    })
    return fetch('https://lyywnpoayb.execute-api.ap-northeast-1.amazonaws.com/staging/players')
      .then(res => res.json())
      .then(players => {
        const newPlayers = players.map(p => ({
          ...p,
          isEditing: false,
          scores: p.scores_day1 // FIXME
        }))
        dispatch({
          type: PLAYERS_FETCH_SUCCESS,
          payload: newPlayers,
        })
      })
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [PLAYERS_EDIT]: (state, action) => {
    const playerToEdit = state.players.find(p => p.id === action.payload)

    return {
      ...state,
      players: state.players.map(p => ({
        ...p,
        isEditing: p.id === action.payload
      })),
      playerEditing: { ...playerToEdit },
    }
  },
  [PLAYERS_CANCEL_EDIT]: (state, action) => {
    return {
      ...state,
      players: state.players.map(p => ({
        ...p,
        isEditing: false
      })),
      playerEditing: null,
    }
  },
  [PLAYERS_CHANGE_SCORE]: (state, action) => {
    const newScores = [...state.playerEditing.scores]
    newScores[action.payload.idx] = action.payload.score

    return {
      ...state,
      playerEditing: {
        ...state.playerEditing,
        scores: newScores,
      }
    }
  },
  [PLAYERS_SAVE]: (state, action) => {
    const players = [...state.players]
    const playerIdx = players.findIndex(p => p.id === state.playerEditing.id)
    players[playerIdx] = {
      ...state.playerEditing,
      isEditing: false
    }

    return {
      ...state,
      players: players,
      playerEditing: null,
    }
  },
  [PLAYERS_FETCH_REQUEST]: (state, action) => {
    return {
      ...state,
      loading: true,
    }
  },
  [PLAYERS_FETCH_SUCCESS]: (state, action) => {
    return {
      ...state,
      players: action.payload,
      loading: false,
    }
  },
}

// ------------------------------------
// Reducer
// ------------------------------------

const initialState = {
  players: [],
  loading: true,
  playerEditing: null,
}

export default function playersReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
