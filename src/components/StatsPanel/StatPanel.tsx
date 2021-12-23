import React from "react"
import "./StatPanel.css"
import { SliderPanel } from "./SliderPanel"
import { StatType } from "../../enums/StatType"
import { computeFinalStat, computeIVRange, computeMaxFinalStat, computeMinFinalStat } from "../../formulas"
import { IVRangePanel } from "./IVRangePanel"
import { BaseStatPanel } from "./BaseStatPanel"
import { EV_STEP, MAX_EV, MAX_IV } from "../../constants"
import { Clamp } from "../../utils"
import { Nature } from "../../nature"
import { SliderPanelType } from "../../enums/SliderPanelType"
import { CalculatorType } from "../../enums/CalculatorType"
import { FinalStatValuePanel } from "./FinalStatValuePanel"

export interface StatPanelProps {
    panelType: CalculatorType,
    statType: StatType,
    baseStat: number,
    level: number,
    nature: Nature,
}

interface StatPanelState {
    ivString: string
    evString: string,
    finalStatString: string,
}

export class StatPanel extends React.Component<StatPanelProps, StatPanelState> {

    constructor(props: StatPanelProps) {
        super(props)

        const { statType, baseStat, level, nature } = this.props
        const finalStat = computeMinFinalStat(statType, baseStat, /*ev*/ 0, level, nature.getMultiplier(statType))
        this.state = { ivString: '0', evString: '0', finalStatString: finalStat.toString() }
    }

    getEV(): number {
        const ev = parseInt(this.state.evString)
        return isNaN(ev) ? 0 : ev
    }

    getIV(): number {
        const iv = parseInt(this.state.ivString)
        return isNaN(iv) ? 0 : iv
    }

    recomputeLimits() {
        const { panelType, statType, baseStat, level, nature } = this.props
        const { finalStatString } = this.state

        if (panelType === CalculatorType.IVCalculator) {
            const finalStat = parseInt(finalStatString)
            if (isNaN(finalStat)) {
                const natureMult = nature.getMultiplier(statType)

                const minFinalStat = computeMinFinalStat(statType, baseStat, this.getEV(), level, natureMult)
                const maxFinalStat = computeMaxFinalStat(statType, baseStat, this.getEV(), level, natureMult)
                const cappedFinalStatValue = Clamp(finalStat, minFinalStat, maxFinalStat)
                this.setState({ finalStatString: cappedFinalStatValue.toString() })
            }
        }

    }

    renderResultPanel(statCalcFinalStat: number, ivCalcOptIVRange: [number, number] | undefined) {
        if (this.props.panelType === CalculatorType.FinalStatCalculator) {
            return (<FinalStatValuePanel finalStat={statCalcFinalStat} />)
        } else {
            return (<IVRangePanel optIVRange={ivCalcOptIVRange} />)
        }
    }

    renderSecondSlider(ivCalcMinFinalStat: number, ivCalcMaxFinalStat: number, ivCalcFinalStat: number) {
        const { statType, baseStat, level, nature } = this.props

        if (this.props.panelType === CalculatorType.FinalStatCalculator) {

            const ivValueChanged = (ivString: string) => {
                const ivValue = parseInt(ivString)
                if (isNaN(ivValue))
                    this.setState({ ivString: ivString })
                else {
                    const sanitizedIVValue = Clamp(ivValue, 0, MAX_IV)
                    this.setState({ ivString: sanitizedIVValue.toString() })
                }
                this.recomputeLimits()
            }

            return (
                <SliderPanel
                    panelType={SliderPanelType.IV}
                    min={0}
                    max={MAX_IV}
                    step={1}
                    currentValue={this.getIV()}
                    labelText="IVs"
                    onValueChanged={ivValueChanged}
                />
            )
        } else {

            const finalStatValueChanged = (finalStatString: string) => {
                this.setState({ finalStatString: finalStatString })
                this.recomputeLimits()
            }

            return (
                <SliderPanel
                    key={level + " " + baseStat + " " + nature}
                    panelType={SliderPanelType.FinalStat}
                    min={ivCalcMinFinalStat}
                    max={ivCalcMaxFinalStat}
                    step={1}
                    currentValue={ivCalcFinalStat}
                    labelText="Stat"
                    onValueChanged={finalStatValueChanged}
                />
            )
        }
    }

    render() {
        const { statType, baseStat, level, nature } = this.props
        const { evString, finalStatString } = this.state

        const evValueChanged = (evString: string) => {
            const evValue = parseInt(evString)
            if (isNaN(evValue))
                this.setState({ evString: evString })
            else {
                const sanitizedEVValue = Clamp(evValue, 0, MAX_EV)
                this.setState({ evString: sanitizedEVValue.toString() })
            }
            this.recomputeLimits()
        }

        const ev = this.getEV()
        const natureMult = nature.getMultiplier(statType)

        // Needed for the IV Calculator.
        const ivCalcMinFinalStat = computeMinFinalStat(statType, baseStat, ev, level, natureMult)
        const ivCalcMaxFinalStat = computeMaxFinalStat(statType, baseStat, ev, level, natureMult)
        const ivCalcFinalStat = parseInt(finalStatString)
        const ivCalcActualFinalStat = isNaN(ivCalcFinalStat) ? ivCalcMinFinalStat : Clamp(ivCalcFinalStat, ivCalcMinFinalStat, ivCalcMaxFinalStat)
        const ivCalcOptIVRange = computeIVRange(statType, baseStat, ev, level, natureMult, ivCalcActualFinalStat)

        // Needed for the Final Stat Calculator.
        const statCalcIV = this.getIV()
        const statCalcFinalStat = computeFinalStat(statType, baseStat, ev, statCalcIV, level, natureMult)


        return (
            <div className="stat-panel">
                <BaseStatPanel
                    statType={statType}
                    baseStat={baseStat}
                    natureMult={natureMult}
                />
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

                    {this.renderSecondSlider(ivCalcMinFinalStat, ivCalcMaxFinalStat, ivCalcActualFinalStat)}
                </div>
                {this.renderResultPanel(statCalcFinalStat, ivCalcOptIVRange)}
            </div>
        )
    }
}