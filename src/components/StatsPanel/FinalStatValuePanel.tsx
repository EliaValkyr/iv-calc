import React from "react"
import { getRGBColor, SliderPanelType } from "../../enums/SliderPanelType"
import "./FinalStatValuePanel.css"

export interface FinalStatValueProps {
    finalStat: number,
}

export class FinalStatValuePanel extends React.Component<FinalStatValueProps> {
    render() {
        const {finalStat} = this.props
        return (
            <div 
                className={"stat-result-panel final-stat-value-panel"}
                style={{ background: '#' + getRGBColor(SliderPanelType.FinalStat) + "D0" }}
            >
                <span className="label">Final Stat</span>
                <span className="value">{finalStat}</span>
            </div>)
    }
}