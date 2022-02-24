import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react';
import './AddCustomer';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';
import AddCustomer from "./AddCustomer";
import AddTraining from "./AddTraining";
import EditCustomer from "./EditCustomer";

function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        fetchCustomers();
    }, []);

    const openSnackBar = () => {
        setOpen(true);
    }

    const closeSnackBar = () => {
        setOpen(false);
    }

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
        .catch(err => console.err(err))
    }

    const deleteCustomer = (url) => {
         if (window.confirm('Are you sure?')) {
            fetch(url, { method: 'DELETE' })
            .then(response => {
                if(response.ok) {
                    fetchCustomers();
                    setMsg('Customer deleted');
                    openSnackBar();
              } else {
                    alert('Something went wrong in deletion');
              } 
            })
            .catch(err => console.err(err));
        }
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers',
        {
            method: 'POST',
            body: JSON.stringify(newCustomer),
            headers: { 'Content-type' : 'application/json' }
        })
        .then(_ => fetchCustomers())
        .catch(err => console.err(err))
    }

    const addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings',
        {
            method: 'POST',
            body: JSON.stringify(newTraining),
            headers: { 'Content-type' : 'application/json' }
        })
        .then(_ => fetchCustomers())
        .catch(err => console.err(err))
    }

    const updateCustomer = (url, updatedCustomer) => {
        fetch(url, {
             method: 'PUT', 
             body: JSON.stringify(updatedCustomer),
             headers: { 'Content-type' : 'application/json' }
        })
        .then(_ => fetchCustomers())
        .catch(err => console.err(err))
    }

    const columns = [
        { field: 'firstname', sortable:true, filter:true },
        { field: 'lastname', sortable:true, filter:true },
        { field: 'streetaddress', sortable:true, filter:true },
        { field: 'postcode', sortable:true, filter:true },
        { field: 'city', sortable:true, filter:true },
        { field: 'email', sortable:true, filter:true },
        { field: 'phone', sortable:true, filter:true },
        { 
            headerName: '',
            field: 'links.0.href',
            width: 100,
            cellRendererFramework: params => 
                <EditCustomer 
                    link={params.value} customer={params.data} updateCustomer={updateCustomer}
                />
         },
        {   
            headerName: '',
            field: 'links.0.href',
            width: 100,
            cellRendererFramework: params => 
                <IconButton color='secondary' onClick={() => deleteCustomer(params.value)}>
                    <DeleteIcon />
                </IconButton>
        },
        { 
            headerName: '',
            field: 'links.2.href' && 'links.0.href',
            width: 200,
            cellRendererFramework: params => 
                <AddTraining 
                    link={params.value} training={params.data} addTraining={addTraining}
                />
         }
    ]

    return (
        <div>
            <AddCustomer addCustomer={addCustomer} />
            <div className="ag-theme-material" style={{ height: 650, width: '90%', margin: 'auto' }}>
                <AgGridReact 
                    rowData={customers}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={10}
                    suppressCellSelection={true}
                />
            </div>
            <Snackbar
                open={open}
                message={msg}
                autoHideDuration={3000}
                onClose={closeSnackBar}
            />
        </div>
    );
}

export default Customerlist;
