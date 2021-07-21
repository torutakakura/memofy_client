import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import ScheduleDetail from "./components/ScheduleDetail"
import ScheduleForm from "./components/ScheduleForm"
import Calendar from "./components/Calendar"


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/schedule/create" component={ScheduleForm} />
        <Route exact path="/schedule/detail" component={ScheduleDetail} />
        <Route exact path="/" component={Calendar} />
      </Switch>      
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

