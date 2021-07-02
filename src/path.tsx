import React, { PropsWithChildren } from 'react';

import { useDiagram } from './hook';
import { IPath } from './type';

type Props<T> = {
  paths: T[];
  children: (
    path: T,
    from: DOMRect | undefined,
    to: DOMRect | undefined
  ) => React.ReactNode;
};

function _DiagramPaths<T extends IPath>({
  paths,
  children,
}: PropsWithChildren<Props<T>>): React.ReactElement {
  const { nodes } = useDiagram();

  return (
    <>
      {paths.map((path) =>
        children(path, nodes.get(path.from), nodes.get(path.to))
      )}
    </>
  );
}

export const DiagramPaths = React.memo(_DiagramPaths) as typeof _DiagramPaths;
