export type IPath = {
  id: string;
  from: string;
  to: string;
};

export type ICanvas = {
  position: {
    top: number;
    left: number;
  };

  size: {
    width: number;
    height: number;
  };
};

export type IDiagramContext = {
  nodes: Map<string, DOMRect>;
  paths: Map<string, DOMRect>;
  canvas: ICanvas;
};

export type ISetDiagramContext = {
  registerNode: (position: DOMRect, id: string) => void;
  registerPath: (position: DOMRect, id: string) => void;
};
