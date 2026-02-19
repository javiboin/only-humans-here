import { useState } from "react"
import { useFetch } from "../hooks/useFetch"
import '../PositionList.css'

export const PositionList = () => {
    const URL_BASE = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net'

    /* OBTENER DATOS DEL CANDIDATO */
    const { data: candidateData, error: candidateError } = useFetch(URL_BASE + '/api/candidate/get-by-email?email=javi_14_228@hotmail.com')
    const uuid = candidateData?.uuid
    const candidateId = candidateData?.candidateId
    const applicationId = candidateData?.applicationId

    /* OBTENER LISTA DE POSICIONES DISPONIBLES */
    const { data, isLoading, error} = useFetch(URL_BASE + '/api/jobs/get-list')

    /* MANEJO DEL FORMULARIO */
    const [repoUrls, setRepoUrls] = useState('')

    const handleInputChange = (positionId, e) => {
        setRepoUrls(prev => ({
            ...prev,
            [positionId]: e.target.value
        }))
    }

    const handleSubmit = async (jobId, e) => {
        e.preventDefault()
        try {            
            if (!uuid || !candidateId) {
                alert('Error: uuid o candidateId no disponibles. ' + {candidateError})
                return
            }
            
            if (!repoUrls[jobId]) {
                alert('Error: Debes ingresar un repositorio. ')
                return
            }

            const res = await fetch(URL_BASE + '/api/candidate/apply-to-job', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "uuid": uuid,
                    "jobId": jobId,
                    "candidateId": candidateId,
                    "applicationId": applicationId,
                    "repoUrl": repoUrls[jobId] || ""
                })
            })
            const data = await res.json()
            console.log(data)

        } catch (error) {
            console.log("Error en la petición:" + error)
        }
    }
    
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
                                    <form onSubmit={(e) => handleSubmit(position.id, e)}>
                                        <input 
                                            type="text" 
                                            placeholder="Repositorio GitHub" 
                                            value={repoUrls[position.id] || ""}
                                            onChange={(e) => handleInputChange(position.id, e)}
                                        />
                                        <button type="submit">Submit</button>
                                    </form>
                                </li>
                            ))}
                        </ul>
            }   
        </>
    )
}