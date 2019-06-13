import { createStore, applyMiddleware, AnyAction, Store  } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducer/rootReducer';

import { ThunkDispatch } from 'redux-thunk';

export default function configureStore() {
    return  createStore(
        rootReducer,
        applyMiddleware(thunk)
    );
}
