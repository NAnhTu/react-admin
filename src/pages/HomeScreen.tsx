import React, { useState } from 'react';
import reactLogo from '../assets/react.svg';
import { translations } from '../locales/translations';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { DarkMode, LightMode } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../contexts/SettingsProvider';

const HomeScreen = () => {
  const [count, setCount] = useState(0);

  const { t } = useTranslation();
  const { mode, changeMode } = useSettings();
  const handleModeChange = (_: any, mode: string) => {
    changeMode(mode);
  };
  return (
    <div className='App'>
      <div>
        <a href='https://vitejs.dev' target='_blank' rel='noreferrer'>
          <img src='/vite.svg' className='logo' alt='Vite logo' />
        </a>
        <a href='https://reactjs.org' target='_blank' rel='noreferrer'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>{t(translations.title)}</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
      <ToggleButtonGroup
        color='primary'
        value={mode}
        exclusive
        fullWidth
        onChange={handleModeChange}
      >
        <ToggleButton value='light' aria-label='light'>
          <LightMode />
        </ToggleButton>
        <ToggleButton value='dark' aria-label='dark'>
          <DarkMode />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default HomeScreen;
