import {getUser, addItemToJournalEntries } from "./testdb";
import React, { useState, useEffect } from 'react';
//This is a test file to work with the database
interface Items {
    id: string;
    title: string;
    url: string;
    isActive?: boolean;
}
interface UserDetails {
    id: string;
    title: string;
    url: string;
    items: Items [];
}

function DataFetcher() {
    const [data, setData] = useState<UserDetails[]>([]);
    console.log(data);

    useEffect (() => {
        const fetchData = async () => {
            try {
                const fetchedData = await getUser();
                console.log(fetchedData);
                setData(fetchedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
          <h1>Fetched Data</h1>
          {data.length > 0 ? (
            <ul>
              {data.map((user) => (
                <li key={user.id}>
                  <h2>{user.title}</h2>
                  <a href={user.url}>{user.url}</a>
                  {user.items.length > 0 && (
                    <ul>
                      {user.items.map((item) => (
                        <li key={item.id}>
                          <p> {item.id}</p>
                          <p> {item.title}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>No data fetched yet.</p>
          )}
        </div>
      );
    }

export default DataFetcher;
