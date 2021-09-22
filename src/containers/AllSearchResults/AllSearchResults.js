import { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

import AllSearchResultsComponent from '~/components/AllSearchResults'
import Account from '../entities/Account'

export default function AllSearchResults() {
    const [searchResults, setSearchResults] = useState([])
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery()

    useEffect(() => {
        axios.get(`/api/users/search?q=${query.get('q')}&type=less&page=1`)
            .then(res => {
                setSearchResults(Account.createFromList(res.data))
            })
            .catch(err => {})
    }, [query.get('q')])

    return (
        <div>
            <AllSearchResultsComponent 
                searchResults={searchResults}
            />
        </div>
    )
}