import logo from './logo.svg';
import './App.css';
import DownTime from './Components/create-downtime.component';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className="App">
      <header className="App-header">
        <DownTime/>
      </header>
    </div>
    </LocalizationProvider>
  );
}

export default App;
