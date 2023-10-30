import { useState, useEffect } from 'react';


export const getFormattedUniversities = (data) => {
  return data.map((university) => ({
    name: university.name,
    webPage: university.web_pages[0] || 'N/A'
  }));
};

export const getUsernameFromSessionStorage = () => {
  const storedUsername = sessionStorage.getItem('username');
  return storedUsername ? storedUsername : '';
};

export const useFetchUniversities = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, [url]);

  return data;
};


export const logout = () => {
  sessionStorage.removeItem('username');
};