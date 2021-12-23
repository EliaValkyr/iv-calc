import React from 'react';
import "./SpeciesAutocomplete.css"
import Autocomplete from '@mui/material/Autocomplete';
import { SPECIES_SPRITE_FOLDER } from '../../constants';
import allPokemonData from '../../PokemonData.json'
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { StatType } from '../../enums/StatType';

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
        const pokemonData = allPokemonData.find(x => x.Species.toLowerCase() === this.props.species.toLowerCase())

        return (
            <Autocomplete
                options={allPokemonData}
                className="autocomplete species-autocomplete"
                getOptionLabel={(pokemonData) => pokemonData.Species}
                value={pokemonData}
                onChange={(_, newPokemonData) => {
                    this.props.onSpeciesChanged(newPokemonData ? newPokemonData!.Species : "")
                }}
                inputValue={this.props.species}
                onInputChange={(_, newInputValue) => {
                    this.props.onSpeciesChanged(newInputValue)
                }}
                isOptionEqualToValue={(option, value) => {
                    return value !== undefined && option.Species === value.Species
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
                        className="autocomplete-item"
                        component="li"
                        {...props}
                    >

                        <img
                            alt="Sprite of the pokemon"
                            loading="lazy"
                            src={SPECIES_SPRITE_FOLDER + pokemonData.Sprite}
                        />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span>{"#" + pokemonData.ID + " - " + pokemonData.Species}</span>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                {this.renderTooltipBaseStat(StatType.HP, pokemonData.HP)}
                                {this.renderTooltipBaseStat(StatType.Attack, pokemonData.Attack)}
                                {this.renderTooltipBaseStat(StatType.Defense, pokemonData.Defense)}
                                {this.renderTooltipBaseStat(StatType.SpAttack, pokemonData.SpAttack)}
                                {this.renderTooltipBaseStat(StatType.SpDefense, pokemonData.SpDefense)}
                                {this.renderTooltipBaseStat(StatType.Speed, pokemonData.Speed)}
                            </div>
                        </div>
                    </Box>
                )}
            />
        )
    }
}
