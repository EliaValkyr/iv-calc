import React from 'react';
import "./AllBaseStatsPanel.css"
import { StatPanel } from './StatPanel';
import { StatType } from '../enums/StatType';
import data from '../PokemonData.json'

export interface AllBaseStatsPanelProps {
    species: string,
    level: number,
}

export interface AllBaseStatsPanelState {

}

export class AllBaseStatsPanel extends React.Component<AllBaseStatsPanelProps, AllBaseStatsPanelState> {
    render() {
        const {level, species} = this.props

        const pokemonData = data.find(x => x.Species.toLowerCase() == this.props.species.toLowerCase())

        return (
            <div className="container">
                <div className="all-base-stats-panel">
                    <StatPanel statType={StatType.HP} baseStat={pokemonData ? pokemonData!.HP : 1} level={level} natureMult={1}/>
                    <StatPanel statType={StatType.Attack} baseStat={pokemonData ? pokemonData!.Attack : 1} level={level} natureMult={1}/>
                    <StatPanel statType={StatType.Defence} baseStat={pokemonData ? pokemonData!.Defense : 1} level={level} natureMult={1}/>
                    <StatPanel statType={StatType.SpAttack} baseStat={pokemonData ? pokemonData!.SpAttack : 1} level={level} natureMult={1}/>
                    <StatPanel statType={StatType.SpDefence} baseStat={pokemonData ? pokemonData!.SpDefense : 1} level={level} natureMult={1}/>
                    <StatPanel statType={StatType.Speed} baseStat={pokemonData ? pokemonData!.Speed : 1} level={level} natureMult={1}/>
                </div>
            </div>
        )
    }
}
