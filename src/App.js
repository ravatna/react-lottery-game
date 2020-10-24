import React from 'react';

import './App.css';
import Lottery from './components/Lottery';

const App = () => {
    return (
        <div className="App">
            {/* <Lottery /> */}
            {/* <Lottery title="Mini Daily" maxNum={25} numBalls={4} /> */}
            <Lottery title="Lotto Max" maxNum={50} numBalls={7} />
            <Lottery title="Lotto 649" maxNum={49} numBalls={6} />
        </div>
    );
};

export default App;
