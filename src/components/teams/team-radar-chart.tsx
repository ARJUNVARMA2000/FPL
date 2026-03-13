"use client";

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TeamStats } from "./team-stats-card";

interface Props {
  statsA: TeamStats;
  statsB: TeamStats;
}

function normalize(val: number, max: number): number {
  return max > 0 ? Math.round((val / max) * 100) : 0;
}

export function TeamRadarChart({ statsA, statsB }: Props) {
  // Compute normalization maxes
  const maxPoints = Math.max(statsA.totalPoints, statsB.totalPoints, 1);
  const maxGoals = Math.max(statsA.goalsScored, statsB.goalsScored, 1);
  const maxCS = Math.max(statsA.cleanSheets, statsB.cleanSheets, 1);
  const maxXG = Math.max(statsA.xG, statsB.xG, 1);
  const maxForm = Math.max(statsA.averageForm, statsB.averageForm, 1);
  const maxAssists = Math.max(statsA.assists, statsB.assists, 1);

  const data = [
    {
      dimension: "Points",
      a: normalize(statsA.totalPoints, maxPoints),
      b: normalize(statsB.totalPoints, maxPoints),
    },
    {
      dimension: "Attack",
      a: normalize(statsA.goalsScored, maxGoals),
      b: normalize(statsB.goalsScored, maxGoals),
    },
    {
      dimension: "Defense",
      a: normalize(statsA.cleanSheets, maxCS),
      b: normalize(statsB.cleanSheets, maxCS),
    },
    {
      dimension: "xG",
      a: normalize(statsA.xG, maxXG),
      b: normalize(statsB.xG, maxXG),
    },
    {
      dimension: "Form",
      a: normalize(statsA.averageForm, maxForm),
      b: normalize(statsB.averageForm, maxForm),
    },
    {
      dimension: "Creativity",
      a: normalize(statsA.assists, maxAssists),
      b: normalize(statsB.assists, maxAssists),
    },
  ];

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid
            stroke="rgba(255,255,255,0.08)"
            gridType="polygon"
          />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fill: "#94a3b8", fontSize: 11 }}
          />
          <Radar
            name={statsA.team.short_name}
            dataKey="a"
            stroke="#7c3aed"
            fill="#7c3aed"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Radar
            name={statsB.team.short_name}
            dataKey="b"
            stroke="#06d6a0"
            fill="#06d6a0"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, color: "#f1f5f9" }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
