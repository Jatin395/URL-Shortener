import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PATH from '../Utiles/PATH';
import { useParams } from 'react-router-dom';

function UrlDetails() {
    const { id } = useParams();  
    const [url, setUrl] = useState(null); 
    const fetchUrl = async () => {
        try {
            const response = await axios.post(`${PATH.URL.VIEW}${id}`);
            if (response.status === 200) {  
                setUrl(response.data.data); 
            }
        } catch (error) {
            console.error("Error fetching URL details:", error);
        }
    };

    useEffect(() => {
        fetchUrl();
    }, [id]);
    
    return (
        <>
            {url ? (
                <div>
                    <h2>{url.name}</h2>
                    <p>{url.long}</p>
                    <img src={url.QR} alt={`${url.name} QR code`} />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
}

export default UrlDetails;