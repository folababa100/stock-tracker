import type { Meta, StoryObj } from '@storybook/react';
import Button from '.';

const meta = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'danger'],
      },
    },
    children: { control: 'text' },
    icon: { control: 'boolean' },
    className: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
    icon: null,
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'Danger Button',
    icon: null,
  },
};

export const WithIcon: Story = {
  args: {
    children: 'Button with Icon',
    icon: '🚀',
  },
};
