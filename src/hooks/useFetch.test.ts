import { renderHook } from '@testing-library/react-hooks';
import { useDispatch } from 'react-redux';
import useFetch from './useFecth';

// Mock useDispatch from react-redux
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('useFetch', () => {
  const mockDispatch = jest.fn();
  const mockActionCreator = jest.fn();

  beforeEach(() => {
    // Reset the mock implementations before each test
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    mockDispatch.mockClear();
    mockActionCreator.mockClear();
  });

  it('should dispatch action twice when params are provided', () => {
    // Render the hook with params and empty dependencies
    renderHook(() => useFetch(mockActionCreator, '123', []));

    // Check if dispatch was called twice
    expect(mockDispatch).toHaveBeenCalledTimes(2);
    // Check if dispatch was called with action creator with params
    expect(mockDispatch).toHaveBeenCalledWith(mockActionCreator(123));
    // Check if dispatch was called with action creator without params
    expect(mockDispatch).toHaveBeenCalledWith(mockActionCreator());
  });

  it('should dispatch action once when params are not provided', () => {
    // Render the hook without params and empty dependencies
    renderHook(() => useFetch(mockActionCreator, undefined, []));

    // Check if dispatch was called once
    expect(mockDispatch).toHaveBeenCalledTimes(1);
    // Check if dispatch was called with action creator without params
    expect(mockDispatch).toHaveBeenCalledWith(mockActionCreator());
  });

  it('should re-run effect when dependencies change', () => {
    const { rerender } = renderHook(
      ({ params, dependencies }) => useFetch(mockActionCreator, params, dependencies),
      {
        initialProps: { params: '123', dependencies: ['dep1'] },
      }
    );

    // Initial render should call dispatch twice
    expect(mockDispatch).toHaveBeenCalledTimes(2);

    // Change dependencies and rerender
    rerender({ params: '123', dependencies: ['dep2'] });

    // Check if dispatch was called two more times
    expect(mockDispatch).toHaveBeenCalledTimes(4);
  });

  it('should not re-run effect when dependencies do not change', () => {
    const { rerender } = renderHook(
      ({ params, dependencies }) => useFetch(mockActionCreator, params, dependencies),
      {
        initialProps: { params: '123', dependencies: ['dep1'] },
      }
    );

    // Initial render should call dispatch twice
    expect(mockDispatch).toHaveBeenCalledTimes(2);

    // Rerender with the same dependencies
    rerender({ params: '123', dependencies: ['dep1'] });

    // Check if dispatch was not called again
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});
