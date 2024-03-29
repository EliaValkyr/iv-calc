import React from "react"
import { getRGBColor, SliderPanelType } from "../../enums/SliderPanelType"
import { Clamp } from "../../utils"
import "./SliderPanel.css"
import { mdiChevronLeft, mdiChevronRight, mdiMenuLeft, mdiMenuRight } from '@mdi/js';
import Icon from "@mdi/react";


export interface SliderPanelProps {
    min: number,
    max: number,
    step: number,
    currentValue: number,
    labelText: string,
    panelType: SliderPanelType,
    onValueChanged: ((value: number) => void),
}

interface SliderPanelState {
    isMousePressed: boolean,
    valueWhenPressed: number,
    mouseOriginX: number,
}

export class SliderPanel extends React.Component<SliderPanelProps, SliderPanelState> {
    rootRef = React.createRef<HTMLDivElement>()
    wheelListener: any

    constructor(props: SliderPanelProps) {
        super(props)

        this.state = { isMousePressed: false, valueWhenPressed: this.props.currentValue, mouseOriginX: 0 }
    }

    componentDidMount() {
        this.wheelListener = (e: WheelEvent) => {
            const { step, currentValue, onValueChanged } = this.props
            e.preventDefault()
            const valueDelta = - step * Math.sign(e.deltaY)
            const newValue = currentValue + valueDelta
            onValueChanged(newValue)
        }
        this.rootRef.current!.addEventListener('wheel', this.wheelListener)
    }

    componentWillUnmount() {
        this.rootRef.current!.removeEventListener('wheel', this.wheelListener)
    }

    clickedExtremesButton(e: React.MouseEvent<HTMLDivElement>, value: number) {
        e.preventDefault()
        this.rootRef.current!.focus()
        e.stopPropagation()
        this.props.onValueChanged(value)
    }

    clickedStepButton(e: React.UIEvent<HTMLDivElement>, sign: number) {
        e.preventDefault()
        this.rootRef.current!.focus()
        e.stopPropagation()

        const { min, max, step, currentValue } = this.props
        this.props.onValueChanged(Clamp(currentValue + sign * step, min, max))
    }

    render() {
        const { min, max, step, currentValue, labelText, onValueChanged } = this.props

        const valueFrac = min === max ? 0.5 : Clamp((currentValue - min) / (max - min), 0, 1)

        const rgbColor = getRGBColor(this.props.panelType);
        return (
            <div
                ref={this.rootRef}
                className={"slider-panel"}
                tabIndex={0} // Add a tab index so that the slider is focusable.
                style={{
                    background: 'linear-gradient(90deg, #' + rgbColor + 'D0 ' + (100 * valueFrac) + '%, #' + rgbColor + '60 ' + (100 * valueFrac) + '%)',
                    cursor: 'ew-resize'
                }}
                onPointerDown={e => {
                    e.preventDefault()
                    this.rootRef.current!.focus()
                    e.currentTarget.setPointerCapture(e.pointerId)
                    this.setState({ isMousePressed: true, valueWhenPressed: this.props.currentValue, mouseOriginX: e.clientX - e.currentTarget.getBoundingClientRect().left })
                }}
                onPointerMove={e => {
                    if (this.state.isMousePressed) {
                        const rect = e.currentTarget.getBoundingClientRect()
                        const mouseCurrentX = e.clientX - rect.left
                        const totalWidth = rect.width
                        const relativeMovement = (mouseCurrentX - this.state.mouseOriginX) / totalWidth
                        const valueDelta = Math.round((max - min) * relativeMovement / this.props.step) * step
                        const newValue = Clamp(this.state.valueWhenPressed + valueDelta, min, max)
                        onValueChanged(newValue)
                    }
                }}
                onPointerUp={e => {
                    this.setState({ isMousePressed: false })
                }}
                onPointerCancel={e => {
                    this.setState({ isMousePressed: false })
                    onValueChanged(this.state.valueWhenPressed)
                }}
                onKeyDown={e => {
                    switch (e.key) {
                        case "ArrowDown":
                        case "ArrowLeft":
                            this.clickedStepButton(e, -1)
                            break
                        case "ArrowUp":
                        case "ArrowRight":
                            this.clickedStepButton(e, +1)
                            break
                    } 
                }}
            >
                <div
                    className="extremes-panel"
                    onPointerDown={e => {e.preventDefault(); e.stopPropagation()}}
                    onClick={e => this.clickedExtremesButton(e, min)}
                >
                    <span className="extremes-label">{min}</span>
                </div>
                <div className="stretch" />
                <div className="central-panel">
                    <div
                        className="step-panel left"
                        onPointerDown={e => {e.preventDefault(); e.stopPropagation()}}
                        onClick={e => this.clickedStepButton(e, -1)}
                    >
                        <Icon path={mdiMenuLeft} size={0.8}/>
                    </div>
                    <span className="central-label">{labelText + ": " + currentValue}</span>
                    <div
                        className="step-panel right"
                        onPointerDown={e => {e.preventDefault(); e.stopPropagation()}}
                        onClick={e => this.clickedStepButton(e, +1)}
                    >
                        <Icon path={mdiMenuRight} size={0.8}/>
                    </div>
                </div>
                <div className="stretch" />
                <div
                    className="extremes-panel"
                    onPointerDown={e => {e.preventDefault(); e.stopPropagation()}}
                    onClick={e => this.clickedExtremesButton(e, max)}
                >
                    <span className="extremes-label">{max}</span>
                </div>
            </div>)
    }
}