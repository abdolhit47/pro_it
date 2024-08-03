import { useState, useEffect, useCallback  } from "react";
import axios from "axios";
import { baseurl } from '../Baseurl/baseurl';

const useFollowUp = ($id) => {
    const [Data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filter, setFilter] = useState('');
    const [DataFilter, setDataFilter] = useState('');
//"showoffice" . "getfollowup"

    const value = $id==="Office" ? "showoffice" : ($id === "Employee" ? "Showemployee" : "getfollowup")
    const getFollowUp =useCallback ( async () => {
        const response = await axios.get(baseurl + value, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        });
        setData(response.data);
        setFilteredData(response.data);
    },[]);

    useEffect(() => {
        getFollowUp();
    }, [getFollowUp]);

    const applyFilters = (nameFilter, DataFilter) => {
        let filteredData = Data;
        if($id==="Office" || $id==="Employee"){
            if (nameFilter) {
                filteredData = filteredData.filter(item =>
                    item.name.includes(nameFilter)||
                    item.address.includes(nameFilter)
                );
            }
            if (DataFilter) {
                filteredData = filteredData.filter(item =>
                    item.address === DataFilter
                );
            }
        }else{
            if (nameFilter) {
                filteredData = filteredData.filter(item =>
                    item.name_mwaten.includes(nameFilter) ||
                    item.name_office.includes(nameFilter) ||
                    item.name_service.includes(nameFilter)
                );
            }
            if (DataFilter) {
                filteredData = filteredData.filter(item =>
                    item.name_office === DataFilter
                );
            }
        }

        setFilteredData(filteredData);
    };

    return {
        Data,
        filteredData,
        filter,
        setFilter,
        DataFilter,
        setDataFilter,
        applyFilters,
        getFollowUp
    };
};

export default useFollowUp;
