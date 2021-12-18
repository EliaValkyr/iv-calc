import React from "react"
import "./BaseStatPanel.css"
import { StatType } from "../enums/StatType"

export interface BaseStatPanelProps {
    statType: StatType,
    baseStat: number,
    natureMult: number,
}

export class BaseStatPanel extends React.Component<BaseStatPanelProps> {
    render() {
        let labelColorClassName = "unchanged-value-color"
        if (this.props.natureMult > 1)
            labelColorClassName = "increased-value-color"
        else if (this.props.natureMult < 1)
            labelColorClassName = "decreased-value-color"
            
        return (
            <div className={"base-stat-panel"}>
                <span className={"base-stat-text-label " + labelColorClassName}>{this.props.statType}</span>
                <span className={"base-stat-value-label " + labelColorClassName}>{"Base Stat: " + this.props.baseStat}</span>
            </div>)
    }
}