import { createStore , 
    combineReducers, 
    applyMiddleware
} from 'redux'
import dayoffs from './Dayoff';
import employees from './Employee';
import tasks from './Task'
import faq from './Faq'
import thunk from 'redux-thunk';

const reducers = {
    dayoffs,
    employees,
    tasks,
    faq,
} 
export const  store = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk)
);