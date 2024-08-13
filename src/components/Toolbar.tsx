import React, { useState } from "react";

interface Props {
    setColor: (color: string) => void;
    setBrushSize: (size: number) => void;
    setTool: (tool: 'brush' | 'eraser') => void;
    shortcuts: Shortcuts;
    setShortcuts: (shortcuts: Shortcuts) => void;
}

interface Shortcuts {
    colorKeys: { [key: string]: string };
    sizeKeys: { [key: string]: number };
}

const Toolbar: React.FC<Props> = ({ setColor, setBrushSize, setTool, shortcuts, setShortcuts }) => {
    const [newColorKey, setNewColorKey] = useState('');
    const [newColorValue, setNewColorValue] = useState('#000000');
    const [newSizeKey, setNewSizeKey] = useState('');
    const [newSizeValue, setNewSizeValue] = useState<number>(5);

    const handleAddColorShortcut = () => {
        if (newColorKey && newColorValue) {
            setShortcuts({
                ...shortcuts,
                colorKeys: { ...shortcuts.colorKeys, [newColorKey]: newColorValue }
            });
            setNewColorKey('');
            setNewColorValue('#000000');
        }
    };

    const handleAddSizeShortcut = () => {
        if (newSizeKey && newSizeValue) {
            setShortcuts({
                ...shortcuts,
                sizeKeys: { ...shortcuts.sizeKeys, [newSizeKey]: newSizeValue }
            });
            setNewSizeKey('');
            setNewSizeValue(5); 
        }
    };

    return (
        <div style={{ 
            position: "absolute", 
            top: "10px", 
            left: "10px", 
            backgroundColor: "#f0f0f0", 
            padding: "20px", 
            borderRadius: "15px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 1000,
            fontFamily: "'Comic Sans MS', cursive, sans-serif"
        }}>
            <label htmlFor="colorPicker" style={{ marginRight: "10px" }}>Color: </label>
            <input 
                id="colorPicker"
                type="color"
                onChange={(e) => setColor(e.target.value)}
                style={{ marginRight: "10px" }}
            />
            <label htmlFor="brushSize" style={{ marginRight: "10px" }}>Brush size: </label>
            <input 
                id="brushSize"
                type="range"
                min="1"
                max="50"
                defaultValue="5"
                onChange={(e) => setBrushSize(parseInt(e.target.value, 10))}
                style={{ marginRight: "10px" }}
            />
            <button onClick={() => setTool('brush')} style={buttonStyle}>Brush</button>
            <button onClick={() => setTool('eraser')} style={buttonStyle}>Eraser</button>
            
            <h3>Set Color Shortcuts:</h3>
            <input
                type="text"
                value={newColorKey}
                onChange={(e) => setNewColorKey(e.target.value)}
                placeholder="Key"
                style={inputStyle}
            />
            <input
                type="color"
                value={newColorValue}
                onChange={(e) => setNewColorValue(e.target.value)}
                style={inputStyle}
            />
            <button onClick={handleAddColorShortcut} style={buttonStyle}>Add Color Shortcut</button>

            <h3>Set Size Shortcuts:</h3>
            <input
                type="text"
                value={newSizeKey}
                onChange={(e) => setNewSizeKey(e.target.value)}
                placeholder="Key"
                style={inputStyle}
            />
            <input
                type="number"
                value={newSizeValue}
                onChange={(e) => setNewSizeValue(parseInt(e.target.value, 10))}
                min="1"
                max="50"
                style={inputStyle}
            />
            <button onClick={handleAddSizeShortcut} style={buttonStyle}>Add Size Shortcut</button>
            
            <div>
                <h4>Current Shortcuts:</h4>
                <h5>Color Shortcuts:</h5>
                <ul>
                    {Object.entries(shortcuts.colorKeys).map(([key, color]) => (
                        <li key={key}>{key}: {color}</li>
                    ))}
                </ul>
                <h5>Size Shortcuts:</h5>
                <ul>
                    {Object.entries(shortcuts.sizeKeys).map(([key, size]) => (
                        <li key={key}>{key}: {size}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const buttonStyle = {
    backgroundColor: "#ffcc00",
    border: "none",
    borderRadius: "8px",
    color: "#000",
    padding: "10px 20px",
    margin: "5px",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    fontSize: "16px",
    fontWeight: "bold",
};

const inputStyle = {
    margin: "5px",
    padding: "5px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "14px",
};

export default Toolbar;
