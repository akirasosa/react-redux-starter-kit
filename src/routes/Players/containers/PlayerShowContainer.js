import { connect } from 'react-redux'
import { editPlayer } from '../modules/players'
import PlayerShow from '../components/PlayerShow'

const mapDispatchToProps = dispatch => {
  return {
    editPlayer: id => {
      dispatch(editPlayer(id))
    },
  }
}

const mapStateToProps = (state) => ({
  player: state.playersApp.playerEditing,
})

export default connect(mapStateToProps, mapDispatchToProps)(PlayerShow)
