import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  Text,
} from 'recharts';


const GRADIENT_COLORS = [
  '#56ab2f', '#a8e063', '#f7b42c', '#fc575e', '#2193b0', '#6dd5ed',
];

const COLORS = ['#1984c5', '#de6e56', '#98d1d1', '#599e94', '#e27c7c','#5e569b'];

const PIE_COLORS = ['#ff9f68', '#ff6f61', '#55c57a', '#4a90e2', '#f8c471', '#845ec2'];

const Gradient = ({ id, colors }) => (
  <defs>
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      {colors.map((color, index) => (
        <stop
          key={index}
          offset={`${(index / (colors.length - 1)) * 100}%`}
          stopColor={color}
        />
      ))}
    </linearGradient>
  </defs>
);

export const LineChartComponent = ({ data, xKey, yKey, title }) => (
  <Box sx={{ width: '100%', minHeight: '350px', height: '50vh', bgcolor: '#f4f8fb', p: 2, borderRadius: 4 }}>
    <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
      {title}
    </Typography>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 30, right: 20, left: 20, bottom: 30 }}>
        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            {GRADIENT_COLORS.map((color, index) => (
              <stop
                key={index}
                offset={`${(index / (GRADIENT_COLORS.length - 1)) * 100}%`}
                stopColor={color}
              />
            ))}
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="4 4" stroke="#e0e0e0" />
        <XAxis dataKey={xKey} tick={{ fontSize: '0.9rem' }} />
        <YAxis tick={{ fontSize: '0.9rem' }} />
        <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #ccc' }} />
        <Legend wrapperStyle={{ fontSize: '0.9rem' }} />
        <Line
          type="monotone"
          dataKey={yKey}
          stroke="url(#lineGradient)"
          strokeWidth={3}
          dot={{ r: 6 }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </Box>
);

export const PieChartComponent = ({ data, dataKey, nameKey, title }) => (
  <Box
    sx={{
      width: '100%',
      minHeight: '350px',
      height: '50vh',
      bgcolor: '#fafafa',
      borderRadius: 4,
      p: 3,
    }}
  >
    <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
      {title}
    </Typography>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          cx="50%"
          cy="50%"
          outerRadius="80%"
          innerRadius="40%"
          label={({ name, percent, margin, trend }) =>
            `${name}: ${(percent * 100).toFixed(0)}% \nTrend: ${trend}, Margin: ${margin}%`
          }
          labelLine={true}
          isAnimationActive={true}
          paddingAngle={5}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const { name, value, payload: extraInfo } = payload[0];
              return (
                <Box
                  sx={{
                    bgcolor: '#ffffff',
                    boxShadow: 1,
                    borderRadius: 2,
                    p: 2,
                  }}
                >
                  <Typography variant="body2">
                    <strong>{name}</strong>
                  </Typography>
                  <Typography variant="body2">
                    <strong>Value:</strong> {value}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Trend:</strong> {extraInfo.trend}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Margin:</strong> {extraInfo.margin}%
                  </Typography>
                </Box>
              );
            }
            return null;
          }}
        />
        <Legend
          verticalAlign="bottom"
          height={36}
          wrapperStyle={{ fontSize: '0.9rem' }}
        />
      </PieChart>
    </ResponsiveContainer>
  </Box>
);


export const BarChartComponent = ({ data, xKey, yKey, title }) => (
  <Box sx={{ width: '100%', minHeight: '300px', height: '40vh' }}>
    <Typography variant="h6" align="center" gutterBottom>
      {title}
    </Typography>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} tick={{ fontSize: '0.8rem' }} />
        <YAxis tick={{ fontSize: '0.8rem' }} />
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: '0.8rem' }} />
        <Bar dataKey={yKey} maxBarSize={60}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </Box>
);

export default {
  LineChartComponent,
  PieChartComponent,
  BarChartComponent,
};
