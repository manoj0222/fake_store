
import '@testing-library/jest-dom';

jest.mock('axios');

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));
