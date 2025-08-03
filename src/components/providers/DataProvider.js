import axios from 'axios';
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback
} from 'react';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export function DataProvider({ children }) {
  const [activePage, setActivePage] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState(API_URL);

  const getURLParams = useCallback(() => {
    const params = new URLSearchParams(window.location.search);

    return {
      name: params.get('name') || '',
      status: params.get('status') || '',
      species: params.get('species') || '',
      gender: params.get('gender') || '',
      page: params.get('page') || '1'
    };
  }, []);

  const updateURLParams = useCallback((newFilters, page = 1) => {
    const params = new URLSearchParams();

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && key !== 'page') {
        params.set(key, value);
      }
    });

    if (page > 1) {
      params.set('page', page.toString());
    }

    const newURL = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    window.history.pushState({}, '', newURL);
  }, []);

  const [filters, setFilters] = useState(getURLParams);

  const buildFilteredURL = useCallback((baseURL, filters, page = 1) => {
    const url = new URL(baseURL);

    Object.entries(filters).forEach(([key, value]) => {
      if (value && key !== 'page') {
        url.searchParams.set(key, value);
      }
    });

    if (page > 1) {
      url.searchParams.set('page', page.toString());
    }

    return url.toString();
  }, []);

  const fetchData = useCallback(async (url) => {
    setIsFetching(true);
    setIsError(false);

    axios
      .get(url)
      .then(({ data }) => {
        setIsFetching(false);
        setCharacters(data.results);
        setInfo(data.info);
      })
      .catch((e) => {
        setIsFetching(false);
        setIsError(true);
        console.error(e);
      });
  }, []);

  const applyFilters = useCallback(
    (newFilters, page = 1) => {
      setFilters(newFilters);
      setActivePage(page - 1);

      updateURLParams(newFilters, page);

      const filteredURL = buildFilteredURL(API_URL, newFilters, page);
      setApiURL(filteredURL);
    },
    [buildFilteredURL, updateURLParams]
  );

  const changePage = useCallback(
    (page) => {
      const pageNumber = page + 1;
      setActivePage(page);

      updateURLParams(filters, pageNumber);

      const filteredURL = buildFilteredURL(API_URL, filters, pageNumber);
      setApiURL(filteredURL);
    },
    [filters, buildFilteredURL, updateURLParams]
  );

  const clearFilters = useCallback(() => {
    const emptyFilters = {
      name: '',
      status: '',
      species: '',
      gender: ''
    };
    setFilters(emptyFilters);
    setActivePage(0);

    window.history.pushState({}, '', window.location.pathname);
    setApiURL(API_URL);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const urlFilters = getURLParams();
      const page = parseInt(urlFilters.page) || 1;

      setFilters(urlFilters);
      setActivePage(page - 1);

      const filteredURL = buildFilteredURL(API_URL, urlFilters, page);
      setApiURL(filteredURL);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [getURLParams, buildFilteredURL]);

  useEffect(() => {
    const urlFilters = getURLParams();
    const page = parseInt(urlFilters.page) || 1;

    const hasFilters = Object.values(urlFilters).some(
      (value) => value && value !== '1'
    );

    if (hasFilters) {
      setFilters(urlFilters);
      setActivePage(page - 1);
      const filteredURL = buildFilteredURL(API_URL, urlFilters, page);
      setApiURL(filteredURL);
    }
  }, [getURLParams, buildFilteredURL]);

  useEffect(() => {
    fetchData(apiURL);
  }, [apiURL, fetchData]);

  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage: changePage,
      apiURL,
      setApiURL,
      characters,
      fetchData,
      isFetching,
      isError,
      info,
      filters,
      applyFilters,
      clearFilters
    }),
    [
      activePage,
      apiURL,
      characters,
      isFetching,
      isError,
      info,
      fetchData,
      filters,
      applyFilters,
      clearFilters,
      changePage
    ]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
