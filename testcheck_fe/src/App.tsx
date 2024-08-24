import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

import { fetchData } from "./API/ApiService";
import  Dialog  from "./Dialog/Dialog";

interface RepositoryData {
  name: string;
  description: string;
  language: string | null;
  forks_count: number;
  created_at: string;
}

function App() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [languages, setLanguages] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<RepositoryData | null>(null);
  useEffect(() => {
    const getData = async () => {
      try {
        const PathLink: string = "/repos";
        const result = await fetchData(PathLink);
        console.log(data);

       
        setData(result);
        setFilteredData(result);
        // Extract unique languages
        const uniqueLanguages = Array.from(new Set(result.map((repo:RepositoryData) => repo.language).filter(Boolean)));
        console.log(uniqueLanguages)
        // setLanguages(uniqueLanguages);
        setLanguages(['All', ...uniqueLanguages]);
        console.log(data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("Axios error:", error.message);
          console.log("Response data:", error.response?.data);
          console.log("Response status:", error.response?.status);
          console.log("Response headers:", error.response?.headers);
        } else {
          console.error("Unknown error:", error);
        }
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);


  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const language = event.target.value;
    setSelectedLanguage(language);

    if (language === 'All') {
        setFilteredData(data);
    } else {
        setFilteredData(data.filter((repo:any) => repo.language === language));
    }
};

const handleRowClick = (item: RepositoryData) => {
  setSelectedItem(item);
  setIsDialogOpen(true);
};

const closeDialog = () => {
  setIsDialogOpen(false);
  setSelectedItem(null);
};



  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  return (
    <div>
        <label htmlFor="language-filter">Filter by Language: </label>
        <select id="language-filter" value={selectedLanguage} onChange={handleFilterChange}>
            {languages.map((lang) => (
                <option key={lang} value={lang}>{lang}</option>
            ))}
        </select>

        {filteredData ? (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Language</th>
                        <th>Forks Count</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item: RepositoryData, index: Number) => (
                        <tr key={index.toString()} onClick={() => handleRowClick(item)}>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.language || 'N/A'}</td>
                            <td>{item.forks_count}</td>
                            <td>{new Date(item.created_at).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p>No data available</p>
        )}
        <Dialog item={selectedItem} isOpen={isDialogOpen} onClose={closeDialog} />
    </div>
);
}

export default App;
