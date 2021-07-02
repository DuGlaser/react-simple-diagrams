import { DiagramProvider } from '../src';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  (Story) => (
    <DiagramProvider>
      <Story />
    </DiagramProvider>
  ),
];
