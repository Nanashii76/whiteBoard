import React, { useRef, useState, useEffect } from "react";

interface CanvasProps {
    color: string;
    brushSize: number;
    tool: 'brush' | 'eraser';
}

const Canvas: React.FC<CanvasProps> = ({ color, brushSize, tool }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);

    const startDrawing = (x: number, y: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        setIsDrawing(true);
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const draw = (x: number, y: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !isDrawing) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.lineWidth = brushSize;
        ctx.lineCap = "round";
        ctx.strokeStyle = tool === 'brush' ? color : 'white'; // Use 'white' for eraser
        ctx.globalCompositeOperation = tool === 'brush' ? 'source-over' : 'destination-out'; // Brush or eraser behavior
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        startDrawing(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        draw(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        startDrawing(touch.clientX - canvasRef.current!.offsetLeft, touch.clientY - canvasRef.current!.offsetTop);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        draw(touch.clientX - canvasRef.current!.offsetLeft, touch.clientY - canvasRef.current!.offsetTop);
    };

    const handleTouchEnd = () => {
        setIsDrawing(false);
    };

    const resizeCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    };

    useEffect(() => {
        resizeCanvas(); // Set initial size
        window.addEventListener('resize', resizeCanvas); // Update size on window resize

        return () => {
            window.removeEventListener('resize', resizeCanvas); // Clean up on unmount
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "5px solid #000",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)"
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        />
    );
};

export default Canvas;
