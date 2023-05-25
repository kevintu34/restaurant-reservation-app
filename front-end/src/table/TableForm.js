import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function TableForm({initialFormState, apiHandler}) {
    const [formData, setFormData] = useState({
        table_name: '',
        capacity: '',
        status: 'Free'
    })
    const [errorMessage, setErrorMessage] = useState(null)
    const history = useHistory()

    //sets form data to initial state passed in so it can be used for edit and new
    useEffect(()=>{
        setFormData(initialFormState)
    },[initialFormState])

    //updates form STATE when values are changed
    function changeHandler(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    //calls API to submit the reservation to our server
    async function submitHandler(event) {
        event.preventDefault()
        try {
            formData.capacity = Number(formData.capacity)
            await apiHandler(formData)
            history.push(`/dashboard`)
        } catch(error) {
            setErrorMessage(error.message)
        }
    }

    console.log(formData)
    return <div>
        <form onSubmit={submitHandler}>
            <h3 className="display-4 mb-4">Create a New Table</h3>
            <div>
                {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="table_name">
                    Table Name
                </label>
                <input type="text" id="table_name" name="table_name" value={formData.table_name} onChange={changeHandler} className="form-control"/>
            </div>
            <div className="form-group">
                <label htmlFor="capacity">
                    Capacity
                </label>
                <input type="number" id="capacity" name="capacity" value={formData.capacity} onChange={changeHandler} className="form-control"/>
            </div>
            <div>
                <button type="button" onClick={()=> history.goBack()} className="btn btn-outline-secondary btn-sm">Cancel</button>
                <button className="btn btn-outline-primary btn-sm mx-2" type="submit">Submit</button>
            </div>
        </form>
    </div>
}

export default TableForm