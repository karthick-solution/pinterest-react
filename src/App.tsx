import React, { Suspense } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoute from './_utils/PrivateRoute';
import CircularProgress from '@mui/material/CircularProgress';
import './App.css';
import PublicRoute from './_utils/PublicRoute';
import { AuthProvider } from './auth/AuthContext';

const Login = React.lazy(() => import('./main/sign-in/SignInPage'));
const Dashboard = React.lazy(() => import('./main/dashboards'));

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Suspense
          fallback={
            <div className="pt-3 text-center spinner-view-center">
              <CircularProgress />
            </div>
          }
        >
          <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
            {/* Public Routes */}
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
            </Route>

            {/* Private Routes */}
            <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={< Dashboard />} />
              {/* Define more private routes here */}
            </Route>

          </Routes>
        </Suspense>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
