import {createStore,applyMiddleware,compose} from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import {persistStore,persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
// redux持久化---（相当于sessionStorage，刷新数据不消失）
const persistConfig = {
    key:'root',
    storage,
    stateReconciler:autoMergeLevel2
};
const myPersistReducer = persistReducer(persistConfig,reducers);
const reduxTools =  window.devToolsExtension ? window.devToolsExtension():()=>{}


const composeEnhancers = composeWithDevTools({
    // options like actionSanitizer, stateSanitizer
  });
  const store = createStore(myPersistReducer, composeEnhancers(
    applyMiddleware(thunk),
    // other store enhancers if any
  ));
// const store = createStore(
//     myPersistReducer,
//     compose(applyMiddleware(thunk), reduxTools),
//     )
export const persistor = persistStore(store)
export default store;