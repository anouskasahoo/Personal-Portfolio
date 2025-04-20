import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import * as Tone from 'tone';

const AudioController = () => {
  const { audioEnabled, setAudioEnabled, timeOfDay } = useAppContext();
  const [synth, setSynth] = useState<Tone.Synth | null>(null);
  
  useEffect(() => {
    // Initialize Tone.js
    const newSynth = new Tone.Synth().toDestination();
    setSynth(newSynth);
    
    return () => {
      newSynth.dispose();
    };
  }, []);
  
  // Play ambient sounds based on time of day
  useEffect(() => {
    if (audioEnabled && synth) {
      // Different audio patterns for different times of day
      const playAmbientSound = () => {
        if (timeOfDay === 'morning') {
          // Bright, uplifting notes
          synth.triggerAttackRelease("C5", "8n");
          setTimeout(() => synth.triggerAttackRelease("E5", "8n"), 500);
          setTimeout(() => synth.triggerAttackRelease("G5", "8n"), 1000);
        } else if (timeOfDay === 'afternoon') {
          // Middle range, productive sounds
          synth.triggerAttackRelease("A4", "8n");
          setTimeout(() => synth.triggerAttackRelease("D5", "8n"), 600);
          setTimeout(() => synth.triggerAttackRelease("F5", "8n"), 1200);
        } else {
          // Lower, calming evening sounds
          synth.triggerAttackRelease("G3", "8n");
          setTimeout(() => synth.triggerAttackRelease("B3", "8n"), 700);
          setTimeout(() => synth.triggerAttackRelease("D4", "8n"), 1400);
        }
      };
      
      // Play ambient sounds occasionally
      const interval = setInterval(playAmbientSound, 30000);
      playAmbientSound();
      
      return () => clearInterval(interval);
    }
  }, [audioEnabled, synth, timeOfDay]);
  
  // Play interaction sounds
  const playButtonSound = () => {
    if (audioEnabled && synth) {
      synth.triggerAttackRelease("C4", "16n");
    }
  };
  
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    playButtonSound();
  };
  
  return (
    <div className="audio-controls">
      <button 
        className="audio-btn"
        onClick={toggleAudio}
        aria-label={audioEnabled ? "Mute audio" : "Enable audio"}
      >
        {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </div>
  );
};

export default AudioController;