// material-ui
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="https://sltc.ac.lk/" target="_blank" underline="hover">
        SLT Research University
        </Typography>
        <Typography variant="subtitle2" component={Link} href="https://c3e.tech/" target="_blank" underline="hover">
            &copy; CEEE Technologies
        </Typography>
    </Stack>
);

export default AuthFooter;
