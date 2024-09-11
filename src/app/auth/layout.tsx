
export default function Home({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-grey-500">
        {children}
    </main>
  );
}