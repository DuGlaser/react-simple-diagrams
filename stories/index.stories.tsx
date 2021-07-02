import { Meta, Story } from '@storybook/react/types-6-0';
import { useMemo, useRef } from 'react';

import {
  DiagramPaths,
  DiagramProvider,
  useDiagram,
  useRegisterNode,
} from '../src';

export default {
  title: 'DiagramNodes',
  component: DiagramProvider,
} as Meta;

const useNodeCenterPosition = (position: DOMRect) => {
  const {
    canvas: {
      position: { top, left },
    },
  } = useDiagram();
  const {
    left: nodeLeft,
    top: nodeTop,
    width: nodeWidth,
    height: nodeHeight,
  } = position;

  const x = useMemo(
    () => nodeLeft + nodeWidth / 2 - left,
    [nodeLeft, nodeWidth, left]
  );

  const y = useMemo(
    () => nodeTop + nodeHeight / 2 - top,
    [nodeTop, nodeHeight, top]
  );

  return { x, y };
};

const Line: React.VFC<{
  from: DOMRect;
  to: DOMRect;
}> = ({ from, to }) => {
  const { x: x1, y: y1 } = useNodeCenterPosition(from);
  const { x: x2, y: y2 } = useNodeCenterPosition(to);

  return <line x1={x1} x2={x2} y1={y1} y2={y2} stroke="black" />;
};

const Node: React.FC<{ id: string }> = ({ id, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  useRegisterNode(ref, id);

  return (
    <div
      ref={ref}
      style={{
        width: '100px',
        height: '100px',
        background: 'red',
        margin: '0 10px 10px 0',
      }}
    >
      {children}
    </div>
  );
};

const Template: Story = () => {
  const {
    canvas: {
      size: { width, height },
    },
  } = useDiagram();

  const nodes = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
  ];

  const paths = [
    { id: '1', from: '1', to: '2' },
    { id: '2', from: '1', to: '4' },
    { id: '3', from: '1', to: '5' },
    { id: '4', from: '1', to: '6' },
    { id: '5', from: '1', to: '6' },
    { id: '6', from: '6', to: '3' },
  ];

  return (
    <>
      <svg
        style={{ position: 'absolute', top: 0, left: 0, width, height }}
        viewBox={`0 0 ${width} ${height}`}
      >
        <DiagramPaths paths={paths}>
          {(path, from, to) =>
            from && to && <Line key={path.id} from={from} to={to} />
          }
        </DiagramPaths>
      </svg>
      <div
        style={{
          width: '400px',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        {nodes.map((node) => (
          <Node key={node.id} id={node.id}>
            {node.id}
          </Node>
        ))}
      </div>
    </>
  );
};

export const Default = Template.bind({});
