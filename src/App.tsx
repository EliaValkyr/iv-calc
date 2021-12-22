import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@mui/material/Tabs';
import './App.css';
import { AllBaseStatsPanel } from './components/AllBaseStatsPanel';
import { PokemonMainInfoPanel } from './components/PokemonMainInfoPanel';
import { MAX_LEVEL } from './constants';
import { Clamp } from './utils';
import { Box, Tab, Typography } from '@mui/material';

interface AppProps {

}

interface AppState {
    species: string,
    level: number,
    natureString: string,
    currentTab: number,
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)

        this.state = { species: "Blaziken", level: 70, natureString: "Adamant", currentTab: 0 }
    }

    render() {
        const onLevelChanged = (levelValue: number) => {
            const sanitizedlevelValue = Clamp(levelValue, 0, MAX_LEVEL)
            this.setState({ level: sanitizedlevelValue })
        }

        const onSpeciesChanged = (species: string) => {
            this.setState({ species: species })
        }

        const onNatureChanged = (nature: string) => {
            this.setState({ natureString: nature })
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

                        <SwipeableViews
                            axis={'x'}
                            index={this.state.currentTab}
                            onChangeIndex={(newTab: number) => {
                                this.setState({ currentTab: newTab })
                            }}
                        >
                            <AllBaseStatsPanel
                                hidden={this.state.currentTab !== 0}
                                level={this.state.level}
                                species={this.state.species}
                                natureString={this.state.natureString}
                            />
                            <AllBaseStatsPanel
                                hidden={this.state.currentTab !== 1}
                                level={this.state.level}
                                species={this.state.species}
                                natureString={this.state.natureString}
                            />
                        </SwipeableViews>

                    </Box>
                </div>
            </div >
        )
    }
}

export default App;
