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


    renderPresetLevelPanel(level: number) {
        return (
            
            <Button
                title={level.toString()}
                variant="outlined"
                color="inherit"
                size="small"
                sx={{fontSize: 8}}
                style={{minWidth: '15px', maxWidth: '15px', maxHeight: '20px'}}
                onClick={e => this.props.onLevelChanged(level.toString()) }
            >
                {level}
            </Button>
            )
    }


    render() {
        const pokemonData = allPokemonData.find(x => x.species.toLowerCase() === this.props.species.toLowerCase())
        const spritePath = pokemonData === undefined ? "unknown.png" : pokemonData.sprite
        const type1 = pokemonData === undefined ? null : pokemonData.type1.toLowerCase()
        const type2 = pokemonData === undefined || pokemonData.type2 == "None" ? null : pokemonData.type2.toLowerCase()

        return (
            <div className="pokemon-main-info-panel">
                <div className="pokemon-sprite-panel">
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
                    <div className="level-panel">
                        {this.renderPresetLevelPanel(50)}
                        {this.renderPresetLevelPanel(100)}
                        <TextField
                            placeholder="Level"
                            type="number"
                            variant="standard"
                            sx={{ width: '45px' }}
                            size="small"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={this.props.levelString}
                            onChange={(e) => {
                                this.props.onLevelChanged(e.currentTarget.value)
                            }}
                        />
                    </div>
                </div>
                <div className="data-pickers-panel">
                    <SpeciesAutocomplete
                        species={this.props.species}
                        onSpeciesChanged={this.props.onSpeciesChanged}
                    />
                    <NatureAutocomplete
                        natureString={this.props.natureString}
                        onNatureChanged={this.props.onNatureChanged}
                    />
                </div>
            </div>
        )
    }
}
