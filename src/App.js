import './App.css';
import Customerlist from './Components/Customerlist';
import AppBar from '@material-ui/core/AppBar';
import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Traininglist from './Components/Traininglist';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import EventIcon from '@material-ui/icons/Event';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import TrainingCalendar from './Components/TrainingCalendar';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Statistics from './Components/Statistics';

function App() {

  const [value, setValue] = useState('one');

  const handleChange = (event, value) => {
    setValue(value);
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab icon={<AccountBoxIcon />} value="one" label="Customers" />
          <Tab icon={<DirectionsRunIcon />} value="two" label="Trainings" />
          <Tab icon={<EventIcon />} value="three" label="Calendar"/>
          <Tab icon={<EqualizerIcon />} value="four" label="Statistics"/>
        </Tabs>
      </AppBar>
        {value === 'one' && <Customerlist />}
        {value === 'two' && <Traininglist />}
        {value === 'three' && <TrainingCalendar />}
        {value === 'four' && <Statistics />}
    </div>
  );
}

export default App;
