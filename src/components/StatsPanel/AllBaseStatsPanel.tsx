import React from 'react';
import "./AllBaseStatsPanel.css"
import { StatPanel } from './StatPanel';
import { StatType } from '../../enums/StatType';
import data from '../../PokemonData.json'
import { Nature, natureArray } from '../../nature';
import { CalculatorType } from '../../enums/CalculatorType';
import { MAX_EV, MAX_EV_SUM } from '../../constants';
import { Clamp } from '../../utils';
import Icon from '@mdi/react';
import IconButton from '@mui/material/Button';
import { mdiRestart } from '@mdi/js';

export interface AllBaseStatsPanelProps {
    panelType: CalculatorType,
    hidden: boolean,
    species: string,
    level: number,
    natureString: string
}

export interface AllBaseStatsPanelState {
    hpEV: number,
    atkEV: number,
    defEV: number,
    spaEV: number,
    spdEV: number,
    speEV: number,
}

export class AllBaseStatsPanel extends React.Component<AllBaseStatsPanelProps, AllBaseStatsPanelState> {
    constructor(props: AllBaseStatsPanelProps) {
        super(props)

        this.state = { 
            hpEV: 0,
            atkEV: 0,
            defEV: 0,
            spaEV: 0,
            spdEV: 0,
            speEV: 0,
        }
    }

    renderStatPanel(statType: StatType, evStateKey: keyof AllBaseStatsPanelState, baseStat: number, nature: Nature) {
        return (
            <StatPanel
                statType={statType}
                panelType={this.props.panelType}
                baseStat={baseStat}
                level={this.props.level}
                ev={this.state[evStateKey]}
                nature={nature}
                onEVValueChanged={newEV => {
                    const sanitizedEV = Clamp(newEV, 0, MAX_EV)
                    this.setState({ ...this.state, [evStateKey]: sanitizedEV })
                }}
            />)
    }

    resetEVs() {
        this.setState({
            hpEV: 0,
            atkEV: 0,
            defEV: 0,
            spaEV: 0,
            spdEV: 0,
            speEV: 0,
        })
    }

    render() {
        const { panelType, hidden, level, species, natureString } = this.props
        const { hpEV, atkEV, defEV, spaEV, spdEV, speEV } = this.state

        const pokemonData = data.find(x => x.species.toLowerCase() === species.toLowerCase())

        const optNature = natureArray.find(x => x.mName === natureString)
        const nature: Nature = optNature === undefined ? new Nature("Dummy") : optNature!

        const evSum = hpEV + atkEV + defEV + spaEV + spdEV + speEV
        const evRemaining = MAX_EV_SUM - evSum

        let labelColorClassName = evRemaining >= 0? "pos-remaining-ev-color" : "neg-remaining-ev-color"
        
        return (
            <div
                className="all-base-stats-container"
                hidden={hidden}
                tabIndex={0}
            >
                <div className="all-base-stats-panel">
                    <span className="remaining-ev-panel">
                        <span className={"remaining-ev-label " + labelColorClassName}>{"EVs remaining: " + evRemaining}</span>

                        <IconButton 
                            title="Reset EVs"
                            color="inherit"
                            style={{minWidth: '40px', maxWidth: '40px', maxHeight: '25px'}}
                            onClick={e => this.resetEVs() }
                        >
                            <Icon 
                                path={mdiRestart} 
                                size={1}
                            />
                        </IconButton>
                    </span>
                    {this.renderStatPanel(StatType.HP, 'hpEV', pokemonData ? pokemonData!.hp : 1, nature)}
                    {this.renderStatPanel(StatType.Attack, 'atkEV', pokemonData ? pokemonData!.attack : 1, nature)}
                    {this.renderStatPanel(StatType.Defense, 'defEV', pokemonData ? pokemonData!.defense : 1, nature)}
                    {this.renderStatPanel(StatType.SpAttack, 'spaEV', pokemonData ? pokemonData!.spattack : 1, nature)}
                    {this.renderStatPanel(StatType.SpDefense, 'spdEV', pokemonData ? pokemonData!.spdefense : 1, nature)}
                    {this.renderStatPanel(StatType.Speed, 'speEV', pokemonData ? pokemonData!.speed : 1, nature)}
                </div>
            </div>
        )
    }
}
