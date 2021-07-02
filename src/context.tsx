import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ICanvas, IDiagramContext, ISetDiagramContext } from './type';

export const DiagramContext = React.createContext<IDiagramContext>({
  nodes: new Map(),
  paths: new Map(),
  canvas: {
    position: {
      top: 0,
      left: 0,
    },
    size: {
      width: 0,
      height: 0,
    },
  },
});

export const SetDiagramContext = React.createContext<ISetDiagramContext>({
  registerNode: () => {},
  registerPath: () => {},
});

export const DiagramProvider: React.FC = ({ children }) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<Map<string, DOMRect>>(
    new Map<string, DOMRect>()
  );
  const [paths, setPaths] = useState<Map<string, DOMRect>>(
    new Map<string, DOMRect>()
  );
  const [canvas, setCanvas] = useState<ICanvas>({
    position: {
      top: 0,
      left: 0,
    },
    size: {
      width: 0,
      height: 0,
    },
  });

  const registerNode = useCallback((position: DOMRect, id: string) => {
    setNodes((cur) => {
      return cur.set(id, position);
    });
  }, []);

  const registerPath = useCallback((position: DOMRect, id: string) => {
    setPaths((cur) => {
      return cur.set(id, position);
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const { top, left, width, height } =
          canvasRef.current.getBoundingClientRect();

        setCanvas({
          position: {
            top,
            left,
          },
          size: {
            width,
            height,
          },
        });
      }
    };

    handleResize();
    document.addEventListener('resize', handleResize);

    return () => document.removeEventListener('resize', handleResize);
  }, [canvasRef]);

  return (
    <div
      ref={canvasRef}
      style={{
        width: '800px',
        height: '400px',
        position: 'relative',
      }}
    >
      <DiagramContext.Provider
        value={{
          nodes,
          paths,
          canvas,
        }}
      >
        <SetDiagramContext.Provider
          value={{
            registerNode,
            registerPath,
          }}
        >
          {children}
        </SetDiagramContext.Provider>
      </DiagramContext.Provider>
    </div>
  );
};
