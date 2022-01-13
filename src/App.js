import './App.css';
import DefaultButton from './components/Button';
import CreateRoom from './pages/createRoom';
import MainPage from './pages/main/index';
import Participate from './pages/participate';
import PlayersScreen from './pages/players';

function App() {
  return (
    <div className='app'>
      {/* <MainPage /> */}
      {/* <CreateRoom /> */}
      {/* <Participate/> */}
      <PlayersScreen />
    </div>
  );
}

export default App;
