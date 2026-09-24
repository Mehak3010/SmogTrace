import React from 'react';

import DriversPage from './DriversPage';
import SimulatorPage from './SimulatorPage';

export default function PredictionPage() {
  return (
    <div>

      {/* ML model drivers and interpretation */}
      <DriversPage />

      {/* What-if prediction simulator */}
      <SimulatorPage />

    </div>
  );
}