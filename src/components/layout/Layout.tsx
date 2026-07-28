import Header from "./Header";
import Sidebar from "./Sidebar";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />

      <div
        style={{
          display: "flex",
        }}
      >
        <Sidebar />

        <main
          style={{
            flex: 1,
            padding: "20px",
          }}
        >
          {children}
        </main>
      </div>
    </>
  );
}