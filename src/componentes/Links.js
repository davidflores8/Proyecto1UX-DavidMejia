import React, { useEffect, useState } from 'react'
import LinkForm from "./LinkForm"
import { db } from '../firebase'

const Links = () => {

    const [links, setLinkss] = useState([])

    const addOrEditLink = async (linkObject) => {
        await db.collection('links').doc().set(linkObject);
        console.log('se agrego la nota')

    }

    const getLinks = () => {
        db.collection('links').onSnapshot((querySnapchot) => {
            const docs = [];
            querySnapchot.forEach((doc) => {
                console.log(doc.data());
                console.log(doc.id)
                docs.push({ ...doc.data(), id: doc.id });
            });
            setLinkss(docs);
        });

    }

    useEffect(() => {
        getLinks();
    }, []);


    return <div>
        <div className="col md-4 p-2">
            <LinkForm addOrEditLink={addOrEditLink} />
        </div>
        <div className="col-md-8 p-2">
            {links.map(link => (
                <div className="card mb-1">
                    <div className="card-body">
                        <h4>{link.tag}</h4>
                        <p>{link.fecha}</p>
                        <p>{link.contenido}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
}

export default Links;