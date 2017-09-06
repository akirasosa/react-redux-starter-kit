import React, { PropTypes } from 'react'

const RefreshBtn = ({ loading, fetchPlayers }) => (
  <button disabled={loading} onClick={fetchPlayers}>Refresh</button>
)

RefreshBtn.propTypes = {
  loading: PropTypes.bool.isRequired,
  fetchPlayers: PropTypes.func.isRequired,
}

export default RefreshBtn
