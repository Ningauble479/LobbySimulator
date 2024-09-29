import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const MainLobbyContext = createContext();

export const useMainLobby = () => useContext(MainLobbyContext);

export const MainLobbyProvider = ({ children }) => {
    const [options, setOptions] = useState(['Quickplay']);

    const addOptions = (newOptions) => {
        setOptions([options, ...newOptions]);
    }

    const removeOptions = (optionsToRemove) => {
        setOptions(options.filter((option) => !optionsToRemove.includes(option)));
    }

    const getMenu = (game) => {
        if(game){
            return axios.get(`http://localhost:3000/api/menu/${game}`)
                .then(response => {
                    setOptions(response.data);
                    return response.data;
                })
                .catch(error => {
                    console.error('Error fetching menu options:', error);
                    return [];
                });
        }
    }

    const value = {
        options,
        addOptions,
        removeOptions,
        getMenu
    };

    return (
        <MainLobbyContext.Provider value={value}>
            {children}
        </MainLobbyContext.Provider>
    );
};

export default MainLobbyProvider;
