import React from "react"
import { getRGBColor, SliderPanelType } from "../../enums/SliderPanelType"
import "./IVRangePanel.css"

export interface IVRangeProps {
    optIVRange: [number, number] | undefined,
}

export class IVRangePanel extends React.Component<IVRangeProps> {
    render() {
        const {optIVRange} = this.props
        const range_text = optIVRange
            ? optIVRange[0] === optIVRange[1]
                ? optIVRange[0].toString()
                : optIVRange[0].toString() + " - " + optIVRange[1].toString()
            : "Error"
        return (
            <div 
                className={"stat-result-panel iv-range-panel"}
                style={{ background: '#' + getRGBColor(SliderPanelType.IV) + "D0" }}
            >
                <span className="label">Possible IVs</span>
                <span className="value">{range_text}</span>
            </div>)
    }
}