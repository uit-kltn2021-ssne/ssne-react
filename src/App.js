import './App.css';
// import Login from './containers/Login/Login.js';
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

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <div className="App">
            <Route exact path="/" component={Login} />
            <Route exact path="/dashboard"><LayoutWeb /></Route>
            <Route exact path="/calendar" component={CalendarWeb} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/colleague" component={TableColleague} />
            <Route exact path="/dayoff" component={DayOff} />
          </div>
        </Switch>
      </Provider>
    </Router>
  );
}
export default App;
