import React from "react"
import "./SliderPanel.css"

export interface SliderPanelProps {
    min: number,
    max: number,
    step: number,
    currentValue: number,
    labelText: string,
    className: string,
    onValueChanged: ((value: number) => void),
}

export class SliderPanel extends React.Component<SliderPanelProps> {
    
    constructor(props: SliderPanelProps) {
        super(props)

        this.state = {value: props.min}
    }

    render() {
        const {min, max, step, currentValue, labelText, className, onValueChanged} = this.props

        return (
            <div className={"slider-panel " + className}>
                <span className="label">{labelText + " (" + min + ", " + max + ")"}</span>
                <input 
                    className="slider" 
                    type="range" 
                    min={min} 
                    max={max} 
                    step={step}
                    value={currentValue} 
                    onChange={(e: React.FormEvent<HTMLInputElement>) => onValueChanged(parseInt(e.currentTarget.value))} 
                />
                <input 
                    className="spinbox"
                    type="number" 
                    min={min} 
                    max={max} 
                    step={step}
                    value={currentValue} 
                    onInput={(e: React.FormEvent<HTMLInputElement>) => onValueChanged(parseInt(e.currentTarget.value))} 
                />
            </div>)
    }
}