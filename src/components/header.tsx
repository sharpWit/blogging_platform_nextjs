export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-400 dark:bg-blue-600 fixed top-0 left-0 right-0 z-50 max-h-28 h-full w-full p-3">
      {children}
    </div>
  );
}
