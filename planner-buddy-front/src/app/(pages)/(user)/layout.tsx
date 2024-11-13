export default function LoginLayout({ children }) {
  return (
    //<div className="h-screen flex items-center justify-center py-20 bg-gradient-to-b from-violet-500 to-violet-200">
      <main className="w-full h-full min-h-screen flex items-center justify-center p-8 shadow-md bg-gradient-to-b from-violet-500 to-violet-200">
        {children}
      </main>
    //</div>
  );
}
