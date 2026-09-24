import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';

import OverviewPage from './pages/OverviewPage';
import FireAirQualityPage from './pages/FireAirQualityPage';
import GeographyPage from './pages/GeographyPage';
import PredictionPage from './pages/PredictionPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* Default page */}
        <Route
          index
          element={<Navigate to="/overview" replace />}
        />

        {/* Main dashboard pages */}
        <Route
          path="overview"
          element={<OverviewPage />}
        />

        <Route
          path="fire-air-quality"
          element={<FireAirQualityPage />}
        />

        <Route
          path="geography"
          element={<GeographyPage />}
        />

        <Route
          path="prediction"
          element={<PredictionPage />}
        />

        {/* Unknown routes */}
        <Route
          path="*"
          element={<Navigate to="/overview" replace />}
        />

      </Route>
    </Routes>
  );
}