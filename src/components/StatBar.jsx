function StatBar({ label, value, color }) {
  const width = Math.min((value / 255) * 100, 100)

  return (
    <div className="stat-bar">
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
      <div className="stat-track">
        <div className="stat-fill" style={{ width: width + '%', backgroundColor: color }}></div>
      </div>
    </div>
  )
}

export default StatBar
