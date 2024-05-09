import PropTypes from 'prop-types';
import { Checkbox, Chip, IconButton, Link, TableCell, TableRow, Stack, Typography } from '@mui/material';
import React from 'react';

// assets
import { alpha, useTheme } from '@mui/material/styles';
import Avatar from 'ui-component/extended/Avatar';
import { ImagePath, getImageUrl } from 'utils/getImageUrl';
import { ThemeMode } from 'config';

// assets
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import VisibilityTwoToneIcon from '@mui/icons-material/VisibilityTwoTone';

const FollowupTableBody = ({ labelId, handleClick }) => {
    const theme = useTheme();

    const date = new Date();

    // Static dummy data for a single row
    const dummyData = {
        id: 1,
        name: 'John',
        phone: '5555555',
        address: 'Kottawa',
        course: 'Computer Science'
    };

    // Static dummy data for chip color
    const chipcolor = alpha(theme.palette.success.light, 0.6);

    return (
        <TableRow hover role="checkbox" tabIndex={-1}>
            <TableCell padding="checkbox" sx={{ pl: 3 }} onClick={() => handleClick(dummyData.name)}>
                <Checkbox
                    color="primary"
                    inputProps={{
                        'aria-labelledby': labelId
                    }}
                />
            </TableCell>
            <TableCell id={labelId}>{dummyData.id}</TableCell>
            <TableCell>
                <Stack spacing={1.25} direction="row" alignItems="center" onClick={() => handleClick(dummyData.name)} sx={{ cursor: 'pointer' }}>
                    <Stack>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                            <Typography variant="h5">{dummyData.name}</Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </TableCell>
            <TableCell>
                <Link href="#">john@email.com</Link>
            </TableCell>
            <TableCell>{dummyData.phone}</TableCell>
            <TableCell>{date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()}</TableCell>
            <TableCell>{dummyData.address}</TableCell>
            <TableCell>
                <Chip
                    label={dummyData.course}
                    size="small"
                    sx={{ bgcolor: theme.palette.mode === ThemeMode.DARK ? 'dark.main' : chipcolor, color: 'success.dark', cursor: 'pointer' }}
                />
            </TableCell>
            <TableCell align="center" sx={{ pr: 3 }}>
                <IconButton color="secondary" size="large" aria-label="View">
                    <EditTwoToneIcon />
                </IconButton>
                <IconButton color="error" size="large" aria-label="View">
                    <DeleteTwoToneIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
};

FollowupTableBody.propTypes = {
    labelId: PropTypes.string,
    handleClick: PropTypes.func
};

export default FollowupTableBody;
