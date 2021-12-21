import React from 'react';
import "./PokemonMainInfoPanel.css"
import Autocomplete from 'react-autocomplete';
import { MAX_LEVEL, SPRITE_FOLDER } from '../constants';
import allPokemonData from '../PokemonData.json'
import { Nature, natureArray } from '../nature';

export interface PokemonMainInfoPanelProps {
    level: number,
    species: string,
    natureString: string,
    onLevelChanged: ((value: number) => void),
    onSpeciesChanged: ((species: string) => void),
    onNatureChanged: ((nature: string) => void),
}

export class PokemonMainInfoPanel extends React.Component<PokemonMainInfoPanelProps> {

    constructor(props: PokemonMainInfoPanelProps) {
        super(props)
    }

    render() {
        const pokemonData = allPokemonData.find(x => x.Species.toLowerCase() === this.props.species.toLowerCase())
        const spritePath = pokemonData === undefined ? "unknown.png" : pokemonData.Sprite

        return (
            <div className="pokemon-main-info-panel">
                <div className="vert-subpanel species-panel">
                    <img src={SPRITE_FOLDER + spritePath} />
                    <Autocomplete
                        items={allPokemonData}
                        getItemValue={item => item.Species}
                        shouldItemRender={(item, value) => { return value.length > 1 && item.Species.toLowerCase().indexOf(value.toLowerCase()) !== -1 }}
                        renderItem={(item, isHighlighted) =>
                            <div 
                                className="autocomplete-item" 
                                style={{ background: isHighlighted ? 'lightgray' : 'white' }}
                            >
                                <img src={SPRITE_FOLDER + item.Sprite} />
                                {"#" + item.ID + " - " + item.Species}
                            </div>
                        }
                        value={this.props.species}
                        onChange={(_, value) => this.props.onSpeciesChanged(value)}
                        onSelect={value => this.props.onSpeciesChanged(value)}
                        inputProps={{ className: "autocomplete species-autocomplete"}}
                    />
                </div>
                <div className="vert-subpanel level-nature-panel">
                    <div className="subpanel">
                        <span className="label">Level</span>
                        <input 
                            className="spinbox"
                            type="number" 
                            min={0} 
                            max={MAX_LEVEL} 
                            step={1}
                            value={this.props.level} 
                            onInput={(e: React.FormEvent<HTMLInputElement>) => this.props.onLevelChanged(parseInt(e.currentTarget.value))} 
                        />
                    </div>
                    <div className="subpanel">
                        <Autocomplete
                            items={natureArray}
                            getItemValue={item => item.mName}
                            renderItem={(nature, isHighlighted) =>
                                <div 
                                    className="autocomplete-item" 
                                    style={{ background: isHighlighted ? 'lightgray' : 'white' }}
                                >
                                    <span className="nature-autocomplete-text">{nature.mName}</span>
                                    <span>{nature.mIncreasedStat || nature.mDecreasedStat? "(" : ""}</span>
                                    <span style={{color: 'green'}}>{nature.mIncreasedStat ? "+" + nature.mIncreasedStat : ""}</span>
                                    <span>{nature.mIncreasedStat && nature.mDecreasedStat ? ", " : ""}</span>
                                    <span style={{color: 'red'}}>{nature.mDecreasedStat ? "-" + nature.mDecreasedStat : ""}</span>
                                    <span>{nature.mIncreasedStat || nature.mDecreasedStat ? ")" : ""}</span>
                                </div>
                            }
                            value={this.props.natureString}
                            onChange={(_, value) => this.props.onNatureChanged(value)}
                            onSelect={value => this.props.onNatureChanged(value)}
                            inputProps={{ className: "autocomplete nature-autocomplete"}}
                        />
                    </div>
                </div>
            </div>
        )
    }
}