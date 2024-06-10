
import BlocksNav from '../src/app/components/navigation'
import Example from '../src/app/components/Technologist/sonographers'
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    
    <Box
      sx={{
        display: 'flex',
        width: '10%',
        alignItems: 'center',
        justifyContent: 'space-around',
        bgcolor: 'background.default',
        color: 'text.primary',
        borderRadius: 40,
        float:'inline-end',
        margiBottom: "10px",
        p: 1,
      }}
    >
      {theme.palette.mode} mode
      <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
   
  );
}


export default function Sonographers() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
    return (
        <> 
        <div className="title">
      <h3>Sonographers Page </h3>
      </div> 
      <> 
          &nbsp;
          &nbsp;
          &nbsp;
          </>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <MyApp />
          <div className="space"></div>
      <BlocksNav />
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      <Example />
      </ThemeProvider>
      </ColorModeContext.Provider>
  </>
    )
  }