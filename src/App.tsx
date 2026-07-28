function App() {
  return (
    <div style={{ fontFamily: "Arial", padding: "30px" }}>
      <h1>🇧🇩 Bangladesh Disease Surveillance System</h1>

      <hr />

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <button>Dashboard</button>
        <button>Diseases</button>
        <button>Patients</button>
        <button>GIS</button>
        <button>Reports</button>
        <button>Settings</button>
      </div>

      <hr />

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            background: "#dbeafe",
            padding: "20px",
            width: "200px",
          }}
        >
          <h2>Total Cases</h2>
          <h1>5000</h1>
        </div>

        <div
          style={{
            background: "#dcfce7",
            padding: "20px",
            width: "200px",
          }}
        >
          <h2>Diseases</h2>
          <h1>4</h1>
        </div>

        <div
          style={{
            background: "#fef3c7",
            padding: "20px",
            width: "200px",
          }}
        >
          <h2>Districts</h2>
          <h1>1</h1>
        </div>

        <div
          style={{
            background: "#fee2e2",
            padding: "20px",
            width: "200px",
          }}
        >
          <h2>Deaths</h2>
          <h1>25</h1>
        </div>
      </div>

      <hr />

      <h2>Welcome</h2>

      <p>
        This dashboard will visualize disease surveillance data
        from Bangladesh using epidemiological indicators,
        interactive charts, and GIS maps.
      </p>
    </div>
  );
}

export default App;