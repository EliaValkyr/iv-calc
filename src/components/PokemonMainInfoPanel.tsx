import React from 'react';
import "./PokemonMainInfoPanel.css"

export interface PokemonMainInfoPanelProps {
    level: number,
    onLevelChanged: ((value: number) => void)
}

export class PokemonMainInfoPanel extends React.Component<PokemonMainInfoPanelProps> {
    render() {
        return (
            <div className={"pokemon-main-info-panel"}>
                <span className="label">{"Level"}</span>
                <input 
                    className="spinbox"
                    type="number" 
                    min={0} 
                    max={100} 
                    step={1}
                    value={this.props.level} 
                    onInput={(e: React.FormEvent<HTMLInputElement>) => this.props.onLevelChanged(parseInt(e.currentTarget.value))} 
                />
            </div>
        )
    }
}