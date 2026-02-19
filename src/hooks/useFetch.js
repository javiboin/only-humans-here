import { useEffect, useState } from "react"

export function useFetch(url) {
    const [state, setState] = useState({
        data: null,
        isLoading: true,
        error: null
    })

    const { data, isLoading, error } = state

    useEffect(() => {
        const getFetch = async() => {
            if (!url) return
            try {
                const response = await fetch(url)
                const data = await response.json()
                setState({
                    data,
                    error: null,
                    isLoading: false
                })
            } catch (error) {
                setState({
                    data: null,
                    error: error,
                    isLoading: true
                })
            }   
        }
        
        getFetch()
    }, [url])
    
    return { 
        data,
        isLoading,
        error
    }
}