import React from 'react';
import "./AllBaseStatsPanel.css"
import { StatPanel } from './StatPanel';
import { StatType } from '../enums/StatType';

export interface AllBaseStatsPanelProps {
    level: number,
}

export interface AllBaseStatsPanelState {

}

export class AllBaseStatsPanel extends React.Component<AllBaseStatsPanelProps, AllBaseStatsPanelState> {
    render() {
        const {level} = this.props
        return (
            <div className="container">
                <div className="all-base-stats-panel">
                    <StatPanel statType={StatType.HP} baseStat={100} level={level} natureMult={1}/>
                    <StatPanel statType={StatType.Attack} baseStat={100} level={level} natureMult={1}/>
                    <StatPanel statType={StatType.Defence} baseStat={100} level={level} natureMult={1}/>
                    <StatPanel statType={StatType.SpAttack} baseStat={100} level={level} natureMult={1}/>
                    <StatPanel statType={StatType.SpDefence} baseStat={100} level={level} natureMult={1}/>
                    <StatPanel statType={StatType.Speed} baseStat={100} level={level} natureMult={1}/>
                </div>
            </div >
        )
    }
}
