import React from 'react';

import { useDiagram } from './hook';
import { IPath } from './type';

export const DiagramPaths: React.FC<{
  paths: IPath[];
  children: (
    path: IPath,
    from: DOMRect | undefined,
    to: DOMRect | undefined
  ) => React.ReactNode;
}> = React.memo(function _DiagramPath({ paths, children }) {
  const { nodes } = useDiagram();

  return (
    <>
      {paths.map((path) =>
        children(path, nodes.get(path.from), nodes.get(path.to))
      )}
    </>
  );
});
