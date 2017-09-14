import { injectReducer } from '../../store/reducers'
import { fetchPlayers } from './modules/players'

export default (store) => ({
  path: 'players',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const PlayersView = require('./components/PlayersView').default
      const reducer = require('./modules/players').default

      injectReducer(store, { key: 'playersApp', reducer })

      fetchPlayers()(store.dispatch)
        // If you want to wait for getting data to show page.
        // .then(() => cb(null, PlayersView))

      cb(null, PlayersView)
    }, 'players')
  }
})
