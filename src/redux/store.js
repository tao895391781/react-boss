import {createStore,applyMiddleware,compose} from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
// import {composeWithDevTools} from 'redux-devtools-extension'
const reduxTools =  window.devToolsExtension() ? window.devToolsExtension():()=>{}
const store = createStore(
    reducers,
    compose(applyMiddleware(thunk), reduxTools),
    )
export default store;