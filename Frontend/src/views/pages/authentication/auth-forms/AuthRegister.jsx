import React, { useEffect } from 'react';
import { useDispatch } from 'store';
import { Link, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { openSnackbar } from 'store/slices/snackbar';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

//Function to check password strength
const checkPasswordStrength = (password) => {
    let strength = 0;

    // Check for 3 capital letters
    if (/[A-Z].*[A-Z].*[A-Z]/.test(password)) {
        strength += 1;
    }

    // Check for minimum 3 numbers
    if (/\d{3}/.test(password)) {
        strength += 1;
    }

    // Check for 5 capital letters, 3 lowercase letters, and 4 numbers
    if (/[A-Z].*[A-Z].*[A-Z].*[A-Z].*[A-Z]/.test(password) && /[a-z].*[a-z].*[a-z]/.test(password) && /\d{4}/.test(password)) {
        strength += 1;
    }

    // If none of the above criteria met, classify as weak
    if (strength === 0) {
        return 0; // Weak
    }

    return strength;
};


// ===========================|| FIREBASE - REGISTER ||=========================== //

const JWTRegister = ({ ...others }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const scriptedRef = useScriptRef();
    const dispatch = useDispatch();

    const [showPassword, setShowPassword] = React.useState(false);
    const [checked, setChecked] = React.useState(true);

    const [strength, setStrength] = React.useState(0);
    const [level, setLevel] = React.useState({ color: 'error.main', label: 'Weak' });
    const { register } = useAuth();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

   

    const changePassword = (value) => {
        const tempStrength = checkPasswordStrength(value);
        setStrength(tempStrength);

        // Set password strength level based on strength score
        let tempLevel;
        if (tempStrength === 0) {
            tempLevel = { color: 'error.main', label: 'Weak' };
        } else if (tempStrength === 1) {
            tempLevel = { color: 'warning.main', label: 'Normal' };
        } else if (tempStrength === 2) {
            tempLevel = { color: 'success.dark', label: 'Strong' };
        } else if (tempStrength === 3) {
            tempLevel = { color: 'success.main', label: 'Very Strong' };
        }
        setLevel(tempLevel);
    };
    

    useEffect(() => {
        // Initialize password strength check with default password
        changePassword('123456');
    }, []);

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Sign up with Email address</Typography>
                    </Box>
                </Grid>
            </Grid>

            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    phone_no: '',
                    submit: null
                }}
                // validations
                validationSchema={Yup.object().shape({
                    // First Name
                    firstName: Yup.string()
                    .max(100, 'First name will be maximum 100 letters')
                    .min(5, 'First name will be least 5 letters')
                    .required('First Name is required'),
                    // Last Name
                    lastName: Yup.string()
                    .max(100, 'Last name will be maximum 100 letters')
                    .min(5, 'Last name will be least 5 letters')
                    .required('Last Name is required'),
                    // Phone number
                    phone_no: Yup.string()
                    .matches(/^[0-9]+$/, 'Phone number cannot contain letters or symbols')
                    .max(11, 'Phone number should be maximum 10 digits.')
                    .min(9, 'Phone number should be minimum 9 digits.'),
                    // E-mail
                    email: Yup.string()
                    .email('Must be a valid email')
                    .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Invalid email format')
                    .transform(value => value.toLowerCase())
                    .trim()
                    .required('Email is required'),
                    // Password
                    password: Yup.string()
                    .max(255, 'Password should not exceed 255 characters')
                    .required('Password is required')
                    .test('uppercase', 'Password should contain at least 3 capital letters', value => {
                        return (value.match(/[A-Z]/g) || []).length >= 3;
                    })
                    .test('numbers', 'Password should contain at least 3 numbers', value => {
                        return (value.match(/\d/g) || []).length >= 3;
                    })
                    .test('complexity', 'Password does not meet complexity requirements', value => {
                        return checkPasswordStrength(value) >= 2; // 2 is the strength score for a strong password
                    })
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        await register(values.email, values.password, values.firstName, values.lastName);
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                            dispatch(
                                openSnackbar({
                                    open: true,
                                    message: 'Your registration has been successfully completed.',
                                    variant: 'alert',
                                    alert: {
                                        color: 'success'
                                    },
                                    close: false
                                })
                            );

                            setTimeout(() => {
                                navigate('/login', { replace: true });
                            }, 1500);
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <Grid container spacing={{ xs: 0, sm: 2 }}>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={Boolean(touched.firstName && errors.firstName)} sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="outlined-adornment-phone-number-register">First Name</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-first-name-register"
                                    type="text"
                                    value={values.firstName}
                                    name="firstName"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    inputProps={{}}
                                />
                                {touched.firstName && errors.firstName && (
                                    <FormHelperText error id="standard-weight-helper-text--register">
                                        {errors.firstName}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth error={Boolean(touched.lastName && errors.lastName)} sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="outlined-adornment-phone-number-register">Last Name</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-last-name-register"
                                        type="text"
                                        value={values.lastName}
                                        name="lastName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.lastName && errors.lastName && (
                                        <FormHelperText error id="standard-weight-helper-text--register">
                                            {errors.lastName}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <FormControl fullWidth error={Boolean(touched.phone_no && errors.phone_no)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-phone-number-register">Phone Number</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-phone-number-register"
                                type="number"
                                value={values.phone_no}
                                name="phone_no"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.phone_no && errors.phone_no && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.phone_no}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-register"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text--register">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-register"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                label="Password"
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    handleChange(e);
                                    changePassword(e.target.value);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-register">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {strength !== 0 && (
                            <FormControl fullWidth>
                                <Box sx={{ mb: 2 }}>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item>
                                            <Box sx={{ width: 85, height: 8, borderRadius: '7px', bgcolor: level?.color }} />
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="subtitle1" fontSize="0.75rem">
                                                {level?.label}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </FormControl>
                        )}

                        <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checked}
                                            onChange={(event) => setChecked(event.target.checked)}
                                            name="checked"
                                            color="primary"
                                        />
                                    }
                                    label={
                                        <Typography variant="subtitle1">
                                            Agree with &nbsp;
                                            <Typography variant="subtitle1" component={Link} to="#">
                                                Terms & Condition.
                                            </Typography>
                                        </Typography>
                                    }
                                />
                            </Grid>
                        </Grid>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Sign up
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default JWTRegister;
