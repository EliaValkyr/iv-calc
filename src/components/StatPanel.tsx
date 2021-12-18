import React from "react"
import "./StatPanel.css"
import { SliderPanel } from "./SliderPanel"
import { StatType } from "../enums/StatType"
import { computeIVRange, computeMaxFinalStat, computeMinFinalStat } from "../Formulas"
import { IVRangePanel } from "./IVRangePanel"
import { BaseStatPanel } from "./BaseStatPanel"

export interface StatPanelProps {
    statType: StatType,
    baseStat: number,
    level: number,
    natureMult: number,
}

interface StatPanelState {
    ev: number,
    finalStat: number,
}

export class StatPanel extends React.Component<StatPanelProps, StatPanelState> {
    
    constructor(props: StatPanelProps) {
        super(props)

        this.state = {ev: 0, finalStat: 0}
        this.recomputeLimits()
    }

    recomputeLimits () {
        const {statType, baseStat, level, natureMult} = this.props
        const {ev} = this.state

        const minFinalStat = computeMinFinalStat(statType, baseStat, ev, level, natureMult)
        const maxFinalStat = computeMaxFinalStat(statType, baseStat, ev, level, natureMult)
        const cappedFinalStatValue = Math.max(minFinalStat, Math.min(this.state.finalStat, maxFinalStat))
        this.setState({finalStat: cappedFinalStatValue})
    }

    render() {
        const {statType, baseStat, level, natureMult} = this.props
        const {ev, finalStat} = this.state

        const evValueChanged = (evValue: number) => {
            const sanitizedEVValue = Math.max(0, Math.min(evValue, 252))
            this.setState({ev: sanitizedEVValue})
            this.recomputeLimits()
        }

        const finalStatValueChanged = (finalStatValue: number) => {
            this.setState({finalStat: finalStatValue})
        }

        const minFinalStat = computeMinFinalStat(statType, baseStat, ev, level, natureMult)
        const maxFinalStat = computeMaxFinalStat(statType, baseStat, ev, level, natureMult)

        const [minIV, maxIV] = computeIVRange(statType, baseStat, ev, level, natureMult, finalStat)
        return (
            <div className="stat-panel">
                <div>
                    <BaseStatPanel
                        statType={statType}
                        baseStat={baseStat}
                    />
                </div>
                <div className="inner-stat-panel">
                    <SliderPanel 
                        className="ev" 
                        min={0} 
                        max={252} 
                        step={4} 
                        currentValue={ev} 
                        labelText="EVs" 
                        onValueChanged={evValueChanged}
                    />

                    <SliderPanel 
                        className="final-stat" 
                        min={minFinalStat} 
                        max={maxFinalStat} 
                        step={1} 
                        currentValue={finalStat} 
                        labelText="Stat" 
                        onValueChanged={finalStatValueChanged}
                    />
                </div>
                <div>
                    <IVRangePanel
                        minIV={minIV}
                        maxIV={maxIV}
                    />
                </div>
            </div>
        )
    }
}