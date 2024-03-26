// eslint-disable-next-line no-unused-vars
import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import MuiAppBar from '@mui/material/AppBar';
import SearchIcon from '@mui/icons-material/Search';
import { styled, useTheme } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Box, Stack, alpha } from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';

const drawerWidth = 240;

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const StyledAppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

// eslint-disable-next-line react/prop-types
export default function TopBar({ handleDrawerOpen, open, setMode }) {
    const theme = useTheme();

    return (
        <StyledAppBar position="fixed" open={open}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>

                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <Box flexGrow={1} />

                <Stack direction="row" spacing={2}>
                    {theme.palette.mode === 'dark' ? (
                        <IconButton
                            onClick={() => {
                                localStorage.setItem('mode',  theme.palette.mode === 'dark' ? 'light' : 'dark');
                                setMode((prevMode) =>
                                    prevMode === 'light' ? 'dark' : 'light'
                                );
                            }}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <LightModeOutlinedIcon />
                        </IconButton>
                    ) : (
                        <IconButton
                            onClick={() => {
                                setMode((prevMode) =>
                                    prevMode === 'light' ? 'dark' : 'light'
                                );
                                localStorage.setItem('mode',  theme.palette.mode === 'dark' ? 'light' : 'dark');
                            }}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <DarkModeOutlinedIcon />
                        </IconButton>
                    )}

                    <IconButton color="inherit" aria-label="search">
                        <SettingsOutlinedIcon />
                    </IconButton>
                    <IconButton color="inherit" aria-label="notifications">
                        <NotificationsNoneOutlinedIcon />
                    </IconButton>
                    <IconButton color="inherit" aria-label="notifications">
                        <Person2OutlinedIcon />
                    </IconButton>
                </Stack>
            </Toolbar>
        </StyledAppBar>
    );
}
