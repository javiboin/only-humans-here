import { PositionList } from "./components/PositionList"
import './App.css'

function App() {
    const URL_BASE = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net'

    /* fetch(URL_BASE + '/api/candidate/get-by-email?email=javi_14_228@hotmail.com')
        .then(response => response.json())
        .then(data => console.log(data)) 
    */

    return (
        <>
            <h1>Postulación para Nimble Gravity</h1>
            <PositionList />
        </>
    )
}

export default App