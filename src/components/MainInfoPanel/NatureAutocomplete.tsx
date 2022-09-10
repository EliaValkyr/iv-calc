import React from 'react';
import "./NatureAutocomplete.css"
import Autocomplete from '@mui/material/Autocomplete';
import { Nature, natureArray } from '../../nature';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { STATS_SPRITE_FOLDER } from '../../constants';

export interface NatureAutocompleteProps {
    natureString: string,
    onNatureChanged: ((nature: string) => void),
}

export class NatureAutocomplete extends React.Component<NatureAutocompleteProps> {

    render() {
        const natureData: Nature | undefined = natureArray.find(x => x.mName.toLowerCase() === this.props.natureString.toLowerCase())

        return (
            <Autocomplete
                classes={{ root: 'nature-autocomplete', option: 'nature-autocomplete-item' }}
                options={natureArray}
                getOptionLabel={(nature) => nature.mName}
                value={natureData}
                onChange={(_, newNature) => {
                    this.props.onNatureChanged(newNature ? newNature!.mName : "")
                }}
                inputValue={this.props.natureString}
                onInputChange={(_, newInputValue) => {
                    if (newInputValue === (natureData ? natureData!.mName : ""))
                        return

                    this.props.onNatureChanged(newInputValue)
                }}
                isOptionEqualToValue={(option, value) => {
                    return value !== undefined && option.mName === value.mName
                }}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        variant="standard"
                        label="Nature"
                    />
                }
                renderOption={(props, nature) => (
                    <Box
                        component="li"
                        {...props}
                    >
                        <span className="nature-autocomplete-text">{nature.mName}</span>
                        <div className="nature-autocomplete-stats">
                            {
                                nature.mIncreasedStat ? 
                                    <img
                                        alt="Increased Stat"
                                        decoding="async"
                                        src={STATS_SPRITE_FOLDER + nature.mIncreasedStat + "Up.gif"}
                                    />
                                    : null
                            }
                            {
                                nature.mDecreasedStat ? 
                                    <img
                                        alt="Decreased Stat"
                                        decoding="async"
                                        src={STATS_SPRITE_FOLDER + nature.mDecreasedStat + "Down.gif"}
                                    />
                                    : null
                            }
                        </div>
                    </Box>
                )}
            />
        )
    }
}