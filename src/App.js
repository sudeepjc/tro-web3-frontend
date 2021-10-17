import './App.css';
import { Staking } from './component/staking/Staking';
import ErrorBoundry from './containers/ErrorBoundry/ErrorBoundry';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ErrorBoundry>
          <Staking></Staking>
        </ErrorBoundry>
      </header>
    </div>
  );
}

export default App;
