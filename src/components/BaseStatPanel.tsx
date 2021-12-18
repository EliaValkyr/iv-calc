import React from "react"
import "./BaseStatPanel.css"
import { StatType } from "../enums/StatType"

export interface BaseStatPanelProps {
    statType: StatType,
    baseStat: number,
}

export class BaseStatPanel extends React.Component<BaseStatPanelProps> {
    render() {
        return (
            <div className={"base-stat-panel"}>
                <span className="base-stat-text-label">{this.props.statType}</span>
                <span className="base-stat-value-label">{"Base Stat: " + this.props.baseStat}</span>
            </div>)
    }
}