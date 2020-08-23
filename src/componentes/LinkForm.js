import React, { useState, useEffect } from 'react'
import { db } from '../firebase';
//import { splitBsPropsAndOmit } from 'react-bootstrap/lib/utils/bootstrapUtils';



const LinkForm = (props) => {

    const initialStateValues = {
        tag: '',
        fecha: new Date().toString(),
        contenido: ''
    };



    const [values, setValues] = useState(initialStateValues);


    const handleSubmit = e => {
        e.preventDefault();
        props.addOrEditLink(values);
        setValues({ ...initialStateValues });

    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value })

    };

    const getLinkByID = async (id) =>{
       const doc= await db.collection('links').doc(id).get();
        setValues({...doc.data()})
    }

    useEffect(() => {
        console.log(props.currentId)
        if (props.currentId === '') {
            setValues({ ...initialStateValues});
        }
        else {
            getLinkByID(props.currentId);
        }
    }, [props.currentId]);

    return (
                <form className="card card-body " onSubmit={handleSubmit}>
                <div className="form-group input group">
                    <div className="form-Group input-group">
                        <div className="input-group-text bg -light">
                            <i className="material-icons">label_outline</i>
                        </div>
                        <input type="text" className="form-control" placeholder="Etiqueta de la nota" name="tag" onChange={handleInputChange} value={values.tag} />
                    </div>

                    <div className="form-group input-group">
                        <div className=" input-group-text bg light">
                            <i className="material-icons">date_range</i>
                        </div>
                        <input type="text" className="form-control" name="fecha" placeholder="Fecha" onChange={handleInputChange} value={values.fecha} />
                    </div>

                    <div className="form-group">
                        <textarea name="contenido" rows="3" className="form-control" placeholder="Escribe tu nota aqui" onChange={handleInputChange} value={values.contenido}></textarea>
                    </div>
                    <button className="btn btn-primary btn-block">
                        {props.currentId ==='' ? 'Guardar Nota' : 'Actualizar Nota'}
                    </button>

                </div>
            
            </form>

    )
}

export default LinkForm;

