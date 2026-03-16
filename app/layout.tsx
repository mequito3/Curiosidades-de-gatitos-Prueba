
import "./globals.css";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { LanguageProvider } from './components/LanguageContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased selection:bg-blue-100 selection:text-blue-900">
        <LanguageProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-20 transition-colors duration-500">{children}</main>
            <Footer />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}