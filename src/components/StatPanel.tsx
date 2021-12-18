import React from "react"
import "./StatPanel.css"
import { SliderPanel } from "./SliderPanel"
import { StatType } from "../enums/StatType"

export interface StatPanelProps {
    statType: StatType,
    baseStat: number,
    ev: number,
    iv: number,
    natureMult: number,
}

interface StatPanelState {
    minFinalStat: number,
    maxFinalStat: number, 
}

export class StatPanel extends React.Component<StatPanelProps, StatPanelState> {
    
    constructor(props: StatPanelProps) {
        super(props)

        // this.state = {value: props.min}
    }

    render() {
        return (
            <div className="stat-panel">
                <span className="label">{this.props.statType}</span>
                <div className="inner-stat-panel">
                    <SliderPanel min={0} max={252} step={4} labelText="EVs" className="ev" />
                    <SliderPanel min={50} max={200} step={1} labelText="Stat" className="main" />
                </div>
            </div>
        )
    }
}