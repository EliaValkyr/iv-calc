import React from "react"
import "./StatPanel.css"

export interface StatPanelProps {
    statName: string,
    baseStat: number,
    ev: number,
    iv: number,
    natureMult: number,
}

export function StatPanel(props: StatPanelProps) {
    return (
        <div className="stat-panel">
            <span className="label">{props.statName}</span>
            <div className="inner-stat-panel">
                <Field min={0} max={252} step={4} labelText="EVs" className="ev" />
                <Field min={100} max={200} step={1} labelText="Stat" className="main" />
            </div>
        </div>
    )
}

interface FieldProps {
    min: number,
    max: number,
    step: number,
    labelText: string,
    className: string,
}

interface FieldState {
    value: number,
}

class Field extends React.Component<FieldProps, FieldState> {
    
    constructor(props: FieldProps) {
        super(props)

        this.state = {value: props.min}
    }

    render() {
        const props = this.props
        const state = this.state

        const Patata = (e: React.FormEvent<HTMLInputElement>) => {
            const newValue = parseInt(e.currentTarget.value)
            const sanitizedValue = Math.max(props.min, Math.min(newValue, props.max))

            this.setState({value: sanitizedValue})
        }

        return <div className={"stat-panel-field " + props.className}>
            <span className="label">{props.labelText}</span>
            <input className="slider" type="range" min={props.min} max={props.max} step={props.step} value={state.value} onChange={Patata} />
            <input className="spinbox" type="number" min={props.min} max={props.max} step={props.step} value={state.value} onInput={Patata} />
        </div>
    }
}