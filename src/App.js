import './App.css';
import { LandingPage } from './component/langinPage/landingpage';
import Staking from './component/staking/Staking';
import ErrorBoundry from './containers/ErrorBoundry/ErrorBoundry';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PageNotFound from './containers/ErrorBoundry/pagenotfound/PageNotFound';
import { LaunchPad } from './component/launchpad/launchPad';
import { Provider, useSelector } from 'react-redux';
import { Store } from './redux/store';

function App() {
  // const location = useLocation();
  // console.log(location.pathname, 'rout');
  const Routing = () => {
    return (
      <Router>
        <ErrorBoundry>
          <Switch>
            {/* <Route exact path="/staking" component={Staking} /> */}
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

        <Provider store={Store}>
          <Routing></Routing>

        </Provider>
        {/* </ErrorBoundry> */}
      </header>
    </div >
  );
}

export default App;
