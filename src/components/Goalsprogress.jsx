export default function Goalsprogress({ value, className = "" }) {
    return (
      <div className={`w-full bg-gray-300 rounded-full overflow-hidden ${className}`}>
        <div
          style={{ width: `${value}%` }}
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
        />
      </div>
    );
  }
  