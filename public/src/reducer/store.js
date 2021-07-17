import { createStore , 
    combineReducers, 
    applyMiddleware
} from 'redux'
import dayoffs from './Dayoff';
import employees from './Employee';
import tasks from './Task'
import faq from './Faq'
import articles from "./Articles"
import support from "./Support"
import supportreply from "./SupportReply"
import department from "./Department"
import checkitem from './ChecklistItems';
import thunk from 'redux-thunk';

const reducers = {
    dayoffs,
    employees,
    tasks,
    faq,
    articles,
    support,
    supportreply,
    department,
    checkitem
} 
export const  store = createStore(
    combineReducers(reducers),
    applyMiddleware(thunk)
);