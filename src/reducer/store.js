import { createStore , 
    combineReducers, 
    applyMiddleware
} from 'redux'
import dayoff from './Dayoff';
import thunk from 'redux-thunk';

const reducers = {
    dayoff,

} 
export const  store = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk)
);