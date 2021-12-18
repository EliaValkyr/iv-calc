import React from "react"
import "./IVRangePanel.css"

export interface IVRangeProps {
    minIV: number,
    maxIV: number,
}

export class IVRangePanel extends React.Component<IVRangeProps> {
    render() {
        const {minIV, maxIV} = this.props
        return (
            <div className={"iv-range-panel"}>
            <span className="label">IV Range</span>
            <span className="label">{minIV == maxIV ? minIV : minIV + " - " + maxIV}</span>
            </div>)
    }
}