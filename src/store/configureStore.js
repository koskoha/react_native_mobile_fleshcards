import {createStore, applyMiddleware, compose} from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage  } from 'react-native';
import { createLogger } from 'redux-logger'

import reducers from '../reducers/rootReducer';

export default function configureStore()  {
  const loggerMiddleware = createLogger()
  return new Promise((resolve, reject) => {
    try {
      const store = createStore(
        reducers,
        undefined,
        compose(
          autoRehydrate(),
          applyMiddleware(loggerMiddleware),
        ),
      );

      persistStore(
        store,
        { storage: AsyncStorage },
        () => resolve(store)
      )
      // .purge();
    } catch (e) {
      reject(e);
    }
  });
}