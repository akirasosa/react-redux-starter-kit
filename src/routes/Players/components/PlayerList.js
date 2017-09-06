import React, { PropTypes } from 'react'
import PlayerEditContainer from '../containers/PlayerEditContainer'
import PlayerShowContainer from '../containers/PlayerShowContainer'

function Player (props) {
  if (props.isEditing) {
    return <PlayerEditContainer />
  }
  return <PlayerShowContainer {...props} />
}

const PlayerList = ({ players }) => (
  <div>
    {players.map(p =>
      <Player key={p.id} {...p} />
    )}
  </div>
)

PlayerList.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired).isRequired,
}

Player.propTypes = {
  isEditing: PropTypes.bool.isRequired,
}

export default PlayerList
