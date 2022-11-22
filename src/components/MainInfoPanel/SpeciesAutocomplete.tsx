import React from 'react';
import "./SpeciesAutocomplete.css"
import Autocomplete from '@mui/material/Autocomplete';
import { SPECIES_SPRITE_FOLDER } from '../../constants';
import allPokemonData from '../../PokemonData.json'
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { StatType } from '../../enums/StatType';

type PokemonData = typeof allPokemonData[number]

export interface SpeciesAutocompleteProps {
    species: string,
    onSpeciesChanged: ((species: string) => void),
}

export class SpeciesAutocomplete extends React.Component<SpeciesAutocompleteProps> {

    renderTooltipBaseStat(statType: StatType, baseStatValue: number) {
        return (
            <div className='tooltip-base-stat-panel'>
                <span className='tooltip-base-stat-text'>{statType}</span>
                <span className='tooltip-base-stat-text'>{baseStatValue}</span>
            </div>
        )
    }

    render() {
        const optPokemonData = allPokemonData.find(x => x.species.toLowerCase() === this.props.species.toLowerCase())
        const pokemonData = optPokemonData === undefined ? allPokemonData[0] : optPokemonData
        const minStringLengthToShowPokemonList = 2

        const filterPokemonData = (pokemonDataArray: PokemonData[], filterText: string): PokemonData[] => {
            // I love my beautiful gf so this easter egg is for her <3
            if (filterText === "a")
                return [pokemonDataArray.find(x => x.species.toLowerCase() === "surskit")!]

            if (filterText.length < minStringLengthToShowPokemonList)
                return []

            const findIgnoreCase = (needle: string, haystack: string) => Math.min(haystack.toLowerCase().indexOf(needle.toLowerCase()), 1)

            // Score of a pokemon data, which will determine how the elements are filtered and sorted.
            // Elements with a score of -1 will be discarded, the others will be sorted from smaller to greater.
            // - Score of -1: The species nor the ID value does not contain the text.
            // - Score of 0: The species starts with the text.
            // - Score of 1: The species contains the text.
            // - Score of 2: The ID value starts with the text.
            // - Score of 3: The ID value contains the text.
            const computeScoreForFiltering = (pokemonData: PokemonData): number => {
                const fieldsByPriority = [pokemonData.species, pokemonData.id.toString()]
                const scores = fieldsByPriority.map(field => findIgnoreCase(filterText, field))
                const scoreIndex = scores.findIndex(score => score !== -1)
                return scoreIndex === -1 ? -1 : scoreIndex * 2 + scores[scoreIndex]
            }

            return pokemonDataArray
                .map(pokemonData => [computeScoreForFiltering(pokemonData), pokemonData] as [number, PokemonData])
                .filter(pokemonDataWithScore => pokemonDataWithScore[0] >= 0)
                .sort((lhs, rhs) => lhs[0] - rhs[0])
                .map(pokemonDataWithScore => pokemonDataWithScore[1])
        }

        return (
            <Autocomplete
                options={allPokemonData}
                classes={{ root: 'species-autocomplete', option: 'species-autocomplete-item' }}
                autoHighlight={true}
                getOptionLabel={(pokemonData) => pokemonData.species}
                filterOptions={(options, _) => filterPokemonData(options, this.props.species)}
                value={pokemonData}
                noOptionsText={this.props.species.length < minStringLengthToShowPokemonList ? "Keep typing..." : "No pokemon found"}
                onChange={(_, newPokemonData) => {
                    this.props.onSpeciesChanged(newPokemonData ? newPokemonData!.species : "")
                }}
                inputValue={this.props.species}
                onInputChange={(_, newInputValue) => {
                    if (newInputValue === pokemonData.species) 
                        return

                    this.props.onSpeciesChanged(newInputValue)
                }}
                isOptionEqualToValue={(option, value) => {
                    return value !== undefined && option.species === value.species
                }}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        variant="standard"
                        label="Species"
                    />
                }
                renderOption={(props, pokemonData) => (
                    <Box
                        component="li"
                        {...props}
                    >

                        <img
                            alt="Sprite of the pokemon"
                            decoding="async"
                            src={SPECIES_SPRITE_FOLDER + pokemonData.sprite}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span className="tooltip-species" style={{ whiteSpace: 'nowrap' }}>{"#" + pokemonData.id + " - " + pokemonData.species}</span>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                {this.renderTooltipBaseStat(StatType.HP, pokemonData.hp)}
                                {this.renderTooltipBaseStat(StatType.Attack, pokemonData.attack)}
                                {this.renderTooltipBaseStat(StatType.Defense, pokemonData.defense)}
                                {this.renderTooltipBaseStat(StatType.SpAttack, pokemonData.spattack)}
                                {this.renderTooltipBaseStat(StatType.SpDefense, pokemonData.spdefense)}
                                {this.renderTooltipBaseStat(StatType.Speed, pokemonData.speed)}
                            </div>
                        </div>
                    </Box>
                )}
            />
        )
    }
}
