import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Snackbar from '@mui/material/Snackbar';
import dayjs from 'dayjs';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';


function TrainingsPage() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchTrainings();
    }, []);

    const fetchTrainings = () => {
        fetch("https://customerrest.herokuapp.com/api/trainings")
        .then(response => response.json())
        .then(data => setTrainings(data.content))
    }

    const columns = [
        { field: 'date', sortable: true, filter: true, valueFormatter: params => dayjs(params.value).format("HH:mm, DD-MMM-YY") },
        { field: 'duration', sortable: true, filter: true },
        { field: 'activity', sortable: true, filter: true }
    ]

    return (
        <>
        <div className="ag-theme-material" style={{ height: 600, width: '90%' }}>
            <AgGridReact
            columnDefs={columns}
            rowData={trainings}
            pagination={true}
            paginationPageSize={10}
            suppressCellFocus={true}
            />
        </div>
        <Snackbar
            open={open}
            message="Training deleted"
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
        />
        </>
    )
}

export default TrainingsPage;