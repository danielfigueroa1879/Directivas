const DocumentosDeportivos = () => {
  return (
    <div className="card-container">
      <div className="p-6 bg-white rounded-xl shadow-md space-y-6">
        <h1 className="text-xl font-bold text-center text-blue-700">DIRECTIVA DE FUNCIONAMIENTO</h1>
        <h2 className="text-lg font-semibold text-center">Instalación - Evento - Partidos de Fútbol Profesional</h2>
        
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-bold">1️⃣ DD.FF. (Directiva)</h3>
            <ul className="list-disc pl-5 text-sm">
              <li>Presentar 15 días antes</li>
              <li>Dec. 261 (IV.4) y Dec. 32/2024</li>
            </ul>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-bold">2️⃣ Documentación</h3>
            <ul className="space-y-3 pl-5 text-sm">
              <li className="flex flex-col space-y-1">
                <span>02 Solicitudes Simples</span>
                <a 
                  href="https://dal5.short.gy/Solic" 
                  target="_blank" 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs w-40 inline-block text-center download-btn"
                >
                  Descargar Solicitud
                </a>
              </li>
              
              <li className="flex flex-col space-y-1">
                <span>01 copia DD.FF. completa</span>
                <a 
                  href="https://dal5.short.gy/D" 
                  target="_blank" 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs w-40 inline-block text-center download-btn"
                >
                  Descargar Directiva
                </a>
              </li>
              
              <li className="flex flex-col space-y-1">
                <span>Requisitos según tipo</span>
                <a 
                  href="https://dal5.short.gy/Re24" 
                  target="_blank" 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs w-40 inline-block text-center download-btn"
                >
                  Descargar Requisitos
                </a>
              </li>
              
              <li className="flex flex-col space-y-1">
                <span>Uniforme</span>
                <a 
                  href="https://dal5.short.gy/0u" 
                  target="_blank" 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs w-40 inline-block text-center download-btn"
                >
                  Descargar Uniforme
                </a>
              </li>
            </ul>
          </div>
          
          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="font-bold">3️⃣ Todo escaneado en Digital 1 PDF (pendrive)</h3>
            <ul className="list-disc pl-5 text-sm">
              <li className="flex flex-col space-y-1">
                <span>Unir PDF</span>
                <a 
                  href="https://dal5.short.gy/I" 
                  target="_blank" 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs w-40 inline-block text-center download-btn"
                >
                  Descargar Herramienta
                </a>
              </li>
            </ul>
          </div>
          
          <div className="border-l-4 border-yellow-500 pl-4">
            <h3 className="font-bold">4️⃣ Credenciales ID</h3>
            <ul className="list-disc pl-5 text-sm">
              <li className="flex flex-col space-y-1">
                <span>Resol. 2.522 (26.08.2024) normaliza el proceso</span>
                <a 
                  href="https://dal5.short.gy/Cred" 
                  target="_blank" 
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs w-40 inline-block text-center download-btn"
                >
                  Descargar Documento
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg mt-6">
          <h3 className="font-bold text-center text-red-600">‼️ MODELOS EDITABLES EN WORD ‼️</h3>
          <ul className="space-y-3 pl-2 pt-3">
            <li className="flex flex-col space-y-1">
              <span className="font-medium">➢ Modelo solicitud simple:</span>
              <a 
                href="https://dal5.short.gy/Solic" 
                target="_blank" 
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full inline-block text-center download-btn"
              >
                Descargar Solicitud
              </a>
            </li>
            
            <li className="flex flex-col space-y-1">
              <span className="font-medium">➢ Directiva de Func. Editable:</span>
              <a 
                href="https://dal5.short.gy/D" 
                target="_blank" 
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full inline-block text-center download-btn"
              >
                Descargar Directiva
              </a>
            </li>
            
            <li className="flex flex-col space-y-1">
              <span className="font-medium">➢ Análisis Vulnerabilidades:</span>
              <a 
                href="https://dal5.short.gy/6ydn" 
                target="_blank" 
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full inline-block text-center download-btn"
              >
                Descargar Análisis
              </a>
            </li>
            
            <li className="flex flex-col space-y-1">
              <span className="font-medium">➢ Ej. Uniforme Art 8vo. 867:</span>
              <a 
                href="https://dal5.short.gy/0u" 
                target="_blank" 
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full inline-block text-center download-btn"
              >
                Descargar Ejemplo
              </a>
            </li>
          </ul>
        </div>
        
        <div className="text-xs text-gray-500 mt-4 text-center">
          Haga clic en los botones para iniciar la descarga de los documentos
        </div>
      </div>
      <footer className="text-center text-gray-500 text-xs mt-4">
        © 2025 - Directiva de Funcionamiento
      </footer>
    </div>
  );
};

ReactDOM.render(<DocumentosDeportivos />, document.getElementById('root'));
