import { useFetch } from "../useFetch"
import '../PositionList.css'

export const PositionList = () => {
    const URL_BASE = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net'
    const endpoint = '/api/jobs/get-list'

    const { data, isLoading, error } = useFetch(URL_BASE + endpoint)
    
    return (
        <>
            <h1>Postulación para Nimble Gravity</h1>
            <h2>Listado de Posiciones</h2>

            {isLoading? 
                <h4>Cargando...</h4>
                : error? 
                    <h4>Error al cargar las posiciones: {error}</h4> 
                    : 
                        <ul className="list">
                            {data?.map(position => (
                                <li className="item" key={position.id}>
                                    <h3 id="title">Título: {position.title}</h3>
                                    <input type="text" placeholder="Repositorio GitHub" />
                                    <button>Submit</button>
                                </li>
                            ))}
                        </ul>
            }   
        </>
    )
}