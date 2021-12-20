import { NATURE_DECREASE_MULT, NATURE_INCREASE_MULT } from "./constants";
import { StatType } from "./enums/StatType";

export class Nature {
    mName: string
    mIncreasedStat?: StatType
    mDecreasedStat?: StatType

    constructor(name: string, increasedStat?: StatType, decreasedStat?: StatType) {
        this.mName = name
        this.mIncreasedStat = increasedStat
        this.mDecreasedStat = decreasedStat
    }

    getMultiplier(statType: StatType): number {
        if (statType === this.mIncreasedStat)
            return NATURE_INCREASE_MULT
        if (statType === this.mDecreasedStat)
            return NATURE_DECREASE_MULT
        return 1
    }
}

export const natureArray = [
    new Nature("Lonely", StatType.Attack, StatType.Defense),
    new Nature("Adamant", StatType.Attack, StatType.SpAttack),
    new Nature("Naughty", StatType.Attack, StatType.SpDefense),
    new Nature("Brave", StatType.Attack, StatType.Speed),
    new Nature("Bold", StatType.Defense, StatType.Attack),
    new Nature("Impish", StatType.Defense, StatType.SpAttack),
    new Nature("Lax", StatType.Defense, StatType.SpDefense),
    new Nature("Relaxed", StatType.Defense, StatType.Speed),
    new Nature("Modest", StatType.SpAttack, StatType.Attack),
    new Nature("Mild", StatType.SpAttack, StatType.Defense),
    new Nature("Rash", StatType.SpAttack, StatType.SpDefense),
    new Nature("Quiet", StatType.SpAttack, StatType.Speed),
    new Nature("Calm", StatType.SpDefense, StatType.Attack),
    new Nature("Gentle", StatType.SpDefense, StatType.Defense),
    new Nature("Careful", StatType.SpDefense, StatType.SpAttack),
    new Nature("Sassy", StatType.SpDefense, StatType.Speed),
    new Nature("Timid", StatType.Speed, StatType.Attack),
    new Nature("Hasty", StatType.Speed, StatType.Defense),
    new Nature("Jolly", StatType.Speed, StatType.SpAttack),
    new Nature("Naive", StatType.Speed, StatType.SpDefense),
    new Nature("Hardy"),
    new Nature("Docile"),
    new Nature("Bashful"),
    new Nature("Quirky"),
    new Nature("Serious"),
]
