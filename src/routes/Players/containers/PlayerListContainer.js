import { connect } from 'react-redux'
import PlayerList from '../components/PlayerList'

const mapDispatchToProps = {}

const mapStateToProps = (state) => ({
  players: state.playersApp.players,
  loading: state.playersApp.loading,
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerList)
