import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './views/Dashboard';
import RequireAuth from './common/Authentication/RequireAuth';
import Login from './views/authentication/login';
import Register from './views/house/register';
import { LayoutProvider } from './layout/Layout';
import VideoTranscript from './views/capstone/VideoTranscript';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <ThemeProvider>
        <LayoutProvider>
          <div className="container-fluid">
            <Routes>
              <Route path='/' element={<VideoTranscript/>} />
            </Routes>
          </div>
          </LayoutProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
