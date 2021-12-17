import React from 'react';
import './App.css';
import { StatPanel } from './components/StatPanel';

class App extends React.Component {

    computeScaledStat(baseStat: number, ev: number, iv: number, level: number): number {
        const evStat: number = Math.floor(ev / 4)
        const unscaledStat: number = 2 * baseStat + iv + evStat
        const scaledStat: number = Math.floor(unscaledStat * level / 100)
        return scaledStat
    }

    computeHPStat(baseStat: number, ev: number, iv: number, level: number): number {
        const hpStat: number = this.computeScaledStat(baseStat, ev, iv, level) + level + 10
        return hpStat
    }

    computeOtherStat(baseStat: number, ev: number, iv: number, level: number, natureMult: number): number {
        const otherStat: number = Math.floor((this.computeScaledStat(baseStat, ev, iv, level) + 5) * natureMult)
        return otherStat
    }

    render() {
        return (
            <div className="container">
                <div className="app">
                    <StatPanel statName="HP" baseStat={100} ev={0} iv={0} natureMult={1}/>
                    <StatPanel statName="Atk" baseStat={100} ev={0} iv={0} natureMult={1}/>
                </div>
            </div >
        )
    }
}

export default App;
