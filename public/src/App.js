import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import LayoutWeb from './containers/Dashboard/DashboardLayout.js'
import CalendarWeb from './containers/Calendar/CalendarLayout.js';
import Login from './containers/Login/Login.js';
import Profile from './containers/ProfileLayout/Profile.js';
import TableColleague from './containers/Colleague/ColleagueLayout.js'
import DayOff from './containers/Dayoff/Dayoff';
import { Provider } from 'react-redux';
import { store } from './reducer/store';
import DefaultLayout from './containers/Layout/index.js';
import { getToken } from './utils/AuthUtils';
import Task from './containers/Tasks/Task';
import FAQ from './containers/FAQ/FAQ';
import { createBrowserHistory } from "history";
import Article from './containers/Articles/Article';
import Support from './containers/Supports/Support';
import SupportReply from './containers/SupportReplies/SupportReply';
import CheckList from './containers/ChecklistItems/ChecklistItem';
import BlogDetail from './containers/Articles/BlogDetail';

function App() {
  const token = getToken();
  const history = createBrowserHistory();
  return (

    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <div className="App">
            {!token &&
              <>
                <Route exact path="/" component={Login} />
                <Route exact path="/login" component={Login} />
              </>
            }
            {token &&
              <DefaultLayout>
                <Route exact path="/dashboard" component={LayoutWeb} />
                <Route exact path="/" component={LayoutWeb} />
                <Route exact path="/calendar" component={CalendarWeb} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/colleague" component={TableColleague} />
                <Route exact path="/dayoffs" component={DayOff} />
                <Route exact path="/tasks" component={Task} />
                <Route exact path="/faqs" component={FAQ} />
                <Route exact path="/article" component={Article} />
                <Route
                  exact
                  path="/article/:id"
                  component={BlogDetail}
                />
                <Route exact path="/support" component={Support} />
                <Route exact path="/checklist" component={CheckList} />
                <Route exact path="/support-reply" component={SupportReply} />
              </DefaultLayout>}
          </div>
        </Switch>
      </Router>
    </Provider>

  );
}
export default App;
