import { useState } from "react"
import { useFetch } from "../useFetch"
import '../PositionList.css'

export const PositionList = () => {
    const URL_BASE = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net'

    const { data: candidateData, isLoading: candidateLoading, error: candidateError } = useFetch(URL_BASE + '/api/candidate/get-by-email?email=javi_14_228@hotmail.com')
    const uuid = candidateData?.uuid
    const candidateId = candidateData?.candidateId
    
    const { data, isLoading, error} = useFetch(URL_BASE + '/api/jobs/get-list')

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

            const payload = {
                uuid: uuid,
                jobId: jobId,
                candidateId: candidateId,
                repoUrl: repoUrls[jobId] || ""
            }

            console.log('Payload: ' + JSON.stringify(payload, null, 2))

        /*  const res = await fetch(URL_BASE + '/api/candidate/apply-to-job', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "uuid": uuid,
                    "jobId": jobId,
                    "candidateId": candidateId,
                    "repoUrl": repoUrls[jobId] || ""
                })
            })
            const data = await res.json()
            console.log(data) */

        } catch (error) {
            console.log("Error en la petición:" + error)
        }
    }
    
    return (
        <>
            {candidateLoading? <pre>Cargando...</pre> : error?
            <pre>Error: {candidateError}</pre>:
                <div>
                    <p>UUID: {candidateData.uuid}</p>
                    <p>Candidate ID: {candidateData.candidateId}</p>
                    <pre>{JSON.stringify(candidateData, null, 2)}</pre>
                </div>
            }

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
                                    <p>ID: {position.id}</p>
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