import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function ActivityChart() {
  const data = [
    { name: 'Mon', workouts: 1 },
    { name: 'Tue', workouts: 1 },
    { name: 'Wed', workouts: 1 },
    { name: 'Thu', workouts: 1 },
    { name: 'Fri', workouts: 1 },
    { name: 'Sat', workouts: 1 },
    { name: 'Sun', workouts: 1 },
  ];

  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="workouts" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
