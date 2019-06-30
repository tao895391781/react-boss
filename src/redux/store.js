import {createStore,applyMiddleware} from 'redux'
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
const composeEnhancers = composeWithDevTools({});
  const store = createStore(myPersistReducer, composeEnhancers(
    applyMiddleware(thunk),
  ));
export const persistor = persistStore(store)
export default store;