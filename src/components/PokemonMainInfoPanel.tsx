import React from 'react';
import "./PokemonMainInfoPanel.css"
import { MAX_LEVEL } from '../constants';

export interface PokemonMainInfoPanelProps {
    level: number,
    species: string,
    onLevelChanged: ((value: number) => void),
    onSpeciesChanged: ((species: string) => void),
}

export class PokemonMainInfoPanel extends React.Component<PokemonMainInfoPanelProps> {
    render() {
        return (
            <div className="pokemon-main-info-panel">
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
                        className="spinbox"
                        type="text"
                        value={this.props.species} 
                        onInput={(e: React.FormEvent<HTMLInputElement>) => this.props.onSpeciesChanged(e.currentTarget.value)} 
                    />
                </div>
            </div>
        )
    }
}