import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { createRoot } from 'react-dom/client';
import './index.css'
const container = document.getElementById('root')
const root = createRoot(container)

export default function App() {
    let [results, setResults] = useState([])

    let [isloading, setIsLoading] = useState(true)

    function getResults() {
        axios.get("https://deploy-deneme.herokuapp.com/")
        .then((response) => {
            setResults(response.data)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        getResults();
    }, [])

    let allResults = results.map((element, idx) => {
        return (
            <h1 key={element.id}>{element.name}</h1>
        )
    })

    function submitBerkay() {
        setIsLoading(true)
        axios.post("https://deploy-deneme.herokuapp.com/")
        .then(() => {
            getResults()
        })
    }

    allResults.reverse();

    return (
        <div className='body'>
            <section className='info'>
                <button onClick={submitBerkay}>Bir berkay da sen ekle</button>
                <h1>Toplam berkay sayısı: {isloading ? "Loading..." : results.length}</h1>
            </section>
            <section>
                {allResults}
            </section>
        </div>
    )
}

root.render(<App />)