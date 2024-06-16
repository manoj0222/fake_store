import { useDispatch } from "react-redux"; // Import the useDispatch hook from react-redux
import { useEffect } from "react"; // Import the useEffect hook from react

/**
 * Type definition for the action creator function.
 * The action creator can accept any number of arguments and return any value.
 */
type ActionCreator = (...args: any[]) => any;

/**
 * Custom hook: useFetch
 * 
 * This hook dispatches a given action creator function when the component mounts
 * or when any of the specified dependencies change.
 *
 * @param actionCreator - The Redux action creator to be dispatched.
 * @param params - Optional parameters to be passed to the action creator.
 * @param dependencies - Dependency array that controls when the effect runs. Default is an empty array.
 */
const useFetch = (actionCreator: ActionCreator, params?: any, dependencies: any[] = []) => {
  // Get the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Use the useEffect hook to dispatch the action creator when dependencies change
  useEffect(() => {
    if (params) {
      // If params are provided, dispatch the action creator with the params
      dispatch(actionCreator(Number(params)));
    } else {
      // If no params are provided, dispatch the action creator without arguments
      dispatch(actionCreator());
    }
  }, dependencies); // Dependency array ensures this effect runs when any dependency changes
};

export default useFetch; // Export the custom hook as default
