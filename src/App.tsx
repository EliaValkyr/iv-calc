import React from 'react';
import './App.css';
import { AllBaseStatsPanel } from './components/AllBaseStatsPanel';
import { PokemonMainInfoPanel } from './components/PokemonMainInfoPanel';

interface AppProps {

}

interface AppState {
    level: number,
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)

        this.state = {level: 70}
    }

    render() {
        const levelChanged = (levelValue: number) => {
            const sanitizedlevelValue = Math.max(0, Math.min(levelValue, 100))
            this.setState({level: sanitizedlevelValue})
        }

        return (
            <div className="container">
                <div className="app">
                    <PokemonMainInfoPanel level={this.state.level} onLevelChanged={levelChanged}/>
                    <AllBaseStatsPanel level={this.state.level}/>
                </div>
            </div >
        )
    }
}

export default App;
