import React from 'react';

import TrendsPage from './TrendsPage';
import SignalPage from './SignalPage';

export default function FireAirQualityPage() {
  return (
    <div>

      {/* Fire activity + PM2.5 trends */}
      <TrendsPage />

      {/* Relationship between fires and air quality */}
      <SignalPage />

    </div>
  );
}