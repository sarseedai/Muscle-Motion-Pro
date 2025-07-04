import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

export default function ProgressChart() {
  const data = [
    { name: 'Week 1', weight: 130 },
    { name: 'Week 2', weight: 135 },
    { name: 'Week 3', weight: 138 },
    { name: 'Week 4', weight: 140 },
    { name: 'Week 5', weight: 145 },
    { name: 'Week 6', weight: 150 },
  ];

  return (
    <LineChart width={300} height={200} data={data}>
      <Line type="monotone" dataKey="weight" stroke="#8884d8" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
}
