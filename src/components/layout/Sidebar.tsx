const menuItems = [
  "Dashboard",
  "Diseases",
  "Patients",
  "Laboratory",
  "GIS",
  "Analytics",
  "Reports",
  "Settings",
];

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "220px",
        background: "#f4f4f4",
        padding: "20px",
        minHeight: "calc(100vh - 70px)",
      }}
    >
      <h3>Menu</h3>

      {menuItems.map((item) => (
        <div
          key={item}
          style={{
            padding: "12px 0",
            cursor: "pointer",
            borderBottom: "1px solid #ddd",
          }}
        >
          {item}
        </div>
      ))}
    </aside>
  );
}