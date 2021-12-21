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
import { SliderPanelType } from "../enums/SliderPanelType"

export interface StatPanelProps {
    statType: StatType,
    baseStat: number,
    level: number,
    nature: Nature,
}

interface StatPanelState {
    evString: string,
    finalStatString: string,
}

export class StatPanel extends React.Component<StatPanelProps, StatPanelState> {
    
    constructor(props: StatPanelProps) {
        super(props)

        const {statType, baseStat, level, nature} = this.props
        const finalStat = computeMinFinalStat(statType, baseStat, /*ev*/ 0, level, nature.getMultiplier(statType))
        this.state = {evString: '0', finalStatString: finalStat.toString()}
    }

    getEV(): number {
        const ev = parseInt(this.state.evString)
        return isNaN(ev) ? 0 : ev
    }

    recomputeLimits () {
        const {statType, baseStat, level, nature} = this.props
        const {finalStatString} = this.state

        const finalStat = parseInt(finalStatString)
        if (isNaN(finalStat)) {
            const natureMult = nature.getMultiplier(statType)
    
            const minFinalStat = computeMinFinalStat(statType, baseStat, this.getEV(), level, natureMult)
            const maxFinalStat = computeMaxFinalStat(statType, baseStat, this.getEV(), level, natureMult)
            const cappedFinalStatValue = Clamp(finalStat, minFinalStat, maxFinalStat)
            this.setState({finalStatString: cappedFinalStatValue.toString()})
        }
        
    }

    render() {
        const {statType, baseStat, level, nature} = this.props
        const {evString, finalStatString} = this.state

        const evValueChanged = (evString: string) => {
            const evValue = parseInt(evString)
            if (isNaN(evValue))
                this.setState({evString: evString})
            else {
                const sanitizedEVValue = Clamp(evValue, 0, MAX_EV)
                this.setState({evString: sanitizedEVValue.toString()})
            } 
            this.recomputeLimits()
        }

        const finalStatValueChanged = (finalStatString: string) => {
            this.setState({finalStatString: finalStatString})
            this.recomputeLimits()
        }

        const ev = this.getEV()
        const natureMult = nature.getMultiplier(statType)
        const minFinalStat = computeMinFinalStat(statType, baseStat, ev, level, natureMult)
        const maxFinalStat = computeMaxFinalStat(statType, baseStat, ev, level, natureMult)
        const finalStat = parseInt(finalStatString)
        const actualFinalStat = isNaN(finalStat) ? minFinalStat : Clamp(finalStat, minFinalStat, maxFinalStat)

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
                        panelType={SliderPanelType.EV} 
                        min={0} 
                        max={MAX_EV} 
                        step={EV_STEP} 
                        currentValue={ev} 
                        labelText="EVs" 
                        onValueChanged={evValueChanged}
                    />

                    <SliderPanel 
                        key={level + " " + baseStat + " " + natureMult}
                        panelType={SliderPanelType.FinalStat} 
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