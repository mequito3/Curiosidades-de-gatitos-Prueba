module.exports = {
    darkMode: 'class',  // Usamos la clase para alternar entre modo claro y oscuro
    content: [
      './app/**/*.{js,ts,jsx,tsx}',  // Asegúrate de que Tailwind procese todos los archivos necesarios
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          // Puedes agregar tus colores personalizados aquí si lo deseas
          'custom-dark': '#121212',
        },
      },
    },
    plugins: [],
  }
  