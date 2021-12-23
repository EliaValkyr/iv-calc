import React from 'react';
import "./SpeciesAutocomplete.css"
import Autocomplete from '@mui/material/Autocomplete';
import { SPRITE_FOLDER } from '../constants';
import allPokemonData from '../PokemonData.json'
import { TextField } from '@mui/material';
import { Box } from '@mui/system';

export interface SpeciesAutocompleteProps {
    species: string,
    onSpeciesChanged: ((species: string) => void),
}

export class SpeciesAutocomplete extends React.Component<SpeciesAutocompleteProps> {

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
                            src={SPRITE_FOLDER + pokemonData.Sprite}
                        />
                        {"#" + pokemonData.ID + " - " + pokemonData.Species}
                    </Box>
                )}
            />
        )
    }
}
