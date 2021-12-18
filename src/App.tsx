import React from 'react';
import './App.css';
import { AllBaseStatsPanel } from './components/AllBaseStatsPanel';
import { PokemonMainInfoPanel } from './components/PokemonMainInfoPanel';
import { MAX_LEVEL } from './constants';
import { Clamp } from './utils';

interface AppProps {

}

interface AppState {
    species: string,
    level: number,
    natureString: string,
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)

        this.state = {species: "Blaziken", level: 70, natureString: "Adamant"}
    }

    render() {
        const onLevelChanged = (levelValue: number) => {
            const sanitizedlevelValue = Clamp(levelValue, 0, MAX_LEVEL)
            this.setState({level: sanitizedlevelValue})
        }
        
        const onSpeciesChanged = (species: string) => {
            console.log("New species: " + species)
            this.setState({species: species})
        }
        
        const onNatureChanged = (nature: string) => {
            this.setState({natureString: nature})
        }

        return (
            <div className="container">
                <div className="app">
                    <PokemonMainInfoPanel 
                        level={this.state.level}
                        species={this.state.species}
                        natureString={this.state.natureString}
                        onLevelChanged={onLevelChanged}
                        onSpeciesChanged={onSpeciesChanged}
                        onNatureChanged={onNatureChanged}
                    />
                    <AllBaseStatsPanel 
                        level={this.state.level} 
                        species={this.state.species}
                        natureString={this.state.natureString}
                    />
                </div>
            </div >
        )
    }
}

export default App;
