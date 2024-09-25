export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary fixed top-0 left-0 right-0 z-50 max-h-28 h-full w-full p-3">
      {children}
    </div>
  );
}
