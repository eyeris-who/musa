import React, { useState, useEffect } from 'react';

const MusicNotes = () => {
  const [notes, setNotes] = useState([]);
  const [isExiting, setIsExiting] = useState(false);

  // Music note symbols
  const musicSymbols = ['♪', '♫', '♬', '♩', '♭', '♯'];

  useEffect(() => {
    let mouseInWindow = true;

    const handleMouseMove = (e) => {
      mouseInWindow = true;
      
      const x = e.clientX - 90; // Move 90px left to account for sidebar
      const y = e.clientY;
      // Always add the new note at the current position
      const newNote = {
        id: Date.now() + Math.random(),
        x,
        y,
        symbol: musicSymbols[Math.floor(Math.random() * musicSymbols.length)],
        scale: 2 + Math.random() * 1.5,
      };
      setNotes(prevNotes => [...prevNotes.slice(-9), newNote]); // Keep only last 10 notes
    };

    const clearNotes = () => {
      setIsExiting(true);
      setTimeout(() => {
        setNotes([]);
        setIsExiting(false);
      }, 1000);
    };

    const handleMouseLeave = (e) => {
      // Check if we're really leaving the window
      if (!e.relatedTarget || e.relatedTarget === document.documentElement) {
        mouseInWindow = false;
        setIsExiting(true);
        
        // Clear notes after animation
        setTimeout(() => {
          setNotes([]);
          setIsExiting(false);
        }, 1000);
      }
    };

    const handleFocus = () => {
      if (!mouseInWindow) {
        setNotes([]);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setNotes([]);
      }
    };

    // Add event listeners to the document body for better mouse detection
    document.body.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('blur', clearNotes);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('blur', clearNotes);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {notes.map((note) => (
        <div
          key={note.id}
          className={`absolute text-4xl font-bold select-none ${isExiting ? 'animate-float-up' : ''}`}
          style={{
            left: note.x,
            top: note.y,
            transform: `translate(-50%, -50%) scale(${note.scale})`,
            color: 'var(--color-accent)',
            textShadow: '0 0 10px var(--color-accent), 0 0 20px var(--color-primary), 0 0 30px var(--color-primary)',
          }}
        >
          {note.symbol}
        </div>
      ))}
    </div>
  );
};

export default MusicNotes;