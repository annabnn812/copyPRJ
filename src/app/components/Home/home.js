import { useMemo, useState, useEffect} from 'react';
import * as React from 'react';
import {
  MRT_EditActionButtons,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { purple } from '@mui/material/colors';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useRouter } from 'next/navigation'



  const TableDisplay = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const [patients, setPatients] = useState([]);
    const [obStudy, setObStudy] = useState([]);
    const [gynStudy, setGynStudy] = useState([]);
    const [latestData, setLatestData] = useState(new Date());

    const router = useRouter()

    useEffect(() => {
      // Update latestData on component mount or date change
      setLatestData(new Date());
    }, []); // Empty dependency array to run only once

    useEffect(() => {
      const fetchPatients = async () => {
        const response = await fetch('/api/patients');
        const data = await response.json();
        setPatients(data);
      };
  
      const fetchObStudy = async () => {
        const response = await fetch('/api/obStudy');
        const data = await response.json();
        setObStudy(data);
      };
  
      const fetchGynStudy = async () => {
        const response = await fetch('/api/gynStudy');
        const data = await response.json();
        setGynStudy(data);
      };
  
      fetchPatients();
      fetchObStudy();
      fetchGynStudy();
    }, []);


    // Combine data from patients, obStudy, and gynStudy collections based on Patient Number
    const combinedData = useMemo(() => {
      const patientMap = patients.reduce((map, patient) => {
        map[patient['Patient Number']] = patient;
        return map;
      }, {});
  
      const transformStudyData = (studies, studyType) => {
        return studies.map(study => ({
          ...study,
          ...patientMap[study['Patient Number']],
          studyType,
        }));
      };
  
      return [
        ...transformStudyData(obStudy, 'OBSTUDY'),
        ...transformStudyData(gynStudy, 'GYNSTUDY'),
      ];
    }, [patients, obStudy, gynStudy]);

    const columns = useMemo(  
      () => [ 
        {
          Cell: ({ cell }) => {
            // Format the date using toLocaleDateString()
            const formattedDate = cell.getValue()?.toLocaleDateString();
            return formattedDate ? formattedDate : '-'; // Display '-' for missing dates
          },
          accessorFn: (row) => new Date(row['Study Date']), // Transform data for sorting
          filterVariant: 'date-range',
          header: 'Study Date',
          accessorKey: 'Study Date',
          showColumnFilters: true,
          sortFn: (rowA, rowB, isDesc) => {
            const dateA = new Date(rowA.getValue('Study Date'));
            const dateB = new Date(rowB.getValue('Study Date'));
            const latestDate = new Date(latestData);
    
            // Sort by latest date first
            if (dateA.toDateString() === latestDate.toDateString()) return -1;
            if (dateB.toDateString() === latestDate.toDateString()) return 1;
    
            // If neither date is the latest, sort by date in descending order
            return isDesc ? dateB - dateA : dateA - dateB;
          },
          initialState: {
            sorting: {
              sortModel: [{ field: 'Study Date', sort: 'desc' }],
            },
          },
          sx: { 
            '& .MuiBox-root.css-8yqbvs': { // Target the container element
              display: 'grid',
              gap: '0.1rem',
            },
          },
      
          muiTableHeadCellProps: ({ column }) => ({
            sx: {
              ...(column.id === 'Study Date' && {
                width: '190px', 
                '& .MuiBox-root.css-8yqbvs': { // Target the container element
                  display: 'flex',
                  flexDirection:'column',
                  gap: '0.1rem',
                  gridTemplateColumns: "1fr 1fr",
                },
                '& .MuiInputBase-root': { // Target the input base element
                  fontSize: '0.875rem', 
                  padding: '4px',
                  width: '130px', 
                  gap: "0.1rem",
                },
                '& .MuiInputBase-input': { // Target the input field
                  marginRight: '1px', // Adjust the margin between input and adornment
                },
                '& .MuiIconButton-root': { // Target the IconButton element
                  fontSize: '0.8rem', // Adjust icon button size 
                  
                },
              }),
            },
          }),
       
        },
        
        
        {
          accessorKey: 'Patient Number',
          header: 'Patient #',
          size: 60,
          muiEditTextFieldProps: {
            required: false,  
          },
          muiFilterTextFieldProps: {
            sx: { m: '1.5rem 0', width: '100%' },
          },
         
        },
  
        {
          accessorKey: 'Last Name',
          header: 'Last Name',
          Cell: ({ row }) => (
            <a style={{textDecoration: "underline" }} href={`/patients/${row.original._id}`} target="_blank" rel="noopener noreferrer">
              {row.original['Last Name']}
            </a>
          ),
          muiEditTextFieldProps: {
            required: true,
            error: !!validationErrors?.lastName,
            helperText: validationErrors?.lastName,
            //remove any previous validation errors when Patient focuses on the input
            onFocus: () =>
              setValidationErrors({
                ...validationErrors,
                lastName: undefined,
              }),
            //optionally add validation checking for onBlur or onChange
          },
          muiFilterTextFieldProps: {
            sx: { m: '1.5rem 0', width: '100%' },
          },
         
        },
        {
          accessorKey: 'First Name',
          header: 'First Name',
          Cell: ({ row }) => (
            <a style={{ textDecoration: "underline" }} href={`/patients/${row.original._id}`} target="_blank" rel="noopener noreferrer">
              {row.original['First Name']}
            </a>
          ),
          muiEditTextFieldProps: {
            required: true,
            error: !!validationErrors?.firstName,
            helperText: validationErrors?.firstName,
            //remove any previous validation errors when Patient focuses on the input
            onFocus: () =>
              setValidationErrors({
                ...validationErrors,
                firstName: undefined,
              }),
          },
          muiFilterTextFieldProps: {
            sx: { m: '1.5rem 0', width: '100%' },
          },
         
        },
        
        {
          accessorKey: 'ID #',
          header: 'ID #',
          size: 20,
          enableEditing: false,
          muiEditTextFieldProps: {
            required: false,
          },
          muiFilterTextFieldProps: {
            sx: { m: '1.5rem 0', width: '100%' },
          },
        },
        {
          accessorKey: "Review Ready",
          header: "Review Ready",
          enableResizing: true,
          sx: { width: '60px' }, 
          size:20,
          enableEditing: false,
          muiEditTextFieldProps: {
            required: false,
          },
          muiFilterTextFieldProps: {
            sx: { m: '1.5rem 0', width: '100%' },
          },
         
          
        },
       
        {
          accessorKey: 'Last GYN Signed',
          header: "Report Signed",
          size: 60,
          enableEditing: false,
          muiEditTextFieldProps: {
            required: false,
          },
          muiFilterTextFieldProps: {
            sx: { m: '1.5rem 0', width: '100%' },
          },
          
        },
        {
          accessorKey: 'Study Number',
          header: 'Study #',
          size: 60,
          enableEditing: false,
          muiEditTextFieldProps: {
            required: false,
          },
          muiFilterTextFieldProps: {
            sx: { m: '1.5rem 0', width: '100%' },
          },
          
        },
        {
          accessorKey: 'Primary Referring Dr',
          header: 'Primary Ref. Dr.',
          muiEditTextFieldProps: {
            required: false,  
          },
          muiFilterTextFieldProps: {
            sx: { m: '1.5rem 0', width: '100%' },
          },
          
        },
        {
          accessorKey: "Reporting Physician",
          header: "Reporting Physician",
          muiEditTextFieldProps: {
            required: false,  
          },
          muiFilterTextFieldProps: {
            sx: { m: '1.5rem 0', width: '100%' },
          },
          
        },
    
        {
          accessorKey: '_id',
          header: 'id',
          enableEditing: false,
          muiEditTextFieldProps: {
            required: false,
          },
          enableColumnFilter: false,
        },
       
        {
          accessorKey: 'studyType',
          header: 'Study Type',
          size: 100,
          enableEditing: false,
          muiEditTextFieldProps: {
            required: false,
          },
          enableColumnFilter: false,
          muiFilterTextFieldProps: {
            sx: { m: '1.5rem 0', width: '100%' },
          },
        },
      ], [validationErrors]);
    
      
  
  //call READ hook
  const {
    data: fetchedPatients = [],
    isError: isLoadingPatientsError,
    isFetching: isFetchingPatients,
    isLoading: isLoadingPatients,
  } = combinedData;
  //call UPDATE hook
  const { mutateAsync: updatePatient, isPending: isUpdatingPatient } =
    useUpdatePatient();
 
  
  // UPDATE action
const handleSavePatient = async ({ values, table }) => {
  const newValidationErrors = validatePatient(values);
  if (Object.values(newValidationErrors).some((error) => error)) {
    setValidationErrors(newValidationErrors);
    return;
  }
  setValidationErrors({});

  try {
    // Extract patientId from values
    const patientId = values._id; // Assuming ID is in form data
    if (!patientId) {
      throw new Error('Missing patient ID in form data'); // Handle missing ID
    }

    // Call the updatePatient mutation function with the extracted patientId
    await updatePatient(patientId, values);
    console.error('Error upd:', error.message);

    // If the update is successful, exit editing mode
    table.setEditingRow(null);
  } catch (error) {
    console.error('Error updating patient:', error.message);
    // Handle error here, e.g., show error message to user
    setValidationErrors({ updateError: error.message }); // Set validation error for update
  }
};

    const handleClose = () => {
      // Logic to handle closing the dialog
    };

  const theme = createTheme({
    palette: {
      primary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#7c7981',
      },
      secondary: {
        light: '#ff7961',
        main: purple[500],
        dark: purple[700],
        contrastText: '#747278',
      },
    },
  });
 
  const table = useMaterialReactTable({
    columns,
    data: combinedData,
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    tableLayout: 'fixed',
    
    positionActionsColumn: 'right',
    muiTableBodyRowProps: ({ row }) => ({
      sx: {
        '&:last-child td, &:last-child th': { border: 0 }, // Remove the border from the last row
        backgroundColor:
          row.original.studyType === 'OBSTUDY'
            ? '#DAF1F9'
            : row.original.studyType === 'GYNSTUDY'
            ? '#FFDCF5'
            : '#CEF0B9', //another Study type
      },
    }),
    
    initialState: {
      pagination: { pageSize: 25, pageIndex: 0 },
      showColumnFilters: true,
      columnVisibility:{'_id': false ,'Patient Number': false ,},
      enableColumnResizing: true,
      columnSizes: {
        "Review Ready": 20, 
      },
      sorting: [
        {
          id: 'Study Date',
          desc: true,
          customSort: (rowA, rowB) => {
            const dateA = new Date(rowA.original['Study Date']);
            const dateB = new Date(rowB.original['Study Date']);
            const latestDate = new Date(latestData);
  
            // Sort by latest date first
            if (dateA.toDateString() === latestDate.toDateString()) return -1;
            if (dateB.toDateString() === latestDate.toDateString()) return 1;
  
            // If neither date is the latest, sort by date in descending order
            return dateB - dateA;
          },
        },
      ],
     
    },
    
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingPatientsError
      ? {
          color: 'error',
          children: 'Error loading data',
          
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '500px',
        
      },
    },
    
  
    


    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSavePatient,
    
    state: {
      isLoading: isLoadingPatients,
      showAlertBanner: isLoadingPatientsError,
      showProgressBars: isFetchingPatients,
    },
  });

  return <MaterialReactTable table={table} enableColumnResizing={true}  />;
};
 


//UPDATE hook (put Patient in api)
function useUpdatePatient() {
  const queryClient = useQueryClient();
 
  return useMutation({
   mutationFn: async (patientId) => {
    const response = await fetch(`/api/patients/${patientId}`, {
     method: 'PUT',
    });
 
    if (!response.ok) {
     throw new Error(`Error updating patient: ${await response.text()}`); // Include server error message
    }
 
    return await response.json();
   },
   // Optimistic update (optional): Update local state with new patient data
   onMutate: (updatedPatient) => {
    queryClient.setQueryData(['Patients'], (prevData) =>
     prevData.map((patient) =>
      patient._id === updatedPatient._id ? updatedPatient : patient
     )
    );
   },
  });
 }



const queryClient = new QueryClient();

const TableDisplayWithProviders = () => (
  //Put this with your other react-query providers near root of your app
  <LocalizationProvider dateAdapter={AdapterDayjs}>
  <QueryClientProvider client={queryClient}> 
    <TableDisplay />
  </QueryClientProvider>
  </LocalizationProvider>
);

export default TableDisplayWithProviders;

