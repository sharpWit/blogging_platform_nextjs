export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-indigo-400 p-8 dark:bg-indigo-900 fixed top-0 left-0 right-0 z-50 max-h-28 h-full w-full">
      {children}
    </div>
  );
}
