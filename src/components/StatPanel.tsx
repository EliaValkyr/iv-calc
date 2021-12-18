import React from "react"
import "./StatPanel.css"
import { SliderPanel } from "./SliderPanel"
import { StatType } from "../enums/StatType"
import { computeIVRange, computeMaxFinalStat, computeMinFinalStat } from "../formulas"
import { IVRangePanel } from "./IVRangePanel"
import { BaseStatPanel } from "./BaseStatPanel"
import { MAX_EV } from "../constants"
import { Clamp } from "../utils"

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

        const {statType, baseStat, level, natureMult} = this.props
        const finalStat = computeMinFinalStat(statType, baseStat, /*ev*/ 0, level, natureMult)
        this.state = {ev: 0, finalStat: finalStat}
    }

    recomputeLimits () {
        const {statType, baseStat, level, natureMult} = this.props
        const {ev} = this.state

        const minFinalStat = computeMinFinalStat(statType, baseStat, ev, level, natureMult)
        const maxFinalStat = computeMaxFinalStat(statType, baseStat, ev, level, natureMult)
        const cappedFinalStatValue = Clamp(this.state.finalStat, minFinalStat, maxFinalStat)
        this.setState({finalStat: cappedFinalStatValue})
    }

    render() {
        const {statType, baseStat, level, natureMult} = this.props
        const {ev, finalStat} = this.state

        const evValueChanged = (evValue: number) => {
            const sanitizedEVValue = Clamp(evValue, 0, MAX_EV)
            this.setState({ev: sanitizedEVValue})
            this.recomputeLimits()
        }

        const finalStatValueChanged = (finalStatValue: number) => {
            this.setState({finalStat: finalStatValue})
        }

        const minFinalStat = computeMinFinalStat(statType, baseStat, ev, level, natureMult)
        const maxFinalStat = computeMaxFinalStat(statType, baseStat, ev, level, natureMult)
        const actualFinalStat = Clamp(finalStat, minFinalStat, maxFinalStat)

        const [minIV, maxIV] = computeIVRange(statType, baseStat, ev, level, natureMult, actualFinalStat)
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
                        key={this.props.level + " " + this.props.baseStat + " " + this.props.natureMult}
                        className="final-stat" 
                        min={minFinalStat} 
                        max={maxFinalStat} 
                        step={1} 
                        currentValue={actualFinalStat} 
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