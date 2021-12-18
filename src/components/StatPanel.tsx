import React from "react"
import "./StatPanel.css"
import { SliderPanel } from "./SliderPanel"

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
                <SliderPanel min={0} max={252} step={4} labelText="EVs" className="ev" />
                <SliderPanel min={50} max={200} step={1} labelText="Stat" className="main" />
            </div>
        </div>
    )
}
