"use client"

import * as React from "react"
import * as Recharts from "recharts"
import { cn } from "@/lib/utils"

// Simple chart component that wraps Recharts with proper TypeScript types
interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number | string
  height?: number | string
  className?: string
  children: React.ReactNode
}

export function SimpleChart({ 
  width = "100%", 
  height = 300, 
  className, 
  children, 
  ...props 
}: ChartProps & { children: React.ReactElement }) {
  return (
    <div 
      className={cn("w-full h-full", className)} 
      style={{ width, height }}
      {...props}
    >
      <Recharts.ResponsiveContainer width="100%" height="100%">
        {children}
      </Recharts.ResponsiveContainer>
    </div>
  )
}

// Re-export Recharts components with proper types
export const LineChart = Recharts.LineChart
export const BarChart = Recharts.BarChart
export const PieChart = Recharts.PieChart
export const AreaChart = Recharts.AreaChart

export const XAxis = Recharts.XAxis
export const YAxis = Recharts.YAxis
export const CartesianGrid = Recharts.CartesianGrid
export const Tooltip = Recharts.Tooltip
export const Legend = Recharts.Legend
export const ResponsiveContainer = Recharts.ResponsiveContainer

export const Line = Recharts.Line
export const Bar = Recharts.Bar
export const Pie = Recharts.Pie
export const Cell = Recharts.Cell
export const Area = Recharts.Area
export const RadialBar = Recharts.RadialBar
export const Scatter = Recharts.Scatter

export const ComposedChart = Recharts.ComposedChart
export const ScatterChart = Recharts.ScatterChart
export const RadialBarChart = Recharts.RadialBarChart

// Re-export types for convenience
export type { 
  TooltipProps, 
  LegendProps, 
  CartesianGridProps, 
  XAxisProps, 
  YAxisProps,
  LineProps,
  BarProps,
  PieProps,
  CellProps,
  AreaProps,
  RadialBarProps,
  ScatterProps,
  ResponsiveContainerProps
} from 'recharts'
