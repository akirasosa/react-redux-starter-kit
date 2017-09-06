import React, { PropTypes } from 'react'

const Player = ({ name, scores }) => (
  <li>{name} {scores}</li>
)

Player.propTypes = {
  name: PropTypes.string.isRequired,
  scores: PropTypes.array.isRequired
}

export default Player
