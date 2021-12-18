import React from 'react';
import './App.css';
import { AllBaseStatsPanel } from './components/AllBaseStatsPanel';
import { PokemonMainInfoPanel } from './components/PokemonMainInfoPanel';
import { MAX_LEVEL } from './constants';
import data from './PokemonData.json'
import { Clamp } from './utils';

interface AppProps {

}

interface AppState {
    species: string,
    level: number,
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)

        this.state = {species: "Blaziken", level: 70}
    }

    render() {
        const onLevelChanged = (levelValue: number) => {
            const sanitizedlevelValue = Clamp(levelValue, 0, MAX_LEVEL)
            this.setState({level: sanitizedlevelValue})
        }
        
        const onSpeciesChanged = (species: string) => {
            this.setState({species: species})
        }
        
        return (
            <div className="container">
                <div className="app">
                    <PokemonMainInfoPanel 
                        level={this.state.level}
                        species={this.state.species}
                        onLevelChanged={onLevelChanged}
                        onSpeciesChanged={onSpeciesChanged}
                    />
                    <AllBaseStatsPanel level={this.state.level} species={this.state.species}/>
                </div>
            </div >
        )
    }
}

export default App;
