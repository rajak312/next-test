export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h2>About Layout</h2>
      {children}
    </div>
  );
}
