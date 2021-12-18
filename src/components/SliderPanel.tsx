import React from "react"
import "./SliderPanel.css"

export interface SliderPanelProps {
    min: number,
    max: number,
    step: number,
    labelText: string,
    className: string,
}

interface SliderPanelState {
    value: number,
}

export class SliderPanel extends React.Component<SliderPanelProps, SliderPanelState> {
    
    constructor(props: SliderPanelProps) {
        super(props)

        this.state = {value: props.min}
    }

    render() {
        const props = this.props
        const state = this.state

        const ValueChanged = (e: React.FormEvent<HTMLInputElement>) => {
            const newValue = parseInt(e.currentTarget.value)
            const sanitizedValue = Math.max(props.min, Math.min(newValue, props.max))

            this.setState({value: sanitizedValue})
        }

        return <div className={"slider-panel " + props.className}>
            <span className="label">{props.labelText + " (" + props.min + ", " + props.max + ")"}</span>
            <input className="slider" type="range" min={props.min} max={props.max} step={props.step} value={state.value} onChange={ValueChanged} list="tickmarks"/>
            <input className="spinbox" type="number" min={props.min} max={props.max} step={props.step} value={state.value} onInput={ValueChanged} />
            <datalist id="tickmarks"> {/* Ask Alba */}
                <option value={props.min} label="0%" />
                <option value={props.max} label="100%" />
            </datalist>
        </div>
    }
}