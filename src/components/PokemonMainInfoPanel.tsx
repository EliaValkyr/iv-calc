import React from 'react';
import "./PokemonMainInfoPanel.css"
import Autocomplete from 'react-autocomplete';
import { MAX_LEVEL } from '../constants';
import data from '../PokemonData.json'
import { Nature } from '../nature';

export interface PokemonMainInfoPanelProps {
    level: number,
    species: string,
    natureString: string,
    onLevelChanged: ((value: number) => void),
    onSpeciesChanged: ((species: string) => void),
    onNatureChanged: ((nature: string) => void),
}

export class PokemonMainInfoPanel extends React.Component<PokemonMainInfoPanelProps> {
    render() {
        const speciesList = data.map(x => x.Species)

        const pokemonData = data.find(x => x.Species.toLowerCase() == this.props.species.toLowerCase())
        const spritePath = pokemonData == undefined ? "unknown.png" : pokemonData.Sprite

        return (
            <div className="pokemon-main-info-panel">
                {/* <Autocomplete
                    getItemValue={(item) => item.label}
                    items={speciesList}
                    renderItem={(item, isHighlighted) =>
                        <div style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                        {item.label}
                        </div>
                    }
                    value={this.state.species2 ? this.state.species2 : ''}
                    onChange={(e) => console.log(e.target.value)}
                    onSelect={(val) => console.log(val)}
                /> */}
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
                    <span className="label">Species</span>
                    <input 
                        className="textfield"
                        type="text"
                        value={this.props.species} 
                        onInput={(e: React.FormEvent<HTMLInputElement>) => this.props.onSpeciesChanged(e.currentTarget.value)} 
                    />
                    <img src={"resources/sprites/" + spritePath} />
                </div>
                <div className="subpanel">
                    <span className="label">Nature</span>
                    <input 
                        className="textfield"
                        type="text"
                        value={this.props.natureString} 
                        onInput={(e: React.FormEvent<HTMLInputElement>) => this.props.onNatureChanged(e.currentTarget.value)} 
                    />
                </div>
            </div>
        )
    }
}