import React, { useState, useEffect } from 'react';
// Importamos los iconos (Asegúrate de instalarlos en el Paso 3)
import { Users, Mic2, Camera, Calendar, Play, Pause, CheckCircle, MapPin, AlertTriangle, Save } from 'lucide-react';

// --- DATOS INICIALES ---
const VIPS_DEFAULT = [
  { id: 1, nombre: "Daniela Norambuena", cargo: "Alcaldesa", estado: "pendiente" },
  { id: 2, nombre: "Cristóbal Juliá", cargo: "Gobernador Regional", estado: "pendiente" },
  { id: 3, nombre: "Galo Luna", cargo: "Delegado Presidencial", estado: "pendiente" },
];

export default function SerenitoApp() {
  const [rol, setRol] = useState('secretaria'); 
  const [eventos, setEventos] = useState([]);
  const [vips, setVips] = useState(VIPS_DEFAULT);
  const [eventoActivo, setEventoActivo] = useState(null);

  // Acción: Secretaría crea evento
  const agregarEvento = (nuevo) => {
    const ev = { ...nuevo, id: Date.now() };
    setEventos([ev, ...eventos]);
    if (!eventoActivo) setEventoActivo(ev); // El primero se activa automático
  };

  // Acción: Protocolo hace Check-In
  const toggleCheckIn = (id) => {
    setVips(vips.map(v => v.id === id ? { ...v, estado: v.estado === 'pendiente' ? 'presente' : 'pendiente' } : v));
  };

  return (
    <div className="min-h-screen pb-20 font-sans">
      
      {/* HEADER SUPERIOR (Sticky) */}
      <header className="bg-muni-azul text-white p-6 rounded-b-[2rem] shadow-xl sticky top-0 z-50">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <div>
            <h1 className="text-3xl font-black tracking-tighter">S.E.R.E.N.I.T.O.</h1>
            <div className="flex items-center gap-2 opacity-80">
              <span className="text-[10px] uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded">Inteligencia Territorial</span>
            </div>
          </div>
          
          {/* SELECTOR DE ROLES (Simulación) */}
          <div className="flex flex-col items-end">
            <label className="text-[10px] uppercase font-bold opacity-70 mb-1">Vista Actual:</label>
            <select 
              value={rol} 
              onChange={(e) => setRol(e.target.value)}
              className="text-xs bg-white text-muni-azul font-bold p-2 rounded-lg outline-none shadow-lg border-2 border-transparent focus:border-muni-oro"
            >
              <option value="secretaria">👩‍💼 Secretaría</option>
              <option value="protocolo">👠 Protocolo</option>
              <option value="tecnico">🎚️ Técnico</option>
              <option value="prensa">📸 Prensa</option>
            </select>
          </div>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="p-4 max-w-xl mx-auto mt-4 space-y-6">
        
        {/* --- VISTA SECRETARÍA --- */}
        {rol === 'secretaria' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-slate-100">
              <h2 className="font-bold text-xl text-muni-azul mb-4 flex items-center gap-2">
                <Calendar className="text-blue-500" /> Agenda Global
              </h2>
              <FormularioEvento onGuardar={agregarEvento} />
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase text-slate-400 ml-4">Hitos Activos</h3>
              {eventos.length === 0 && <p className="text-center text-slate-400 italic py-8">No hay eventos registrados hoy.</p>}
              {eventos.map(ev => (
                <div key={ev.id} className="bg-white p-4 rounded-2xl shadow-sm border-l-4 border-green-500 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-800">{ev.nombre}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1"><MapPin size={10}/> {ev.lugar} • Dec: {ev.decreto}</p>
                  </div>
                  <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full">EN CURSO</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- VISTA PROTOCOLO --- */}
        {rol === 'protocolo' && (
          <div className="space-y-4">
            <div className="bg-purple-600 text-white p-6 rounded-3xl shadow-lg mb-4">
              <h2 className="font-bold text-xl flex items-center gap-2"><Users /> Control de Acceso</h2>
              <p className="text-purple-200 text-sm">Sistema de validación VIP</p>
            </div>
            {vips.map(vip => (
              <button 
                key={vip.id} 
                onClick={() => toggleCheckIn(vip.id)}
                className={`w-full p-4 rounded-2xl border-2 flex justify-between items-center transition-all shadow-sm ${vip.estado === 'presente' ? 'bg-green-50 border-green-500' : 'bg-white border-transparent'}`}
              >
                <div className="text-left">
                  <p className="font-bold text-slate-900">{vip.nombre}</p>
                  <p className="text-xs text-slate-500 uppercase font-bold">{vip.cargo}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${vip.estado === 'presente' ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
                  {vip.estado === 'presente' ? <CheckCircle size={14}/> : ''} 
                  {vip.estado === 'presente' ? 'EN SALA' : 'CHECK-IN'}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* --- VISTA TÉCNICA (MINUTO A MINUTO) --- */}
        {rol === 'tecnico' && (
          <VistaTecnica evento={eventoActivo} />
        )}

        {/* --- VISTA PRENSA --- */}
        {rol === 'prensa' && (
          <div className="space-y-6 text-center">
            <div className="bg-blue-500 text-white p-8 rounded-3xl shadow-xl">
              <Camera size={48} className="mx-auto mb-4 opacity-80" />
              <h2 className="text-2xl font-bold">Hub de Medios</h2>
              <p className="text-blue-100">Conexión directa con RRPP</p>
            </div>
            <button className="w-full border-4 border-dashed border-slate-300 rounded-3xl h-48 flex flex-col items-center justify-center text-slate-400 hover:bg-white hover:border-blue-400 hover:text-blue-500 transition-all gap-2 group">
              <div className="bg-slate-200 p-4 rounded-full group-hover:bg-blue-100 transition-colors">
                <Camera size={32} />
              </div>
              <span className="font-bold">Tocar para Subir Foto</span>
            </button>
          </div>
        )}

      </main>
    </div>
  );
}

// --- SUB-COMPONENTES AUXILIARES ---

const FormularioEvento = ({ onGuardar }) => {
  const [f, setF] = useState({ nombre: '', lugar: '', decreto: '' });
  const enviar = (e) => {
    e.preventDefault();
    onGuardar(f);
    setF({ nombre: '', lugar: '', decreto: '' });
    alert("✅ Hito registrado correctamente");
  };
  return (
    <form onSubmit={enviar} className="space-y-3">
      <input required placeholder="Nombre del Evento" className="w-full p-3 bg-slate-50 rounded-xl border focus:ring-2 focus:ring-muni-azul outline-none" value={f.nombre} onChange={e=>setF({...f, nombre: e.target.value})} />
      <div className="grid grid-cols-2 gap-3">
        <input required placeholder="Lugar (Ej: Faro)" className="w-full p-3 bg-slate-50 rounded-xl border focus:ring-2 focus:ring-muni-azul outline-none" value={f.lugar} onChange={e=>setF({...f, lugar: e.target.value})} />
        <input required placeholder="N° Decreto" className="w-full p-3 bg-slate-50 rounded-xl border focus:ring-2 focus:ring-muni-azul outline-none" value={f.decreto} onChange={e=>setF({...f, decreto: e.target.value})} />
      </div>
      <button className="w-full bg-muni-azul text-white p-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-blue-900 transition shadow-lg">
        <Save size={18} /> Guardar Hito
      </button>
    </form>
  );
};

const VistaTecnica = ({ evento }) => {
  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(false);
  
  useEffect(() => {
    let int = null;
    if(activo) int = setInterval(() => setSegundos(s => s + 1), 1000);
    else clearInterval(int);
    return () => clearInterval(int);
  }, [activo]);

  const formato = (s) => {
    const min = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
  };

  if(!evento) return (
    <div className="text-center p-12 bg-slate-100 rounded-3xl border-2 border-dashed border-slate-300">
      <AlertTriangle className="mx-auto text-slate-400 mb-2" size={32}/>
      <p className="text-slate-500 font-bold">Esperando datos de Secretaría...</p>
    </div>
  );

  return (
    <div className="bg-slate-900 text-white p-6 rounded-[2.5rem] shadow-2xl border-b-8 border-red-600 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10"><Mic2 size={120}/></div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">En Aire</span>
            <h2 className="text-2xl font-black mt-2 leading-tight">{evento.nombre}</h2>
            <p className="text-slate-400 text-sm mt-1 flex items-center gap-1"><MapPin size={12}/> {evento.lugar}</p>
          </div>
        </div>

        <div className="text-center py-6 bg-slate-800/50 rounded-2xl mb-6 backdrop-blur-sm border border-slate-700">
          <span className="text-7xl font-mono font-bold text-muni-oro tracking-tighter">{formato(segundos)}</span>
          <p className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.2em] mt-2">Tiempo Transcurrido</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button onClick={() => setActivo(!activo)} className={`p-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-transform active:scale-95 ${activo ? 'bg-orange-500 text-white' : 'bg-green-500 text-white shadow-[0_4px_0_rgb(21,128,61)]'}`}>
            {activo ? <Pause fill="currentColor" /> : <Play fill="currentColor" />} {activo ? 'PAUSAR' : 'INICIAR'}
          </button>
          <button onClick={() => {setActivo(false); setSegundos(0)}} className="bg-slate-700 p-4 rounded-2xl font-bold text-slate-300 hover:bg-slate-600 transition">
            REINICIAR
          </button>
        </div>
      </div>
    </div>
  );
};
