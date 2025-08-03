import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export function PopupProvider({ children }) {
  const [activePage, setActivePage] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState(API_URL);

  const fetchData = useCallback(async (url) => {
    setIsFetching(true);
    setIsError(false);
try { 
const { data } = await axios.get(url);
      setCharacters(data.results);
      setInfo(data.info);
    } catch (error) {
      setIsError(true);
      console.error('Failed to fetch data:', error);
    } finally {
      setIsFetching(false);
    }

  } , [setCharacters, setInfo, setIsFetching, setIsError]);

  useEffect(() => {
    fetchData(apiURL);
  }, [apiURL]);

  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage,
      apiURL,
      setApiURL,
      characters,
      isFetching,
      isError,
      info
    }),
    [activePage, apiURL, characters, isFetching, isError, info]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
