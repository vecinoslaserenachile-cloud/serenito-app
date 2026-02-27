import React, { useState, useEffect } from 'react';
import { Users, Mic2, Camera, Calendar, Play, Pause, CheckCircle, AlertTriangle, MapPin } from 'lucide-react';

// --- DATOS INICIALES (Simulando Base de Datos) ---
const VIPS_INICIALES = [
  { id: 1, nombre: "Daniela Norambuena", cargo: "Alcaldesa", estado: "pendiente" },
  { id: 2, nombre: "Cristóbal Juliá", cargo: "Gobernador Regional", estado: "pendiente" },
  { id: 3, nombre: "Galo Luna", cargo: "Delegado Presidencial", estado: "pendiente" },
];

// --- COMPONENTE PRINCIPAL ---
export default function SerenitoApp() {
  const [rol, setRol] = useState('secretaria'); // Rol por defecto
  const [eventos, setEventos] = useState([]);
  const [vips, setVips] = useState(VIPS_INICIALES);
  const [eventoActivo, setEventoActivo] = useState(null);

  // Función para agregar eventos (Secretaría)
  const agregarEvento = (nuevoEvento) => {
    const eventoConId = { ...nuevoEvento, id: Date.now() };
    setEventos([eventoConId, ...eventos]);
    if (!eventoActivo) setEventoActivo(eventoConId); // Activa el primero automáticamente
  };

  // Función Check-In (Protocolo)
  const toggleCheckIn = (id) => {
    setVips(vips.map(vip => 
      vip.id === id ? { ...vip, estado: vip.estado === 'pendiente' ? 'presente' : 'pendiente' } : vip
    ));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      
      {/* HEADER SUPERIOR (Siempre visible) */}
      <header className="bg-blue-900 text-white p-6 rounded-b-3xl shadow-xl sticky top-0 z-50">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black tracking-tighter">S.E.R.E.N.I.T.O.</h1>
            <p className="text-[10px] uppercase tracking-widest text-blue-200 opacity-80">Inteligencia Territorial</p>
          </div>
          {/* Selector de ROLES (Solo para demo) */}
          <select 
            value={rol} 
            onChange={(e) => setRol(e.target.value)}
            className="text-xs bg-blue-800 text-white p-2 rounded-lg border border-blue-600 outline-none"
          >
            <option value="secretaria">👩‍💼 Secretaría</option>
            <option value="protocolo">👠 Protocolo</option>
            <option value="tecnico">🎚️ Técnico</option>
            <option value="prensa">📸 Prensa</option>
          </select>
        </div>
      </header>

      {/* CUERPO PRINCIPAL SEGÚN ROL */}
      <main className="p-4 max-w-lg mx-auto mt-4">
        
        {/* VISTA SECRETARÍA */}
        {rol === 'secretaria' && (
          <VistaSecretaria onGuardar={agregarEvento} eventos={eventos} />
        )}

        {/* VISTA PROTOCOLO */}
        {rol === 'protocolo' && (
          <VistaProtocolo vips={vips} onCheckIn={toggleCheckIn} />
        )}

        {/* VISTA TÉCNICA */}
        {rol === 'tecnico' && (
          <VistaTecnica evento={eventoActivo} />
        )}

        {/* VISTA PRENSA */}
        {rol === 'prensa' && (
          <VistaPrensa />
        )}

      </main>
    </div>
  );
}

// --- SUB-COMPONENTES (Módulos) ---

const VistaSecretaria = ({ onGuardar, eventos }) => {
  const [form, setForm] = useState({ nombre: '', lugar: '', decreto: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(form);
    setForm({ nombre: '', lugar: '', decreto: '' });
    alert("¡Hito Creado! Visible para el Técnico.");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2 text-blue-900">
          <Calendar className="text-blue-600" /> Nuevo Hito
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input required placeholder="Nombre del Evento" className="w-full p-3 bg-slate-50 rounded-xl border" 
            value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} />
          <input required placeholder="Lugar (Ej: El Faro)" className="w-full p-3 bg-slate-50 rounded-xl border" 
            value={form.lugar} onChange={e => setForm({...form, lugar: e.target.value})} />
          <input required placeholder="N° Decreto (Ej: 450/2026)" className="w-full p-3 bg-slate-50 rounded-xl border" 
            value={form.decreto} onChange={e => setForm({...form, decreto: e.target.value})} />
          <button className="w-full bg-blue-900 text-white p-4 rounded-xl font-bold hover:bg-blue-800 transition">
            Guardar en Sistema
          </button>
        </form>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase text-slate-400 ml-2">Hitos Activos</h3>
        {eventos.length === 0 && <p className="text-sm text-slate-400 italic p-4">No hay eventos creados hoy.</p>}
        {eventos.map(ev => (
          <div key={ev.id} className="bg-white p-4 rounded-2xl shadow-sm flex justify-between items-center">
            <div>
              <p className="font-bold text-slate-800">{ev.nombre}</p>
              <p className="text-xs text-slate-500">{ev.lugar} • Dec: {ev.decreto}</p>
            </div>
            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">ACTIVO</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const VistaProtocolo = ({ vips, onCheckIn }) => (
  <div className="space-y-4">
    <div className="bg-purple-700 text-white p-6 rounded-3xl shadow-lg mb-6">
      <h2 className="font-bold text-xl flex items-center gap-2">
        <Users /> Control de Acceso VIP
      </h2>
      <p className="text-purple-200 text-sm mt-1">Valide la asistencia para notificar a locución.</p>
    </div>

    {vips.map(vip => (
      <div key={vip.id} className={`p-4 rounded-2xl border-2 flex justify-between items-center transition-all ${vip.estado === 'presente' ? 'bg-green-50 border-green-500 shadow-md' : 'bg-white border-slate-100'}`}>
        <div>
          <p className="font-bold text-slate-900">{vip.nombre}</p>
          <p className="text-xs text-slate-500 uppercase font-bold">{vip.cargo}</p>
        </div>
        <button 
          onClick={() => onCheckIn(vip.id)}
          className={`px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 ${vip.estado === 'presente' ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-600'}`}
        >
          {vip.estado === 'presente' ? <><CheckCircle size={16}/> EN SALA</> : 'Check-In'}
        </button>
      </div>
    ))}
  </div>
);

const VistaTecnica = ({ evento }) => {
  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    let intervalo = null;
    if (activo) intervalo = setInterval(() => setSegundos(s => s + 1), 1000);
    else clearInterval(intervalo);
    return () => clearInterval(intervalo);
  }, [activo]);

  const formato = (s) => {
    const min = Math.floor(s / 60).toString().padStart(2, '0');
    const seg = (s % 60).toString().padStart(2, '0');
    return `${min}:${seg}`;
  };

  if (!evento) return (
    <div className="text-center p-10 text-slate-400">
      <AlertTriangle className="mx-auto mb-2" size={40}/>
      <p>Esperando que Secretaría cree un hito...</p>
    </div>
  );

  return (
    <div className="bg-slate-900 text-white p-6 rounded-[2rem] shadow-2xl border-b-8 border-red-600">
      <div className="flex justify-between items-start mb-8">
        <div>
          <span className="bg-red-600 text-[10px] font-bold px-2 py-0.5 rounded uppercase">En Vivo</span>
          <h1 className="text-2xl font-black mt-2 leading-tight">{evento.nombre}</h1>
          <p className="text-slate-400 text-sm mt-1 flex items-center gap-1"><MapPin size={12}/> {evento.lugar}</p>
        </div>
        <div className="text-right">
          <div className="text-5xl font-mono font-bold text-yellow-400 tracking-widest">{formato(segundos)}</div>
          <p className="text-[10px] uppercase font-bold opacity-50">Tiempo Transcurrido</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => setActivo(!activo)} className={`p-4 rounded-xl font-bold flex items-center justify-center gap-2 ${activo ? 'bg-orange-600' : 'bg-green-600'}`}>
          {activo ? <Pause/> : <Play/>} {activo ? 'PAUSAR' : 'INICIAR'}
        </button>
        <button onClick={() => {setActivo(false); setSegundos(0)}} className="bg-slate-800 p-4 rounded-xl font-bold text-slate-300">
          REINICIAR
        </button>
      </div>
    </div>
  );
};

const VistaPrensa = () => (
  <div className="space-y-6">
    <div className="bg-blue-600 text-white p-6 rounded-3xl shadow-lg text-center">
      <Camera className="mx-auto mb-2" size={40} />
      <h2 className="font-bold text-xl">Hub de Medios</h2>
      <p className="text-blue-200 text-sm">Carga rápida para redes sociales</p>
    </div>
    <button className="w-full border-4 border-dashed border-slate-300 rounded-3xl h-40 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 transition">
      <Camera size={32} className="mb-2"/>
      <span className="font-bold">Tocar para Subir Foto</span>
    </button>
    <div className="grid grid-cols-3 gap-2">
      {[1,2,3].map(i => <div key={i} className="bg-slate-200 aspect-square rounded-xl animate-pulse"></div>)}
    </div>
  </div>
);
