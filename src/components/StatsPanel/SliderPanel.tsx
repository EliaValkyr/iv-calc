import React from "react"
import { getRGBColor, SliderPanelType } from "../../enums/SliderPanelType"
import { Clamp } from "../../utils"
import "./SliderPanel.css"

export interface SliderPanelProps {
    min: number,
    max: number,
    step: number,
    currentValue: number,
    labelText: string,
    panelType: SliderPanelType,
    onValueChanged: ((value: string) => void),
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

        this.state = {isMousePressed: false, valueWhenPressed: this.props.currentValue, mouseOriginX: 0}
    }

    componentDidMount() {
        this.wheelListener = (e: WheelEvent) => {
            const {step, currentValue, onValueChanged} = this.props
            e.preventDefault()
            const valueDelta = - step * Math.sign(e.deltaY)
            const newValue = currentValue + valueDelta
            onValueChanged(newValue.toString())
        }
        this.rootRef.current!.addEventListener('wheel', this.wheelListener)
    }

    componentWillUnmount() {
        this.rootRef.current!.removeEventListener('wheel', this.wheelListener)
    }

    clickedExtremesButton(e: React.PointerEvent<HTMLDivElement>, value: number) {
        e.preventDefault()
        e.stopPropagation()
        this.props.onValueChanged(value.toString())
    }

    render() {
        const {min, max, step, currentValue, labelText, onValueChanged} = this.props

        const valueFrac = min === max ? 0.5 : Clamp((currentValue - min) / (max - min), 0, 1)

        const rgbColor = getRGBColor(this.props.panelType);
        return (
            <div
                ref={this.rootRef}
                className={"slider-panel"}
                style={{ 
                    background: 'linear-gradient(90deg, #' + rgbColor + 'D0 ' + (100 * valueFrac) + '%, #' + rgbColor + '60 ' + (100 * valueFrac) + '%)',
                    cursor: 'ew-resize'
                }}
                onPointerDown={e => {
                    e.preventDefault()
                    e.currentTarget.setPointerCapture(e.pointerId)
                    this.setState({isMousePressed: true, valueWhenPressed: this.props.currentValue, mouseOriginX: e.clientX - e.currentTarget.getBoundingClientRect().left})
                }}
                onPointerMove={e => {
                    if (this.state.isMousePressed) {
                        const rect = e.currentTarget.getBoundingClientRect()
                        const mouseCurrentX = e.clientX - rect.left
                        const totalWidth = rect.width
                        const relativeMovement = (mouseCurrentX - this.state.mouseOriginX) / totalWidth
                        const valueDelta = Math.round((max - min) * 1.5 * relativeMovement / this.props.step) * step
                        const newValue = Clamp(this.state.valueWhenPressed + valueDelta, min, max)
                        onValueChanged(newValue.toString())
                    }
                }}
                onPointerUp={e => {
                    this.setState({isMousePressed: false})
                }}
                onPointerCancel={e => {
                    this.setState({isMousePressed: false})
                    onValueChanged(this.state.valueWhenPressed.toString())
                }}
            >
                <div
                    className="extremes-panel"
                    onPointerDown={e => this.clickedExtremesButton(e, min)}
                >
                    <span className="extremes-label">{min}</span>
                </div>
                <div className="stretch"/>
                <div className="central-panel">
                    <span className="central-label">{labelText + ":"}</span>
                    <input 
                        className="spinbox"
                        type="number" 
                        min={min} 
                        max={max} 
                        step={step}
                        value={currentValue}
                        onInput={(e) => onValueChanged(e.currentTarget.value)} 
                        onPointerDown={(e) => e.stopPropagation()}
                    />
                </div>
                <div className="stretch"/>
                <div
                    className="extremes-panel"
                    onPointerDown={e => this.clickedExtremesButton(e, max)}
                >
                    <span className="extremes-label">{max}</span>
                </div>
            </div>)
    }
}