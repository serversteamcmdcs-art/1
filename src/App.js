import React, { useRef, useState, useEffect, useCallback } from 'react';
import './App.css';

// Иконки инструментов
const Icons = {
  pencil: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
    </svg>
  ),
  brush: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/>
      <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/>
    </svg>
  ),
  eraser: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 20H7L3 16c-.8-.8-.8-2 0-2.8L13.7 2.5a2 2 0 0 1 2.8 0L21.5 7.5a2 2 0 0 1 0 2.8L11 21"/>
      <path d="M6 11l6 6"/>
    </svg>
  ),
  fill: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 11l-8-8-8.6 8.6a2 2 0 0 0 0 2.8l5.2 5.2c.8.8 2 .8 2.8 0L19 11z"/>
      <path d="M5 2l5 5"/>
      <path d="M2 13h15"/>
      <path d="M22 20.8a2 2 0 1 1-4 0c0-1.1 2-3.8 2-3.8s2 2.7 2 3.8z"/>
    </svg>
  ),
  line: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="5" y1="19" x2="19" y2="5"/>
    </svg>
  ),
  rect: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    </svg>
  ),
  circle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
    </svg>
  ),
  text: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="4 7 4 4 20 4 20 7"/>
      <line x1="9" y1="20" x2="15" y2="20"/>
      <line x1="12" y1="4" x2="12" y2="20"/>
    </svg>
  ),
  pipette: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 22l1-1h3l9-9"/>
      <path d="M3 21v-3l9-9"/>
      <path d="M15 6l3.5-3.5a2.12 2.12 0 1 1 3 3L18 9"/>
      <path d="M14.5 6.5L9 12"/>
    </svg>
  ),
  undo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 7v6h6"/>
      <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>
    </svg>
  ),
  redo: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 7v6h-6"/>
      <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3L21 13"/>
    </svg>
  ),
  clear: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
      <line x1="10" y1="11" x2="10" y2="17"/>
      <line x1="14" y1="11" x2="14" y2="17"/>
    </svg>
  ),
  save: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  upload: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="17 8 12 3 7 8"/>
      <line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
  ),
  spray: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5V16"/>
      <path d="M6 16v6h4v-6"/>
      <path d="M14 7h.01"/>
      <path d="M17 7h.01"/>
      <path d="M20 7h.01"/>
      <path d="M14 11h.01"/>
      <path d="M17 11h.01"/>
      <path d="M20 11h.01"/>
      <path d="M17 15h.01"/>
    </svg>
  ),
  triangle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2L2 22h20L12 2z"/>
    </svg>
  ),
};

// Предустановленные цвета
const PRESET_COLORS = [
  '#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00',
  '#ff00ff', '#00ffff', '#ff8c00', '#8b4513', '#808080', '#c0c0c0',
  '#800000', '#008000', '#000080', '#808000', '#800080', '#008080',
  '#ffc0cb', '#90ee90', '#add8e6', '#ffb6c1', '#ffa07a', '#20b2aa',
];

// Шаблоны размеров холста
const CANVAS_PRESETS = [
  { label: '1920×1080 (Full HD)', width: 1920, height: 1080 },
  { label: '1600×900 (HD+)', width: 1600, height: 900 },
  { label: '1280×720 (HD)', width: 1280, height: 720 },
  { label: '1024×768 (XGA)', width: 1024, height: 768 },
  { label: '800×600 (SVGA)', width: 800, height: 600 },
  { label: '512×512 (Квадрат)', width: 512, height: 512 },
];

// Инструменты
const TOOLS = [
  { id: 'pencil', name: 'Карандаш', icon: Icons.pencil },
  { id: 'brush', name: 'Кисть', icon: Icons.brush },
  { id: 'spray', name: 'Распылитель', icon: Icons.spray },
  { id: 'eraser', name: 'Ластик', icon: Icons.eraser },
  { id: 'fill', name: 'Заливка', icon: Icons.fill },
  { id: 'pipette', name: 'Пипетка', icon: Icons.pipette },
  { id: 'line', name: 'Линия', icon: Icons.line },
  { id: 'rect', name: 'Прямоугольник', icon: Icons.rect },
  { id: 'circle', name: 'Эллипс', icon: Icons.circle },
  { id: 'triangle', name: 'Треугольник', icon: Icons.triangle },
  { id: 'text', name: 'Текст', icon: Icons.text },
];

function App() {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pencil');
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [opacity, setOpacity] = useState(100);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const historyIndexRef = useRef(-1);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [tempCanvas, setTempCanvas] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [fillShape, setFillShape] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [fontSize, setFontSize] = useState(24);
  const dragCounterRef = useRef(0);
  const [showCanvasSetup, setShowCanvasSetup] = useState(true);
  const [canvasSize, setCanvasSize] = useState({ width: 1280, height: 720 });
  const [customSize, setCustomSize] = useState({ width: 1280, height: 720 });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [spacePressed, setSpacePressed] = useState(false);
  const canvasContainerRef = useRef(null);

  // Сохранение в историю
  const saveToHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imageData = canvas.toDataURL();
    setHistory(prev => {
      const cutoff = historyIndexRef.current + 1;
      const newHistory = prev.slice(0, cutoff);
      newHistory.push(imageData);
      return newHistory;
    });
    setHistoryIndex(prev => prev + 1);
  }, []);

  useEffect(() => {
    historyIndexRef.current = historyIndex;
  }, [historyIndex]);

  // Инициализация canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    const context = canvas.getContext('2d');
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.lineCap = 'round';
    context.lineJoin = 'round';
    contextRef.current = context;

    setHistory([]);
    setHistoryIndex(-1);
    historyIndexRef.current = -1;
    // Сохраняем начальное состояние
    requestAnimationFrame(() => saveToHistory());
  }, [canvasSize, saveToHistory]);

  const applyCanvasSize = useCallback(() => {
    const width = Math.max(100, Number(customSize.width) || 1280);
    const height = Math.max(100, Number(customSize.height) || 720);
    setCanvasSize({ width, height });
    setShowCanvasSetup(false);
  }, [customSize]);

  // Отмена
  const undo = useCallback(() => {
    if (historyIndex <= 0) return;

    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      const context = contextRef.current;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    };
    img.src = history[newIndex];
  }, [history, historyIndex]);

  // Повтор
  const redo = useCallback(() => {
    if (historyIndex >= history.length - 1) return;

    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      const context = contextRef.current;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, 0, 0);
    };
    img.src = history[newIndex];
  }, [history, historyIndex]);

  // Очистка холста
  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);
    saveToHistory();
  }, [saveToHistory]);

  // Сохранение изображения
  const saveImage = useCallback(() => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'PaintAI_рисунок.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }, []);

  // Загрузка изображения
  const loadImage = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const context = contextRef.current;
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // Масштабируем изображение, чтобы поместилось на холст
        const scale = Math.min(
          canvas.width / img.width,
          canvas.height / img.height,
          1
        );
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        
        context.drawImage(img, x, y, img.width * scale, img.height * scale);
        saveToHistory();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }, [saveToHistory]);

  // Заливка (flood fill)
  const floodFill = useCallback((startX, startY, fillColor) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const startIdx = (startY * canvas.width + startX) * 4;
    const startR = data[startIdx];
    const startG = data[startIdx + 1];
    const startB = data[startIdx + 2];

    // Преобразуем hex в rgb
    const fillR = parseInt(fillColor.slice(1, 3), 16);
    const fillG = parseInt(fillColor.slice(3, 5), 16);
    const fillB = parseInt(fillColor.slice(5, 7), 16);

    if (startR === fillR && startG === fillG && startB === fillB) return;

    const stack = [[startX, startY]];
    const visited = new Set();

    while (stack.length > 0) {
      const [x, y] = stack.pop();
      const key = `${x},${y}`;

      if (visited.has(key)) continue;
      if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue;

      const idx = (y * canvas.width + x) * 4;
      if (
        Math.abs(data[idx] - startR) > 10 ||
        Math.abs(data[idx + 1] - startG) > 10 ||
        Math.abs(data[idx + 2] - startB) > 10
      ) continue;

      visited.add(key);
      data[idx] = fillR;
      data[idx + 1] = fillG;
      data[idx + 2] = fillB;
      data[idx + 3] = 255;

      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }

    context.putImageData(imageData, 0, 0);
  }, []);

  // Пипетка
  const pickColor = useCallback((x, y) => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    const pixel = context.getImageData(x, y, 1, 1).data;
    const hex = '#' + [pixel[0], pixel[1], pixel[2]]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('');
    setColor(hex);
  }, []);

  // Распылитель
  const spray = useCallback((x, y, context) => {
    const density = brushSize * 2;
    for (let i = 0; i < density; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * brushSize;
      const offsetX = Math.cos(angle) * radius;
      const offsetY = Math.sin(angle) * radius;
      context.fillStyle = color;
      context.globalAlpha = opacity / 100;
      context.fillRect(x + offsetX, y + offsetY, 1, 1);
    }
  }, [brushSize, color, opacity]);

  // Начало рисования
  const startDrawing = useCallback((e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    if (tool === 'fill') {
      floodFill(Math.floor(x), Math.floor(y), color);
      saveToHistory();
      return;
    }

    if (tool === 'pipette') {
      pickColor(Math.floor(x), Math.floor(y));
      return;
    }

    if (tool === 'text') {
      setTextPosition({ x, y });
      setShowTextInput(true);
      return;
    }

    setIsDrawing(true);
    setStartPos({ x, y });

    const context = contextRef.current;
    context.globalAlpha = opacity / 100;

    if (['line', 'rect', 'circle', 'triangle'].includes(tool)) {
      // Сохраняем текущее состояние для фигур
      const temp = canvas.toDataURL();
      setTempCanvas(temp);
    } else if (tool === 'spray') {
      spray(x, y, context);
    } else {
      context.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
      context.lineWidth = brushSize;
      context.beginPath();
      context.moveTo(x, y);
    }
  }, [tool, color, opacity, brushSize, floodFill, pickColor, spray, saveToHistory, zoom]);

  // Рисование
  const draw = useCallback((e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const context = contextRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    if (tool === 'spray') {
      spray(x, y, context);
      return;
    }

    if (['line', 'rect', 'circle', 'triangle'].includes(tool)) {
      // Восстанавливаем холст и рисуем предварительный вид фигуры
      if (tempCanvas) {
        const img = new Image();
        img.onload = () => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(img, 0, 0);
          context.globalAlpha = opacity / 100;
          context.strokeStyle = color;
          context.fillStyle = color;
          context.lineWidth = brushSize;

          if (tool === 'line') {
            context.beginPath();
            context.moveTo(startPos.x, startPos.y);
            context.lineTo(x, y);
            context.stroke();
          } else if (tool === 'rect') {
            context.beginPath();
            if (fillShape) {
              context.fillRect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
            }
            context.strokeRect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
          } else if (tool === 'circle') {
            const radiusX = Math.abs(x - startPos.x) / 2;
            const radiusY = Math.abs(y - startPos.y) / 2;
            const centerX = startPos.x + (x - startPos.x) / 2;
            const centerY = startPos.y + (y - startPos.y) / 2;
            context.beginPath();
            context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
            if (fillShape) {
              context.fill();
            }
            context.stroke();
          } else if (tool === 'triangle') {
            context.beginPath();
            context.moveTo(startPos.x + (x - startPos.x) / 2, startPos.y);
            context.lineTo(x, y);
            context.lineTo(startPos.x, y);
            context.closePath();
            if (fillShape) {
              context.fill();
            }
            context.stroke();
          }
        };
        img.src = tempCanvas;
      }
    } else {
      context.lineTo(x, y);
      context.stroke();
    }
  }, [isDrawing, tool, tempCanvas, startPos, color, brushSize, opacity, fillShape, spray, zoom]);

  // Завершение рисования
  const stopDrawing = useCallback(() => {
    if (!isDrawing) return;
    setIsDrawing(false);
    setTempCanvas(null);
    contextRef.current.globalAlpha = 1;
    saveToHistory();
  }, [isDrawing, saveToHistory]);

  // Добавление текста
  const addText = useCallback(() => {
    if (!textInput.trim()) {
      setShowTextInput(false);
      return;
    }

    const context = contextRef.current;
    context.font = `${fontSize}px Inter, sans-serif`;
    context.fillStyle = color;
    context.globalAlpha = opacity / 100;
    context.fillText(textInput, textPosition.x, textPosition.y);
    context.globalAlpha = 1;

    setTextInput('');
    setShowTextInput(false);
    saveToHistory();
  }, [textInput, textPosition, color, opacity, fontSize, saveToHistory]);

  // Обработка drag and drop
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current++;
    if (e.dataTransfer.types.includes('Files')) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current--;
    if (dragCounterRef.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounterRef.current = 0;
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        loadImage(file);
      }
    }
  }, [loadImage]);

  // Загрузка файла через input
  const handleFileInput = useCallback((e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      loadImage(file);
    }
  }, [loadImage]);

  // Горячие клавиши
  useEffect(() => {
    const isEditableTarget = (target) => {
      if (!target) return false;
      const tag = target.tagName;
      return tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable;
    };

    const handleKeyDown = (e) => {
      if (isEditableTarget(e.target)) return;

      const key = e.code || e.key;
      const keyLower = (e.key || '').toLowerCase();
      const isMod = e.ctrlKey || e.metaKey;

      if (isMod && (key === 'KeyZ' || keyLower === 'z' || keyLower === 'я')) {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
        return;
      }

      if (isMod && (key === 'KeyY' || keyLower === 'y' || keyLower === 'н')) {
        e.preventDefault();
        redo();
        return;
      }

      if (isMod && (key === 'KeyS' || keyLower === 's' || keyLower === 'ы')) {
        e.preventDefault();
        saveImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [undo, redo, saveImage]);

  // Zoom с Ctrl + колёсико
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setZoom(prev => Math.min(5, Math.max(0.1, prev + delta)));
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  // Пробел для режима панорамирования
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && !e.repeat && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        setSpacePressed(true);
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space') {
        setSpacePressed(false);
        setIsPanning(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Обработчики панорамирования
  const handlePanStart = useCallback((e) => {
    if (spacePressed) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  }, [spacePressed, pan]);

  const handlePanMove = useCallback((e) => {
    if (isPanning) {
      setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
    }
  }, [isPanning, panStart]);

  const handlePanEnd = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Сброс zoom и pan
  const resetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  return (
    <div className="app">
      {showCanvasSetup && (
        <div className="setup-overlay">
          <div className="setup-modal">
            <div className="setup-header">
              <div className="setup-title">
                <span>🎨</span>
                <h2>Размер холста</h2>
              </div>
              <p>Выберите шаблон или задайте свои размеры</p>
            </div>

            <div className="setup-presets">
              {CANVAS_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  className={`preset-btn ${customSize.width === preset.width && customSize.height === preset.height ? 'active' : ''}`}
                  onClick={() => setCustomSize({ width: preset.width, height: preset.height })}
                >
                  <span className="preset-label">{preset.label}</span>
                  <span className="preset-size">{preset.width} × {preset.height}</span>
                </button>
              ))}
            </div>

            <div className="setup-custom">
              <div className="input-group">
                <label>Ширина (px)</label>
                <input
                  type="number"
                  min="100"
                  max="8192"
                  value={customSize.width}
                  onChange={(e) => setCustomSize(prev => ({ ...prev, width: e.target.value }))}
                />
              </div>
              <div className="input-group">
                <label>Высота (px)</label>
                <input
                  type="number"
                  min="100"
                  max="8192"
                  value={customSize.height}
                  onChange={(e) => setCustomSize(prev => ({ ...prev, height: e.target.value }))}
                />
              </div>
            </div>

            <div className="setup-actions">
              <button className="action-btn" onClick={() => setCustomSize({ width: 1280, height: 720 })}>
                Сбросить
              </button>
              <button className="action-btn save-btn" onClick={applyCanvasSize}>
                Начать рисование
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Заголовок */}
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🎨</span>
          <h1>PaintAI</h1>
        </div>
        <div className="header-actions">
          <button className="action-btn" onClick={undo} title="Отменить (Ctrl+Z)">
            {Icons.undo}
            <span>Отменить</span>
          </button>
          <button className="action-btn" onClick={redo} title="Повторить (Ctrl+Y)">
            {Icons.redo}
            <span>Повторить</span>
          </button>
          <button className="action-btn" onClick={clearCanvas} title="Очистить холст">
            {Icons.clear}
            <span>Очистить</span>
          </button>
          <label className="action-btn" title="Загрузить изображение">
            {Icons.upload}
            <span>Загрузить</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              style={{ display: 'none' }}
            />
          </label>
          <button className="action-btn save-btn" onClick={saveImage} title="Сохранить (Ctrl+S)">
            {Icons.save}
            <span>Сохранить</span>
          </button>
        </div>
      </header>

      <div className="main-content">
        {/* Панель инструментов */}
        <aside className="toolbar">
          <div className="toolbar-section">
            <h3>Инструменты</h3>
            <div className="tools-grid">
              {TOOLS.map(t => (
                <button
                  key={t.id}
                  className={`tool-btn ${tool === t.id ? 'active' : ''}`}
                  onClick={() => setTool(t.id)}
                  title={t.name}
                >
                  {t.icon}
                  <span className="tool-name">{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="toolbar-section color-section">
            <div className="color-header">
              <h3>Палитра</h3>
              <div className="current-color-preview" style={{ backgroundColor: color }}>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="color-input-hidden"
                  title="Выбрать свой цвет"
                />
                <div className="color-hex">{color.toUpperCase()}</div>
              </div>
            </div>
            <div className="color-presets-grid">
              {PRESET_COLORS.map(c => (
                <button
                  key={c}
                  className={`color-preset-btn ${color === c ? 'active' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                  title={c}
                />
              ))}
            </div>
          </div>

          <div className="toolbar-section">
            <h3>Размер: {brushSize}px</h3>
            <input
              type="range"
              min="1"
              max="100"
              value={brushSize}
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="slider"
            />
            <div className="brush-preview">
              <div
                className="brush-dot"
                style={{
                  width: Math.min(brushSize, 50),
                  height: Math.min(brushSize, 50),
                  backgroundColor: tool === 'eraser' ? '#ccc' : color,
                }}
              />
            </div>
          </div>

          <div className="toolbar-section">
            <h3>Прозрачность: {opacity}%</h3>
            <input
              type="range"
              min="1"
              max="100"
              value={opacity}
              onChange={(e) => setOpacity(parseInt(e.target.value))}
              className="slider"
            />
          </div>

          {['rect', 'circle', 'triangle'].includes(tool) && (
            <div className="toolbar-section">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={fillShape}
                  onChange={(e) => setFillShape(e.target.checked)}
                />
                <span>Заливка фигуры</span>
              </label>
            </div>
          )}

          {tool === 'text' && (
            <div className="toolbar-section">
              <h3>Размер шрифта: {fontSize}px</h3>
              <input
                type="range"
                min="8"
                max="72"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="slider"
              />
            </div>
          )}
        </aside>

        {/* Область холста */}
        <main
          className="canvas-area"
          ref={canvasContainerRef}
          onMouseDown={handlePanStart}
          onMouseMove={handlePanMove}
          onMouseUp={handlePanEnd}
          onMouseLeave={handlePanEnd}
        >
          <div
            className={`canvas-container ${isDragging ? 'dragging' : ''} ${spacePressed ? 'panning' : ''}`}
            style={{
              width: canvasSize.width,
              height: canvasSize.height,
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            }}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <canvas
              ref={canvasRef}
              className="canvas"
              onMouseDown={spacePressed ? undefined : startDrawing}
              onMouseMove={spacePressed ? undefined : draw}
              onMouseUp={spacePressed ? undefined : stopDrawing}
              onMouseLeave={spacePressed ? undefined : stopDrawing}
            />
            {isDragging && (
              <div className="drag-overlay">
                <div className="drag-content">
                  {Icons.upload}
                  <p>Перетащите изображение сюда</p>
                </div>
              </div>
            )}
            {showTextInput && (
              <div
                className="text-input-overlay"
                style={{ left: textPosition.x, top: textPosition.y }}
              >
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') addText();
                    if (e.key === 'Escape') setShowTextInput(false);
                  }}
                  placeholder="Введите текст..."
                  autoFocus
                  style={{ fontSize: `${fontSize}px`, color }}
                />
                <button onClick={addText}>✓</button>
                <button onClick={() => setShowTextInput(false)}>✕</button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Строка состояния */}
      <footer className="statusbar">
        <span>Инструмент: {TOOLS.find(t => t.id === tool)?.name}</span>
        <span>Размер: {brushSize}px</span>
        <span>Масштаб: {Math.round(zoom * 100)}%</span>
        <button className="reset-view-btn" onClick={resetView} title="Сбросить вид (масштаб и позицию)">
          🔄 Сбросить вид
        </button>
        <span className="hint">Ctrl+колёсико = масштаб, Пробел+мышь = перемещение</span>
      </footer>
    </div>
  );
}

export default App;
