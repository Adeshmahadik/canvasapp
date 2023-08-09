import React, { useState, useRef, useEffect } from 'react';
import { ChromePicker } from 'react-color'; // Import the color picker component
import './style.css';

const Index: React.FC = () => {
    const [mvalue, setMValue] = useState(5);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState('#000000'); // Initialize with black color

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.strokeStyle = color;
        ctx.lineWidth = mvalue;
        setContext(ctx);
      }
    }
  }, [color, mvalue]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (context) {
      setDrawing(true);
      const { offsetX, offsetY } = e.nativeEvent;
      context.beginPath();
      context.moveTo(offsetX, offsetY);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    if (!drawing || !context) return;
    const { offsetX, offsetY } = e.nativeEvent;
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const endDrawing = () => {
    setDrawing(false);
  };

  const clearCanvas = () => {
    if (context) {
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    }
  };

  const saveImage = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'drawing.png';
      link.click();
    }
  };

  return (
    <div className='container'>
      <div className='grid-container'>
        <div className='draw'>
          <canvas
            ref={canvasRef}
            width={600}
            height={200}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseOut={endDrawing}
          />
        </div>
        <div className='preview'>
          <canvas id='previewCanvas'  width={800}
            height={600}/>
        </div>
        <div className='bottom-component'>
          <div className='colorbox'>
            <ChromePicker // Use the color picker component from react-color
              color={color}
              onChange={(newColor) => setColor(newColor.hex)}
            />
          </div>
          <button id='button' type='button' className='button' onClick={saveImage}>
            Save as Image
          </button>
          <button id='button' type='button' className='button' onClick={clearCanvas}>
            Clear Canvas
          </button>
          <div className='range-slider'>
          <input type='range' value={mvalue} onChange={(e) => setMValue(e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
