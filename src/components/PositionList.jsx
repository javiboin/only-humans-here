import { useEffect, useState } from "react"
import '../PositionList.css'

export const PositionList = () => {
    const URL_BASE = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net'

    const [positions, setPositions] = useState([])

    useEffect(() => {
        const fetchPositions = async() => {
                try {
                    const response = await fetch(URL_BASE + '/api/jobs/get-list')
                    const data = await response.json()
                    setPositions(data)
                } catch (error) {
                    console.error(error)
                }
            }
        
        fetchPositions()
    }, [])
    
    return (
        <>
            <h1>Postulación para Nimble Gravity</h1>
            <h2>Listado de Posiciones</h2>
            <ul className="list">
                {positions?.map((position) => (  
                    <ul className="item">
                        <li key={position.id} id="title">Título: {position.title}</li>
                        <li><input type="text" placeholder="Repositorio GitHub" /></li>
                        <li><button>Submit</button></li>
                    </ul>
                ))}
            </ul>
        </>
    )
}