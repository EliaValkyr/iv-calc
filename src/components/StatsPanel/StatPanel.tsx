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
    ev: number,
    level: number,
    nature: Nature,
    onEVValueChanged: ((value: number) => void),
}

interface StatPanelState {
    iv: number,
    finalStat: number,
}

export class StatPanel extends React.Component<StatPanelProps, StatPanelState> {

    constructor(props: StatPanelProps) {
        super(props)

        const { statType, baseStat, level, nature } = this.props
        this.state = { iv: 0, finalStat: computeFinalStat(statType, baseStat, /*ev*/ 0, /*iv*/ 0, level, nature.getMultiplier(statType)) }
    }

    static getDerivedStateFromProps(props: StatPanelProps, state: StatPanelState) {
        const { panelType, statType, baseStat, ev, level, nature } = props
        const { finalStat } = state

        if (panelType === CalculatorType.IVCalculator) {
            const natureMult = nature.getMultiplier(statType)
            const minFinalStat = computeMinFinalStat(statType, baseStat, ev, level, natureMult)
            const maxFinalStat = computeMaxFinalStat(statType, baseStat, ev, level, natureMult)
            const cappedFinalStat = Clamp(finalStat, minFinalStat, maxFinalStat)
            return { finalStat: cappedFinalStat }
        }
        return null; // No change to state
    }

    renderResultPanel(statCalcFinalStat: number, ivCalcOptIVRange: [number, number] | undefined) {
        if (this.props.panelType === CalculatorType.FinalStatCalculator) {
            return (<FinalStatValuePanel finalStat={statCalcFinalStat} />)
        } else {
            return (<IVRangePanel optIVRange={ivCalcOptIVRange} />)
        }
    }

    renderSecondSlider(ivCalcMinFinalStat: number, ivCalcMaxFinalStat: number, ivCalcFinalStat: number) {
        const { panelType, baseStat, level, nature } = this.props

        if (panelType === CalculatorType.FinalStatCalculator) {

            const ivValueChanged = (newIV: number) => {
                const sanitizedIV = Clamp(newIV, 0, MAX_IV)
                this.setState({ iv: sanitizedIV })
            }

            return (
                <SliderPanel
                    panelType={SliderPanelType.IV}
                    min={0}
                    max={MAX_IV}
                    step={1}
                    currentValue={this.state.iv}
                    labelText="IVs"
                    onValueChanged={ivValueChanged}
                />
            )
        } else {
            const finalStatValueChanged = (newFinalStat: number) => {
                this.setState({ finalStat: newFinalStat })
            }

            return (
                <SliderPanel
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
        const { statType, baseStat, ev, level, nature, onEVValueChanged } = this.props
        const { iv, finalStat } = this.state

        const natureMult = nature.getMultiplier(statType)

        // Needed for the IV Calculator.
        const ivCalcMinFinalStat = computeMinFinalStat(statType, baseStat, ev, level, natureMult)
        const ivCalcMaxFinalStat = computeMaxFinalStat(statType, baseStat, ev, level, natureMult)
        const ivCalcFinalStat = Clamp(finalStat, ivCalcMinFinalStat, ivCalcMaxFinalStat)
        const ivCalcOptIVRange = computeIVRange(statType, baseStat, ev, level, natureMult, ivCalcFinalStat)

        // Needed for the Final Stat Calculator.
        const statCalcFinalStat = computeFinalStat(statType, baseStat, ev, iv, level, natureMult)

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
                        onValueChanged={onEVValueChanged}
                    />

                    {this.renderSecondSlider(ivCalcMinFinalStat, ivCalcMaxFinalStat, ivCalcFinalStat)}
                </div>
                {this.renderResultPanel(statCalcFinalStat, ivCalcOptIVRange)}
            </div>
        )
    }
}