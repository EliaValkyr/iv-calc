import React from 'react';
import "./AllBaseStatsPanel.css"
import { StatPanel } from './StatPanel';
import { StatType } from '../enums/StatType';
import data from '../PokemonData.json'
import { Nature, natureArray } from '../nature';

export interface AllBaseStatsPanelProps {
    species: string,
    level: number,
    natureString: string
}

export interface AllBaseStatsPanelState {

}

export class AllBaseStatsPanel extends React.Component<AllBaseStatsPanelProps, AllBaseStatsPanelState> {
    render() {
        const {level, species, natureString} = this.props

        const pokemonData = data.find(x => x.Species.toLowerCase() == this.props.species.toLowerCase())

        const optNature = natureArray.find(x => x.mName == natureString)
        const nature: Nature = optNature == undefined ? new Nature("Dummy") : optNature!
        
        return (
            <div className="container">
                <div className="all-base-stats-panel">
                    <StatPanel statType={StatType.HP} baseStat={pokemonData ? pokemonData!.HP : 1} level={level} nature={nature}/>
                    <StatPanel statType={StatType.Attack} baseStat={pokemonData ? pokemonData!.Attack : 1} level={level} nature={nature}/>
                    <StatPanel statType={StatType.Defense} baseStat={pokemonData ? pokemonData!.Defense : 1} level={level} nature={nature}/>
                    <StatPanel statType={StatType.SpAttack} baseStat={pokemonData ? pokemonData!.SpAttack : 1} level={level} nature={nature}/>
                    <StatPanel statType={StatType.SpDefense} baseStat={pokemonData ? pokemonData!.SpDefense : 1} level={level} nature={nature}/>
                    <StatPanel statType={StatType.Speed} baseStat={pokemonData ? pokemonData!.Speed : 1} level={level} nature={nature}/>
                </div>
            </div>
        )
    }
}
