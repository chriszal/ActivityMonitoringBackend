import {  useContext, useState,useEffect } from 'react';

import { StudyContext } from '../contexts/study-context';


export const useStudy = () => useContext(StudyContext);

export const StudyProvider = ({ children }) => {
  const [selectedStudy, setSelectedStudy] = useState(null);

  useEffect(() => {
    // Get the initial state from localStorage only on client-side
    const savedStudy = localStorage.getItem('selectedStudy');
    if (savedStudy) {
      setSelectedStudy(JSON.parse(savedStudy));
    }
  }, []);

  useEffect(() => {
    // Update localStorage whenever selectedStudy changes
    if (selectedStudy) {
      localStorage.setItem('selectedStudy', JSON.stringify(selectedStudy));
    }
  }, [selectedStudy]);

  const selectStudy = (study) => {
    setSelectedStudy(study);
  };

  return (
    <StudyContext.Provider value={{ selectedStudy, selectStudy }}>
      {children}
    </StudyContext.Provider>
  );
};