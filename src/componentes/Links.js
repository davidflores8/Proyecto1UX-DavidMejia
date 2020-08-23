import React, { useEffect, useState } from 'react'
import LinkForm from "./LinkForm"
import { db } from '../firebase'
import { toast } from 'react-toastify'

const Links = () => {

    const [links, setLinkss] = useState([])
    const [currentId, setCurrentId] = useState("")

    const addOrEditLink = async (linkObject) => {
        if (currentId === '') {
            await db.collection('links').doc().set(linkObject);
            toast('La nota se ha agregado', {
                type: 'success'
            });
        }
        else {
           await db.collection('links').doc(currentId).update(linkObject);
           toast('La nota se ha modificado', {
            type: 'info'
        });
        setCurrentId('');
        }
    };

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

    const onDeleteLink = async id => {
        if (window.confirm('¿Está seguro que desea eliminar este elemento?')) {
            await db.collection('links').doc(id).delete();
            toast('La nota se ha eliminado', {
                type: 'error',
                autoClose: 2000,
            });
        }
    };

    useEffect(() => {
        getLinks();
    }, []);


    return <div>
        <div className="col md-4 p-2">
            <LinkForm {...{ addOrEditLink, currentId, links }} />
        </div>
        <div className="col md-4 p-2 ">

        </div>
        <div className="col-md-8 p-2">
            {links.map(link => (
                <div className="card mb-1" key={link.id}>
                    <div className="card-body">
                        <div className="d-flex justify-content-between">
                            <h4>{link.tag}</h4>
                            <div>
                                <i className="material-icons text-danger" onClick={() => onDeleteLink(link.id)}>close</i>
                                <i className="material-icons" onClick={() => setCurrentId(link.id)}>create</i>
                            </div>
                        </div>
                        <p>{link.fecha}</p>
                        <p>{link.contenido}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
}

export default Links;