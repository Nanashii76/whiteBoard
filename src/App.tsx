import React, { useState, useEffect } from "react";
import Toolbar from "./components/Toolbar";
import Canvas from "./components/Canvas";

const App: React.FC = () => {
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<'brush' | 'eraser'>('brush');
  const [shortcuts, setShortcuts] = useState<{ colorKeys: { [key: string]: string }; sizeKeys: { [key: string]: number } }>({
    colorKeys: {},
    sizeKeys: {},
  });

  // Função para lidar com atalhos de teclado
  const handleKeyDown = (e: KeyboardEvent) => {
    const color = shortcuts.colorKeys[e.key];
    if (color) {
      setColor(color);
    }

    const size = shortcuts.sizeKeys[e.key];
    if (size) {
      setBrushSize(size);
    }
  };

  useEffect(() => {
    // Adicionar event listener para atalhos de teclado
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      // Remover event listener ao desmontar
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
      <Toolbar 
        setColor={setColor} 
        setBrushSize={setBrushSize} 
        setTool={setTool} 
        shortcuts={shortcuts}
        setShortcuts={setShortcuts} 
      />
      <Canvas color={color} brushSize={brushSize} tool={tool} />
    </div>
  );
};

export default App;
