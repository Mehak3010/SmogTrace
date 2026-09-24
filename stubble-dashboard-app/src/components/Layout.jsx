import React, { useMemo } from 'react';
import {
  NavLink,
  Outlet,
  useLocation
} from 'react-router-dom';

import {
  Flame,
  Wind,
  TrendingUp,
  AlertTriangle,
  LayoutDashboard,
  Activity,
  Map,
  BrainCircuit,
  Info
} from 'lucide-react';

import {
  DAILY,
  LAG_CORR,
  METRICS
} from '../data';

import {
  COLORS,
  sans,
  aqiColor,
  aqiLabel
} from '../theme';

import { KpiCard } from './Shared';

import './Layout.css';


export const NAV_ITEMS = [
  {
    to: '/overview',
    label: 'Overview',
    icon: LayoutDashboard
  },
  {
    to: '/fire-air-quality',
    label: 'Fire & Air Quality',
    icon: Activity
  },
  {
    to: '/geography',
    label: 'Geography',
    icon: Map
  },
  {
    to: '/prediction',
    label: 'Prediction & Simulator',
    icon: BrainCircuit
  }
];


export default function Layout() {

  const location = useLocation();

  const isOverview =
    location.pathname === '/overview' ||
    location.pathname === '/';


  /*
   * Calculate dashboard KPIs
   */
  const totalFires = useMemo(
    () =>
      DAILY.reduce(
        (sum, day) => sum + day.fire_count,
        0
      ),
    []
  );


  const peakDay = useMemo(
    () =>
      DAILY.reduce(
        (highest, current) =>
          current.avg_pm25 > highest.avg_pm25
            ? current
            : highest,
        DAILY[0]
      ),
    []
  );


  const sameDayCorr = LAG_CORR[0].corr;


  return (
    <div
      className="app-shell"
      style={{
        background: COLORS.canvas,
        minHeight: '100vh',
        fontFamily: sans,
        color: COLORS.text
      }}
    >

      {/* =========================================
          SIDEBAR
      ========================================= */}

      <aside
        className="sidebar"
        style={{
          background: COLORS.panel,
          borderColor: COLORS.hair
        }}
      >

        {/* Brand */}
        <div className="brand-block">

          <div
            className="brand-mark"
            style={{ color: COLORS.ember }}
          >
            <Flame size={18} />
          </div>

          <div>
            <div className="brand-name">
              STUBBLE
            </div>

            <div className="brand-sub">
              BURNING / DELHI SMOG
            </div>
          </div>

        </div>


        <div
          className="sidebar-rule"
          style={{ background: COLORS.hair }}
        />


        {/* Navigation heading */}
        <div
          className="nav-caption"
          style={{ color: COLORS.textDim }}
        >
          ANALYSIS
        </div>


        {/* Navigation */}
        <nav className="side-nav">

          {NAV_ITEMS.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="side-link"

                style={({ isActive }) => ({
                  background: isActive
                    ? COLORS.ember
                    : 'transparent',

                  color: isActive
                    ? '#1A0D08'
                    : COLORS.textMute,

                  borderColor: isActive
                    ? COLORS.ember
                    : 'transparent'
                })}
              >

                <Icon size={15} />

                <span>
                  {item.label}
                </span>

              </NavLink>
            );

          })}

        </nav>


        {/* Sidebar bottom information */}
        <div className="sidebar-bottom">

          <div
            className="sidebar-rule"
            style={{ background: COLORS.hair }}
          />


          <div
            className="source-note"
            style={{ color: COLORS.textDim }}
          >

            <Info size={13} />

            <span>
              NASA FIRMS · OpenAQ
              <br />
              Punjab / Haryana → Delhi-NCR
            </span>

          </div>


          <div
            className="season-badge"
            style={{
              color: COLORS.good,
              borderColor: COLORS.hair
            }}
          >

            <span
              className="live-dot"
              style={{
                background: COLORS.good
              }}
            />

            4 SEASONS · 2022–2025

          </div>

        </div>

      </aside>


      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <main className="main-content">

        <div className="content-header">

          <div>

            <div
              className="eyebrow"
              style={{ color: COLORS.haze }}
            >
              NASA FIRMS VIIRS · OPENAQ PM2.5 ·
              PUNJAB / HARYANA → DELHI-NCR
            </div>

            <h1>
              Stubble burning → Delhi smog
            </h1>

          </div>

        </div>


        {/* =========================================
            OVERVIEW KPIs
        ========================================= */}

        {isOverview && (

          <div className="kpi-grid">

            <KpiCard
              icon={Flame}
              label="Fires detected"
              value={totalFires.toLocaleString()}
              sub="VIIRS NOAA-20, Oct-Nov, 4 seasons"
              accent={COLORS.ember}
            />


            <KpiCard
              icon={AlertTriangle}
              label="Peak PM2.5"
              value={`${Math.round(peakDay.avg_pm25)}`}
              sub={`${peakDay.date} · ${aqiLabel(peakDay.avg_pm25)}`}
              accent={aqiColor(peakDay.avg_pm25)}
            />


            <KpiCard
              icon={Wind}
              label="Same-day signal"
              value={sameDayCorr.toFixed(2)}
              sub="Fire count vs Delhi PM2.5"
              accent={COLORS.haze}
            />


            <KpiCard
              icon={TrendingUp}
              label="Model R²"
              value={METRICS.Ridge.R2.toFixed(2)}
              sub="Ridge regression · held-out 2025"
              accent={COLORS.ember}
            />

          </div>

        )}


        {/* =========================================
            ACTIVE PAGE
        ========================================= */}

        <Outlet />

      </main>

    </div>
  );
}