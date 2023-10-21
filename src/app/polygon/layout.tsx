import Nav from "./components/Nav";

export default function PolygonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* <div className="px-2 py-1">
        <Nav />
      </div> */}
      <div className="px-2 py-1">{children}</div>
    </div>
  );
}
