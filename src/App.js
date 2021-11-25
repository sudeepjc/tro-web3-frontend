import './App.css';
import { LandingPage } from './component/langinPage/landingpage';
import ErrorBoundry from './containers/ErrorBoundry/ErrorBoundry';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageNotFound from './containers/ErrorBoundry/pagenotfound/PageNotFound';
import { LaunchPad } from './component/launchpad/launchPad';
import { Provider } from 'react-redux';
import { Store } from './redux/store';

function App() {

  const Routing = () => {
    return (
      <Router>
        <ErrorBoundry>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/launchpad" component={LaunchPad} />
            <Route exact path="*" component={PageNotFound} />
          </Switch>
        </ErrorBoundry>
      </Router>
    )
  }
  return (
    <div className="App">
      <header className="App-header">
        <Provider store={Store}>
          <Routing></Routing>
        </Provider>
      </header>
      {/* <div className="t-and-c">
        © Trodl.com 2021-22. All rights reserved.
            </div> */}
    </div >
  );
}

export default App;
