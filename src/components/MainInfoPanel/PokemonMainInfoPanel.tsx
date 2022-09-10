import React from 'react';
import "./PokemonMainInfoPanel.css"
import { SPECIES_SPRITE_FOLDER, TYPES_SPRITE_FOLDER } from '../../constants';
import allPokemonData from '../../PokemonData.json'
import { TextField } from '@mui/material';
import { SpeciesAutocomplete } from './SpeciesAutocomplete';
import { NatureAutocomplete } from './NatureAutocomplete';
import Button from '@mui/material/Button';

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
        const type1 = pokemonData === undefined ? null : pokemonData.Type1.toLowerCase()
        const type2 = pokemonData === undefined || pokemonData.Type2 == "None" ? null : pokemonData.Type2.toLowerCase()

        return (
            <div className="pokemon-main-info-panel">
                <div className="pokemon-sprite-and-type">
                    <img
                        alt="Sprite of the pokemon"
                        className="pokemon-sprite"
                        src={SPECIES_SPRITE_FOLDER + spritePath}
                    />
                    <div className="pokemon-types">
                        {
                            type1 ? 
                                <img
                                    alt="First type of the pokemon"
                                    className="type1-sprite"
                                    src={TYPES_SPRITE_FOLDER + type1 + ".gif"}
                                />
                                :
                                null
                        }
                        {
                            type2 ? 
                                <img
                                    alt="Second type of the pokemon"
                                    className="type2-sprite"
                                    src={TYPES_SPRITE_FOLDER + type2 + ".gif"}
                                />
                                :
                                null
                        }
                    </div>
                </div>
                <div className="data-pickers-panel">
                    <SpeciesAutocomplete
                        species={this.props.species}
                        onSpeciesChanged={this.props.onSpeciesChanged}
                    />
                    <div className="level-nature-panel">
                        <div className="preset-level-panel">

                            <Button
                                title="50"
                                variant="outlined"
                                color="inherit"
                                style={{minWidth: '20px', maxWidth: '20px', maxHeight: '25px'}}
                                onClick={e => this.props.onLevelChanged("50") }
                            >
                                50
                            </Button>
                            <Button
                                title="100"
                                variant="outlined"
                                color="inherit"
                                style={{minWidth: '20px', maxWidth: '20px', maxHeight: '25px'}}
                                onClick={e => this.props.onLevelChanged("100") }
                            >
                                100
                            </Button>
                        </div>
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
