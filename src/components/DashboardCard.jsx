export default function DashboardCard({ title, value, color }) {
  return (
    <div
      className={`p-4 rounded-lg text-white ${color} 
                  transform transition duration-200 hover:scale-105 hover:opacity-200cursor-pointer`}
    >
      <h3 className="text-sm">{title}</h3>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
