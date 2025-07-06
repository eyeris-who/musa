import { useEffect, useRef, useState } from 'react';

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const buttons = buttonRef.current;

    // Dynamically set canvas height
    const availableHeight = container.clientHeight - buttons.clientHeight;
    canvas.height = availableHeight;
    canvas.width = container.clientWidth;

    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.stroke();
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const setToDraw = () => {
    contextRef.current.globalCompositeOperation = 'source-over';
  };

  const setToErase = () => {
    contextRef.current.globalCompositeOperation = 'destination-out';
  };

  const saveImageToLocal = (event) => {
    const link = event.currentTarget;
    link.setAttribute('download', 'canvas.jpg');
    const image = canvasRef.current.toDataURL('image/jpg');
    link.setAttribute('href', image);
  };

  return (
    <div
      ref={containerRef}
      className="flex flex-col h-full w-full"
    >
      <div ref={buttonRef} className="mb-2 space-x-2">
        <button onClick={setToDraw} className="bg-blue-500 text-white p-2 rounded">
          <svg className="h-6 w-6" fill="#ffffff" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <title></title>
              <g>
                <path d="M78,60a5.9966,5.9966,0,0,0-6,6V84H12V24H30a6,6,0,0,0,0-12H6a5.9966,5.9966,0,0,0-6,6V90a5.9966,5.9966,0,0,0,6,6H78a5.9966,5.9966,0,0,0,6-6V66A5.9966,5.9966,0,0,0,78,60Z"></path>
                <path d="M94.2422,13.7578l-12-12a5.9979,5.9979,0,0,0-8.4844,0l-36,36A5.9958,5.9958,0,0,0,36,42V54a5.9966,5.9966,0,0,0,6,6H54a5.9956,5.9956,0,0,0,4.2422-1.7578l36-36A5.9979,5.9979,0,0,0,94.2422,13.7578ZM51.5156,48H48V44.4844l30-30L81.5156,18Z"></path>
              </g>
            </g>
          </svg>
        </button>
        <button onClick={setToErase} className="bg-red-500 text-white rounded p-1">
            <svg className="h-8 w-8" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="0.744"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.096"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0722 3.9967L20.7508 9.83395L17.0544 13.5304L13.0758 17.5H21.0041V19H7.93503L4.00195 15.0669L15.0722 3.9967ZM10.952 17.5L15.4628 12.9994L11.8268 9.3634L6.12327 15.0669L8.55635 17.5H10.952Z" fill="#ffffff"></path> </g></svg>
        </button>
        <a id="download_image_link" onClick={saveImageToLocal} className="bg-green-500 text-white p-2 cursor-pointer rounded inline-block">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M3 15C3 17.8284 3 19.2426 3.87868 20.1213C4.75736 21 6.17157 21 9 21H15C17.8284 21 19.2426 21 20.1213 20.1213C21 19.2426 21 17.8284 21 15" stroke="#ffffff" strokeWidth="3" strokeLinecap="round"/>
              <path d="M12 3V16M12 16L16 11.5M12 16L8 11.5" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
          </svg>
        </a>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full flex-1 cursor-crosshair bg-white"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
    </div>
  );
};

export default DrawingCanvas;