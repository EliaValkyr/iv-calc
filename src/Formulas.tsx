import { StatType } from "./enums/StatType"

function computeScaledFinalStat(baseStat: number, ev: number, iv: number, level: number): number {
    const evStat: number = Math.floor(ev / 4)
    const unscaledStat: number = 2 * baseStat + iv + evStat
    const scaledStat: number = Math.floor(unscaledStat * level / 100)
    return scaledStat
}

function computeHPFinalStat(baseStat: number, ev: number, iv: number, level: number): number {
    const hpStat: number = computeScaledFinalStat(baseStat, ev, iv, level) + level + 10
    return hpStat
}

function computeNonHPFinalStat(baseStat: number, ev: number, iv: number, level: number, natureMult: number): number {
    const otherStat: number = Math.floor((computeScaledFinalStat(baseStat, ev, iv, level) + 5) * natureMult)
    return otherStat
}

export function computeFinalStat(statType: StatType, baseStat: number, ev: number, iv: number, level: number, natureMult: number): number {
    switch (statType) {
        case StatType.HP:
            return computeHPFinalStat(baseStat, ev, iv, level)
        case StatType.Attack:
        case StatType.Defence:
        case StatType.SpAttack:
        case StatType.SpDefence:
        case StatType.Speed:
            return computeNonHPFinalStat(baseStat, ev, iv, level, natureMult)
        default:
            console.error("computeFinalStat: Unexpected stat type: " + statType)
            return 0
    }
}

