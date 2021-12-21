export enum SliderPanelType {
    FinalStat,
    EV,
    IV
}

export function getRGBColor(panelType: SliderPanelType): string {
    switch (panelType) {
        case SliderPanelType.FinalStat:
            return "ffcb47"
        case SliderPanelType.EV:
            return "227c9d"
        case SliderPanelType.IV:
            return "ba324f"
    }
    return "000000"
}
