import { useDispatch } from "react-redux";
import { useEffect } from "react";

type ActionCreator = (...args: any[]) => any;

const useFetch = (actionCreator: ActionCreator,params?: any, dependencies: any[] = []) => {
  const dispatch = useDispatch();
  console.log(actionCreator)
  useEffect(() => {
    console.log(params)
    if (params) {
      dispatch(actionCreator(Number(params)));
    }
    dispatch(actionCreator());
  }, dependencies);
};

export default useFetch;
