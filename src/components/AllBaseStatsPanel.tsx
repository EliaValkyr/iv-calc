import React from 'react';
import "./AllBaseStatsPanel.css"
import { StatPanel } from './StatPanel';
import { StatType } from '../enums/StatType';
import data from '../PokemonData.json'
import { Nature, natureArray } from '../nature';
import { CalculatorType } from '../enums/CalculatorType';

export interface AllBaseStatsPanelProps {
    panelType: CalculatorType,
    hidden: boolean,
    species: string,
    level: number,
    natureString: string
}

export interface AllBaseStatsPanelState {

}

export class AllBaseStatsPanel extends React.Component<AllBaseStatsPanelProps, AllBaseStatsPanelState> {
    render() {
        const { panelType, hidden, level, species, natureString } = this.props

        const pokemonData = data.find(x => x.Species.toLowerCase() == this.props.species.toLowerCase())

        const optNature = natureArray.find(x => x.mName == natureString)
        const nature: Nature = optNature == undefined ? new Nature("Dummy") : optNature!

        return (
            <div
                className="container"
                hidden={hidden}
            >
                <div className="all-base-stats-panel">
                    <StatPanel statType={StatType.HP} panelType={panelType} baseStat={pokemonData ? pokemonData!.HP : 1} level={level} nature={nature} />
                    <StatPanel statType={StatType.Attack} panelType={panelType} baseStat={pokemonData ? pokemonData!.Attack : 1} level={level} nature={nature} />
                    <StatPanel statType={StatType.Defense} panelType={panelType} baseStat={pokemonData ? pokemonData!.Defense : 1} level={level} nature={nature} />
                    <StatPanel statType={StatType.SpAttack} panelType={panelType} baseStat={pokemonData ? pokemonData!.SpAttack : 1} level={level} nature={nature} />
                    <StatPanel statType={StatType.SpDefense} panelType={panelType} baseStat={pokemonData ? pokemonData!.SpDefense : 1} level={level} nature={nature} />
                    <StatPanel statType={StatType.Speed} panelType={panelType} baseStat={pokemonData ? pokemonData!.Speed : 1} level={level} nature={nature} />
                </div>
            </div>
        )
    }
}
