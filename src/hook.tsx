import { useContext, useEffect } from 'react';

import { DiagramContext, SetDiagramContext } from './context';
import { IDiagramContext, ISetDiagramContext } from './type';

export const useDiagram = (): IDiagramContext => {
  return useContext(DiagramContext);
};

export const useSetDiagram = (): ISetDiagramContext => {
  return useContext(SetDiagramContext);
};

export const useRegisterNode = (
  ref: React.RefObject<Element>,
  id: string
): void => {
  const { registerNode } = useSetDiagram();

  useEffect(() => {
    if (ref && ref.current && 'getBoundingClientRect' in ref.current) {
      registerNode(ref.current.getBoundingClientRect(), id);
    }
  }, []);
};

export const useRegisterPath = (
  ref: React.RefObject<Element>,
  id: string
): void => {
  const { registerPath } = useSetDiagram();

  useEffect(() => {
    if (ref && ref.current && 'getBoundingClientRect' in ref.current) {
      registerPath(ref.current.getBoundingClientRect(), id);
    }
  }, []);
};
