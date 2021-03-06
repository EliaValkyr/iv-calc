import React from 'react';
import "./NatureAutocomplete.css"
import Autocomplete from '@mui/material/Autocomplete';
import { Nature, natureArray } from '../../nature';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';

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
                onChange={(event, newNature) => {
                    this.props.onNatureChanged(newNature ? newNature!.mName : "")
                }}
                inputValue={this.props.natureString}
                onInputChange={(event, newInputValue) => {
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
                        <span className="nature-autocomplete-detail-text">{nature.mIncreasedStat || nature.mDecreasedStat ? "(" : ""}</span>
                        <span className="nature-autocomplete-detail-text" style={{ color: 'green' }}>{nature.mIncreasedStat ? "+" + nature.mIncreasedStat : ""}</span>
                        <span className="nature-autocomplete-detail-text">{nature.mIncreasedStat && nature.mDecreasedStat ? "," : ""}</span>{" "}
                        <span className="nature-autocomplete-detail-text" style={{ color: 'red' }}>{nature.mDecreasedStat ? "-" + nature.mDecreasedStat : ""}</span>
                        <span className="nature-autocomplete-detail-text">{nature.mIncreasedStat || nature.mDecreasedStat ? ")" : ""}</span>
                    </Box>
                )}
            />
        )
    }
}