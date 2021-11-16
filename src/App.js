import './App.css';
import { LandingPage } from './component/langinPage/landingpage';
import Staking from './component/staking/Staking';
import ErrorBoundry from './containers/ErrorBoundry/ErrorBoundry';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageNotFound from './containers/ErrorBoundry/pagenotfound/PageNotFound';
import { LaunchPad } from './component/launchpad/launchPad';
import { useLocation } from 'react-router-dom'
function App() {
  // const location = useLocation();
  // console.log(location.pathname, 'rout');
  const Routing = () => {
    return (
      <Router>
        <ErrorBoundry>
          <Switch>
            <Route exact path="/staking" component={Staking} />
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/launchpad" component={LaunchPad} />
            <Route exact path="*" component={PageNotFound} />
          </Switch>
        </ErrorBoundry>

        {/* <Footer/> */}
      </Router>
    )
  }
  return (
    <div className="App">
      <header className="App-header">
        {/* <Staking></Staking> */}
        <Routing></Routing>
        {/* </ErrorBoundry> */}
      </header>
    </div >
  );
}

export default App;
