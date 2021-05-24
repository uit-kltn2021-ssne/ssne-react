import './App.css';
// import Login from './containers/Login/Login.js';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";
import LayoutWeb from './containers/Dashboard/DashboardLayout.js'
import CalendarWeb from './containers/Calendar/CalendarLayout.js';
import Login from './containers/Login/Login.js';
import Profile from './containers/ProfileLayout/Profile.js';
import TableColleague from './containers/Colleague/ColleagueLayout.js'
function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          {/* <Route path="/">
            <Redirect to="/login" />
          </Route> */}
          <Route exact path="/dashboard" component={LayoutWeb} />
          <Route exact path="/calendar" component={CalendarWeb} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/colleague" component={TableColleague} />
        </div>
      </Switch>
    </Router>
  );
}
export default App;
