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
                        <div className="list">
                        {data?.map((position) => {  
                            return (
                                <ul className="item" key={position.id}>
                                    <li id="title">Título: {position.title}</li>
                                    <li><input type="text" placeholder="Repositorio GitHub" /></li>
                                    <li><button>Submit</button></li>
                                </ul>
                            )
                        })}
                        </div>
            }   
        </>
    )
}