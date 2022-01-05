import React from 'react';
import Tabs from '@mui/material/Tabs';
import './App.css';
import { AllBaseStatsPanel } from './StatsPanel/AllBaseStatsPanel';
import { PokemonMainInfoPanel } from './MainInfoPanel/PokemonMainInfoPanel';
import { MAX_LEVEL } from './../constants';
import { Clamp } from './../utils';
import { Box, Tab } from '@mui/material';
import { CalculatorType } from '../enums/CalculatorType';

interface AppProps {

}

interface AppState {
    species: string,
    levelString: string,
    natureString: string,
    currentTab: number,
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)

        this.state = { species: "Blaziken", levelString: '100', natureString: "Adamant", currentTab: 0 }
    }

    render() {
        const onLevelChanged = (levelString: string) => {
            const levelValue = parseInt(levelString)
            if (isNaN(levelValue)) {
                this.setState({ levelString: levelString })
            } else {
                const sanitizedlevelValue = Clamp(levelValue, 0, MAX_LEVEL)
                this.setState({ levelString: sanitizedlevelValue.toString() })
            }
        }

        const onSpeciesChanged = (species: string) => {
            this.setState({ species: species })
        }

        const onNatureChanged = (nature: string) => {
            this.setState({ natureString: nature })
        }

        const levelParsedValue = parseInt(this.state.levelString)
        const levelValue = isNaN(levelParsedValue) ? 1 : levelParsedValue

        return (
            <div className="container">
                <div className="app">
                    <PokemonMainInfoPanel
                        levelString={this.state.levelString}
                        species={this.state.species}
                        natureString={this.state.natureString}
                        onLevelChanged={onLevelChanged}
                        onSpeciesChanged={onSpeciesChanged}
                        onNatureChanged={onNatureChanged}
                    />
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs
                                variant="fullWidth"
                                value={this.state.currentTab}
                                onChange={(e, v) => {
                                    this.setState({ currentTab: v })
                                }}
                            >
                                <Tab label="IV Calculator" />
                                <Tab label="Stat Calculator" />
                            </Tabs>
                        </Box>

                        <AllBaseStatsPanel
                            panelType={CalculatorType.IVCalculator}
                            hidden={this.state.currentTab !== 0}
                            level={levelValue}
                            species={this.state.species}
                            natureString={this.state.natureString}
                        />
                        <AllBaseStatsPanel
                            panelType={CalculatorType.FinalStatCalculator}
                            hidden={this.state.currentTab !== 1}
                            level={levelValue}
                            species={this.state.species}
                            natureString={this.state.natureString}
                        />

                    </Box>
                </div>
            </div >
        )
    }
}

export default App;
