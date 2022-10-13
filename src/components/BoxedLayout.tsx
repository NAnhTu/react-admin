import { AppBar, Box, Container, GlobalStyles, IconButton, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Settings } from '@mui/icons-material';
import React, { useState } from 'react';

type BoxedLayoutProps = {
  children: React.ReactNode;
};

const BoxedLayout = ({ children }: BoxedLayoutProps) => {
  const theme = useTheme();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleSettingsToggle = () => {
    setSettingsOpen(!settingsOpen);
  };

  return (
    <React.Fragment>
      <GlobalStyles styles={{ body: { backgroundColor: theme.palette.background.paper } }} />
      <AppBar color='transparent' position='relative'>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton aria-label='settings' component='span' onClick={handleSettingsToggle}>
            <Settings />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container component='main' maxWidth='xs' sx={{ mt: 6 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {children}
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default BoxedLayout;
