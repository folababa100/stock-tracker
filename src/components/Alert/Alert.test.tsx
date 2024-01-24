import Alert from 'components/Alert';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AlertType } from 'types';

describe('Alert Component', () => {
  it('renders correctly when shown', () => {
    render(<Alert show={true}>Test Alert</Alert>);
    expect(screen.getByText('Test Alert')).toBeInTheDocument();
  });

  it('does not render when show is false', () => {
    render(<Alert show={false}>Test Alert</Alert>);
    expect(screen.queryByText('Test Alert')).not.toBeInTheDocument();
  });

  it.each(['success', 'warning', 'error', 'info'])(
    'applies the correct class for %s type',
    (type) => {
      render(
        <Alert show={true} type={type as AlertType}>
          Test Alert
        </Alert>,
      );
      expect(screen.getByText('Test Alert').parentNode).toHaveClass(
        `alert-${type}`,
      );
    },
  );

  it('displays dismiss button when dismissible', () => {
    render(
      <Alert show={true} dismissible={true}>
        Test Alert
      </Alert>,
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('does not display dismiss button when not dismissible', () => {
    render(
      <Alert show={true} dismissible={false}>
        Test Alert
      </Alert>,
    );
    expect(screen.queryByRole('button')).toBeNull();
  });

  // Test for additional props
  it('passes additional props to the alert component', () => {
    const customProp = 'customValue';
    render(
      <Alert show={true} data-custom={customProp}>
        Test Alert
      </Alert>,
    );
    expect(screen.getByText('Test Alert').parentNode).toHaveAttribute(
      'data-custom',
      customProp,
    );
  });
});
