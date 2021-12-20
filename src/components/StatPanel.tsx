import React from "react"
import "./StatPanel.css"
import { SliderPanel } from "./SliderPanel"
import { StatType } from "../enums/StatType"
import { computeIVRange, computeMaxFinalStat, computeMinFinalStat } from "../formulas"
import { IVRangePanel } from "./IVRangePanel"
import { BaseStatPanel } from "./BaseStatPanel"
import { EV_STEP, MAX_EV } from "../constants"
import { Clamp } from "../utils"
import { Nature } from "../nature"

export interface StatPanelProps {
    statType: StatType,
    baseStat: number,
    level: number,
    nature: Nature,
}

interface StatPanelState {
    ev: number,
    finalStat: number,
}

export class StatPanel extends React.Component<StatPanelProps, StatPanelState> {
    
    constructor(props: StatPanelProps) {
        super(props)

        const {statType, baseStat, level, nature} = this.props
        const finalStat = computeMinFinalStat(statType, baseStat, /*ev*/ 0, level, nature.getMultiplier(statType))
        this.state = {ev: 0, finalStat: finalStat}
    }

    recomputeLimits () {
        const {statType, baseStat, level, nature} = this.props
        const {ev} = this.state

        const natureMult = nature.getMultiplier(statType)

        const minFinalStat = computeMinFinalStat(statType, baseStat, ev, level, natureMult)
        const maxFinalStat = computeMaxFinalStat(statType, baseStat, ev, level, natureMult)
        const cappedFinalStatValue = Clamp(this.state.finalStat, minFinalStat, maxFinalStat)
        this.setState({finalStat: cappedFinalStatValue})
    }

    render() {
        const {statType, baseStat, level, nature} = this.props
        const {ev, finalStat} = this.state

        const evValueChanged = (evValue: number) => {
            const sanitizedEVValue = Clamp(evValue, 0, MAX_EV)
            this.setState({ev: sanitizedEVValue})
            this.recomputeLimits()
        }

        const finalStatValueChanged = (finalStatValue: number) => {
            this.setState({finalStat: finalStatValue})
        }

        const natureMult = nature.getMultiplier(statType)
        const minFinalStat = computeMinFinalStat(statType, baseStat, ev, level, natureMult)
        const maxFinalStat = computeMaxFinalStat(statType, baseStat, ev, level, natureMult)
        const actualFinalStat = Clamp(finalStat, minFinalStat, maxFinalStat)

        const opt_iv_range = computeIVRange(statType, baseStat, ev, level, natureMult, actualFinalStat)
        return (
            <div className="stat-panel">
                <div>
                    <BaseStatPanel
                        statType={statType}
                        baseStat={baseStat}
                        natureMult={natureMult}
                    />
                </div>
                <div className="inner-stat-panel">
                    <SliderPanel 
                        className="ev" 
                        min={0} 
                        max={MAX_EV} 
                        step={EV_STEP} 
                        currentValue={ev} 
                        labelText="EVs" 
                        onValueChanged={evValueChanged}
                    />

                    <SliderPanel 
                        key={level + " " + baseStat + " " + natureMult}
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
                        optIVRange={opt_iv_range}
                    />
                </div>
            </div>
        )
    }
}