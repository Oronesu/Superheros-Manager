import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="container-fluid px-4" style={{ paddingTop: "70px" }}>
        {children}
      </main>
    </>
  );
}
