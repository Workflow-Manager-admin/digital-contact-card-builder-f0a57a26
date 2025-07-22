import ContactCardBuilder from "../components/ContactCardBuilder";

/**
 * PUBLIC_INTERFACE
 * Main page of the Digital Contact Card Builder app.
 * Renders the layout: sidebar form + live preview
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="py-8 px-2 flex flex-col sm:flex-row items-center gap-2 sm:gap-8 justify-center bg-white border-b border-gray-100">
        <span className="font-bold text-xl text-primary" style={{ color: "#2196F3" }}>
          Digital Contact Card Builder
        </span>
        <span className="text-gray-400 text-xs tracking-wider">
          Minimal, customizable & live preview
        </span>
      </header>
      <main className="flex-1 flex flex-col items-stretch justify-center p-4 md:p-10 max-w-5xl mx-auto w-full gap-6">
        <ContactCardBuilder />
      </main>
      <footer className="py-4 text-xs text-gray-400 text-center border-t bg-white">
        © {new Date().getFullYear()} Digital Contact Card Builder
      </footer>
    </div>
  );
}
