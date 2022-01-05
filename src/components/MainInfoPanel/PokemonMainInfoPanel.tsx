import React from 'react';
import "./PokemonMainInfoPanel.css"
import { SPECIES_SPRITE_FOLDER } from '../../constants';
import allPokemonData from '../../PokemonData.json'
import { TextField } from '@mui/material';
import { SpeciesAutocomplete } from './SpeciesAutocomplete';
import { NatureAutocomplete } from './NatureAutocomplete';

export interface PokemonMainInfoPanelProps {
    levelString: string,
    species: string,
    natureString: string,
    onLevelChanged: ((level: string) => void),
    onSpeciesChanged: ((species: string) => void),
    onNatureChanged: ((nature: string) => void),
}

export class PokemonMainInfoPanel extends React.Component<PokemonMainInfoPanelProps> {

    render() {
        const pokemonData = allPokemonData.find(x => x.Species.toLowerCase() === this.props.species.toLowerCase())
        const spritePath = pokemonData === undefined ? "unknown.png" : pokemonData.Sprite

        return (
            <div className="pokemon-main-info-panel">
                <img
                    alt="Sprite of the pokemon"
                    className="pokemon-sprite"
                    src={SPECIES_SPRITE_FOLDER + spritePath}
                />
                <div className="data-pickers-panel">
                    <SpeciesAutocomplete
                        species={this.props.species}
                        onSpeciesChanged={this.props.onSpeciesChanged}
                    />
                    <div className="level-nature-panel">
                        <TextField
                            label="Level"
                            type="number"
                            variant="standard"
                            sx={{ width: '50px' }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={this.props.levelString}
                            onChange={(e) => {
                                this.props.onLevelChanged(e.currentTarget.value)
                            }}
                        />
                        <NatureAutocomplete
                            natureString={this.props.natureString}
                            onNatureChanged={this.props.onNatureChanged}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
