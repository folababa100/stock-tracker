import type { Preview } from '@storybook/react';

import '../src/index.css';

import '../src/styles/normalize.css';
import '../src/App.css';
import '../src/styles/utility.scss';

const preview: Preview = {
  decorators: [
    (Story) => (
      <div id="app">
        <Story />
      </div>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
