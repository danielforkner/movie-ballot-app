<<<<<<< HEAD:src/components/App.js
import React, { useState } from 'react';
import { PollsContainer, AddPollForm } from '.';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
=======
import React, { useState } from "react";
import { PollsContainer, AddPollForm, SinglePoll } from "./components";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./index.css";
>>>>>>> 5e471edc7c325167b9d9c3ba0918c691b46458d0:src/App.js

const dummyData = {
  info: { length: 3 },
  data: [
    { id: 1, name: "movie night", pollType: "single" },
    { id: 2, name: "round robin", pollType: "double" },
    { id: 3, name: "movie", pollType: "triple" },
  ],
};

const App = () => {
  const [polls, setPolls] = useState(dummyData);

  return (
    <Router>
      <Link to="/">Home</Link>
      <Switch>
        <Route path="/">
          <AddPollForm />
        </Route>
      </Switch>
    </Router>
    // <Router>
    //   <Link to="/">Home</Link>
    //   <Routes>
    //     {/* <Route path="/singlePoll">
    //     <SinglePoll />
    //   </Route> */}
    //     <Route path="/">
    //       <div className="allPollsContainer">
    //         <AddPollForm setPolls={setPolls} polls={polls} />
    //         <PollsContainer setPolls={setPolls} polls={polls} />
    //       </div>
    //     </Route>
    //   </Routes>
    // </Router>
  );
};

export default App;
