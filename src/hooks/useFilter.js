import { useState } from "react"
import { searchForWorkspaceRoot } from "vite";

export function useFilter(initialValue) {
    const [filteredValues, setFilterdValues] = useState(initialValue);

    const filterResults = (searchTerm, list) => {
        //convertimos el term de busqueda a minuscula
        const term = searchTerm.toLowerCase();
        
        const filteredList = list.filter((item) => {
            //convertimos todo de la lista de busqueda a minuscula
            const lowerCaseItem = item.name.toLowerCase();
            //retornamos cada valor incluido 
            return lowerCaseItem.includes(term);
        })
        //retornamos la lista
        return filteredList;
    };

    const applyFilter = (searchTerm) => {
        //comportamiento al estar busqueda vacia
        if (searchTerm === "") {
            setFilterdValues(initialValue);
        } else {
            const filteredList = filterResults(searchTerm, initialValue);
            setFilterdValues(filteredList)
        }
    }
    return [filteredValues, applyFilter]
}