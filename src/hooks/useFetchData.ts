import axios, { AxiosError } from 'axios';
import { useEffect, useReducer } from 'react';

interface State<T> {
  data: T | undefined;
  loading: boolean;
  error?: AxiosError;
}

type Action<T> =
  | {
      type: 'loading';
    }
  | {
      type: 'success';
      payload: T;
    }
  | {
      type: 'error';
      payload?: AxiosError;
    };

const reducer = <T>() => (state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case 'loading':
      return { ...state, loading: true, error: undefined };
    case 'success':
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: undefined,
      };
    case 'error':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export function useFetchData<T>(fetchUrl: string): State<T> {
  const initialState: State<T> = { data: undefined, loading: false };
  const [state, dispatch] = useReducer(reducer<T>(), initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'loading' });
      try {
        const result = await axios.get<T>(fetchUrl);
        dispatch({ type: 'success', payload: result.data });
      } catch (error) {
        const payload = axios.isAxiosError(error) ? error : undefined;
        dispatch({ type: 'error', payload });
      }
    };

    if (fetchUrl) {
      fetchData();
    }
  }, [fetchUrl]);

  return state;
}
