import React, { useState, useEffect } from 'react';
import { 
    getFormattedUniversities, 
    getUsernameFromSessionStorage, 
    useFetchUniversities,
    logout,

} from '../helper/helper';
import {useNavigate} from 'react-router-dom';

function LandingPage() {
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [username, setUsername] = useState('');
  const universities = useFetchUniversities('http://universities.hipolabs.com/search?country=Indonesia');
  const navigate = useNavigate();


  useEffect(() => {
    setUsername(getUsernameFromSessionStorage());
  }, []);

  const formattedUniversities = getFormattedUniversities(universities);

  const openPopup = (university) => {
    setSelectedUniversity(university);
  };

  const closePopup = () => {
    setSelectedUniversity(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 flex flex-col">
         <nav>
    <div class="flex justify-between items-center p-4 bg-white">
      <div class="flex items-center">
        
        <h2 className="mb-4 text-xl font-bold text-gray-700">Hello, {username}</h2>
      </div>
      <div class="flex items-center space-x-2">
        
        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={handleLogout}>
        Logout
      </button>
      </div>
    </div>
  </nav>
      <div className="bg-white p-4 rounded-md mb-4">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-md">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Web Page</th>
              </tr>
            </thead>
            <tbody>
              {formattedUniversities.map((university, index) => (
                <tr key={index} className="border-t cursor-pointer hover:bg-gray-200" onClick={() => openPopup(university)}>
                  <td className="py-2 px-4">{university.name}</td>
                  <td className="py-2 px-4">
                    <a href={university.webPage} target="_blank" rel="noopener noreferrer">
                      {university.webPage}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedUniversity && (
      <div className="flex items-center justify-center fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg flex w-96">

        <div className="w-1/2">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-md">
                <th className="py-2 px-4 text-left" style={{ width: '100%' }}>Name</th>
                <th className="py-2 px-4 text-left" style={{ width: '100%' }}>Domain</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-2 px-4">{selectedUniversity.name}</td>
                <td className="py-2 px-4">{selectedUniversity.webPage}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={closePopup}>Close</button>
      </div>
    </div>
      )}
    </div>
  );
}

export default LandingPage;
