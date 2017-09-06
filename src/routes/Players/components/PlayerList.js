import React, { PropTypes } from 'react'
import Player from './Player'

const PlayerList = ({ players }) => (
  <ul>
    {players.map(p =>
      <Player
        key={p.id}
        {...p}
      />
    )}
  </ul>
)

PlayerList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired).isRequired,
}

export default PlayerList
