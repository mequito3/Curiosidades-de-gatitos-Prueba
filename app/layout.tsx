
import "./globals.css";
import Navbar from './components/Navbar'; // Importamos el Navbar
import { LanguageProvider } from './components/LanguageContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased selection:bg-blue-100 selection:text-blue-900">
        <LanguageProvider>
          <Navbar />
          <main className="pt-20 transition-colors duration-500">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}