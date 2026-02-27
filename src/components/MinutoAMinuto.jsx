import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, AlertTriangle } from 'lucide-react';

const MinutoAMinuto = ({ eventoNombre }) => {
  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(false);

  // Efecto para el cronómetro del escenario
  useEffect(() => {
    let intervalo = null;
    if (activo) {
      intervalo = setInterval(() => {
        setSegundos(segundos => segundos + 1);
      }, 1000);
    } else {
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo);
  }, [activo]);

  const formatearTiempo = (s) => {
    const min = Math.floor(s / 60);
    const seg = s % 60;
    return `${min}:${seg < 10 ? '0' : ''}${seg}`;
  };

  return (
    <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-2xl border-b-8 border-red-600">
      <div className="flex justify-between items-start mb-6">
        <div>
          <span className="text-[10px] bg-red-600 px-2 py-0.5 rounded font-bold uppercase tracking-widest">Live Técnico</span>
          <h2 className="text-2xl font-black mt-1 uppercase tracking-tighter italic">
            {eventoNombre || "Sin Evento Seleccionado"}
          </h2>
        </div>
        <div className="text-right">
          <p className="text-4xl font-mono font-bold text-yellow-400">{formatearTiempo(segundos)}</p>
          <p className="text-[10px] opacity-50 uppercase font-bold">Tiempo en Escenario</p>
        </div>
      </div>

      {/* PAUTA DINÁMICA */}
      <div className="space-y-3 mb-8">
        <PautaItem hora="00:00" accion="Música de Ambiente / Intro Serenito" activa={segundos < 60} />
        <PautaItem hora="01:00" accion="Locución Bienvenida y Vocativos" activa={segundos >= 60 && segundos < 180} />
        <PautaItem hora="03:00" accion="Himno Nacional / Izamiento" activa={segundos >= 180} />
      </div>

      {/* CONTROLES TÉCNICOS */}
      <div className="flex gap-4">
        <button 
          onClick={() => setActivo(!activo)}
          className={`flex-1 p-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${activo ? 'bg-orange-600' : 'bg-green-600'}`}
        >
          {activo ? <Pause size={20} /> : <Play size={20} />} {activo ? 'Pausar' : 'Iniciar Bloque'}
        </button>
        <button 
          onClick={() => {setSegundos(0); setActivo(false);}}
          className="bg-slate-800 p-4 rounded-2xl"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      <div className="mt-6 flex items-center gap-2 text-[10px] text-yellow-500 font-bold opacity-80 uppercase">
        <AlertTriangle size={14} /> Solo personal de sonido e iluminación
      </div>
    </div>
  );
};

const PautaItem = ({ hora, accion, activa }) => (
  <div className={`flex items-center gap-4 p-3 rounded-xl transition-all ${activa ? 'bg-white/10 border-l-4 border-yellow-400' : 'opacity-30'}`}>  
    <span className="font-mono font-bold text-sm text-yellow-400">{hora}</span>
    <span className="text-sm font-medium">{accion}</span>
  </div>
);

export default MinutoAMinuto;