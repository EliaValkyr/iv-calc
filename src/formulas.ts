import { MAX_IV, MAX_LEVEL } from "./constants"
import { StatType } from "./enums/StatType"

function computeScaledFinalStat(baseStat: number, ev: number, iv: number, level: number): number {
    const evStat: number = Math.floor(ev / 4)
    const unscaledStat: number = 2 * baseStat + iv + evStat
    const scaledStat: number = Math.floor(unscaledStat * level / MAX_LEVEL)
    return scaledStat
}

function computeHPFinalStat(baseStat: number, ev: number, iv: number, level: number): number {
    if (baseStat == 1)
        return 1; // Special case for Shedinja.
        
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

export function computeMinFinalStat(statType: StatType, baseStat: number, ev: number, level: number, natureMult: number): number {
    return computeFinalStat(statType, baseStat, ev, /*iv*/ 0, level, natureMult)
}

export function computeMaxFinalStat(statType: StatType, baseStat: number, ev: number, level: number, natureMult: number): number {
    return computeFinalStat(statType, baseStat, ev, MAX_IV, level, natureMult)
}

export function computeIVRange(statType: StatType, baseStat: number, ev: number, level: number, natureMult: number, desiredFinalStat: number): [number, number] {
    
    // Returns the smallest value in the [minValue, maxValue] range such that lessThanComparator(value) returns false.
    // Returns maxValue if none do.
    function lowerBound(minValue: number, maxValue: number, lessThanComparator: ((value: number) => boolean)) {
        while (minValue < maxValue) {
            const currentValue = minValue + Math.floor((maxValue - minValue) / 2)
            const result: boolean = lessThanComparator(currentValue)
            if (result) {
                // Comparator returned true: value is still too small.
                minValue = currentValue + 1

            } else {
                // Comparator returned false: value is not too small.
                maxValue = currentValue
            }
        }
        return minValue
    }
    const minValidIV = lowerBound(0, MAX_IV + 1, (ivValue: number) => { return computeFinalStat(statType, baseStat, ev, ivValue, level, natureMult) < desiredFinalStat })
    const minBiggerIV = lowerBound(0, MAX_IV + 1, (ivValue: number) => { return computeFinalStat(statType, baseStat, ev, ivValue, level, natureMult) < desiredFinalStat + 1 })
    return [minValidIV, minBiggerIV - 1]
}