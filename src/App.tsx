import React from 'react';
import './App.css';
import { StatPanel } from './components/StatPanel';
import { StatType } from './enums/StatType';

class App extends React.Component {
    render() {
        const level = 70
        return (
            <div className="container">
                <div className="app">
                    <StatPanel statType={StatType.HP} baseStat={100} level={level} natureMult={1}/>
                    <StatPanel statType={StatType.Attack} baseStat={100} level={level} natureMult={1}/>
                    <StatPanel statType={StatType.Defence} baseStat={100} level={level} natureMult={1}/>
                    <StatPanel statType={StatType.SpAttack} baseStat={100} level={level} natureMult={1}/>
                    <StatPanel statType={StatType.SpDefence} baseStat={100} level={level} natureMult={1}/>
                    <StatPanel statType={StatType.Speed} baseStat={100} level={level} natureMult={1}/>
                </div>
            </div >
        )
    }
}

export default App;
