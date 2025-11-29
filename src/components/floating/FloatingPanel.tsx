import React, { useRef, useState, useEffect } from 'react';
import { XMarkIcon, MinusIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

interface FloatingPanelProps {
  id: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  defaultPosition?: { x: number; y: number };
  width?: number;
  height?: number;
  resizable?: boolean;
}

const FloatingPanel: React.FC<FloatingPanelProps> = ({
  id,
  title,
  isOpen,
  onClose,
  children,
  defaultPosition = { x: 100, y: 100 },
  width = 380,
  height,
  resizable = false,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Load saved position from localStorage
  useEffect(() => {
    const savedPosition = localStorage.getItem(`panel-${id}-position`);
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition));
    }
  }, [id]);

  // Save position to localStorage
  const savePosition = (newPosition: { x: number; y: number }) => {
    localStorage.setItem(`panel-${id}-position`, JSON.stringify(newPosition));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.panel-header')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newPosition = {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        };
        
        // Keep panel within viewport bounds
        const maxX = window.innerWidth - width;
        const maxY = window.innerHeight - 100;
        
        newPosition.x = Math.max(0, Math.min(newPosition.x, maxX));
        newPosition.y = Math.max(0, Math.min(newPosition.y, maxY));
        
        setPosition(newPosition);
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        savePosition(position);
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, position, width]);

  if (!isOpen) return null;

  const panelStyle: React.CSSProperties = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    width: `${width}px`,
    height: isMinimized ? 'auto' : typeof height === 'number' ? `${height}px` : height || 'auto',
  };

  return (
    <div
      ref={panelRef}
      className={`floating-panel ${isDragging ? 'dragging' : ''} ${isMinimized ? 'minimized' : ''}`}
      style={panelStyle}
      onMouseDown={handleMouseDown}
    >
      <div className="panel-header">
        <div className="panel-title">
          <ChevronUpDownIcon className="drag-handle" />
          <span>{title}</span>
        </div>
        <div className="panel-actions">
          <button
            className="panel-action-btn"
            onClick={() => setIsMinimized(!isMinimized)}
            aria-label={isMinimized ? 'Expand' : 'Minimize'}
          >
            <MinusIcon className="w-4 h-4" />
          </button>
          <button
            className="panel-action-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {!isMinimized && (
        <div className="panel-content">
          {children}
        </div>
      )}
      
      {resizable && !isMinimized && (
        <div className="panel-resize-handle" />
      )}
    </div>
  );
};

export default FloatingPanel;

