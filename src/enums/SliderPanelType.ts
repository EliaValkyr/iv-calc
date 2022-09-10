export enum SliderPanelType {
    FinalStat,
    EV,
    IV
}

export function getRGBColor(panelType: SliderPanelType): string {
    switch (panelType) {
        case SliderPanelType.FinalStat:
            return "FFc125"
        case SliderPanelType.EV:
            return "0070FF"
        case SliderPanelType.IV:
            return "E60015"
    }
    return "000000"
}
