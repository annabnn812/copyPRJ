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
import { AccountCircle } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { purple } from '@mui/material/colors';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import  { fetchLocations }  from "../Locations/ListLocations"
import {StatesUSA} from "./StatesUSA"
import DatePickerCell from './DatePickerCell'
import { useRouter } from 'next/navigation'
import moment from 'moment';



//READ hook (get Patients from api)
function useGetPatients() {
  return useQuery({
    queryKey: ['Patients'], // Unique query key for patients
    queryFn: async () => {
      const response = await fetch('/api/patients'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch patients');
      }
      return await response.json();
    },
    // Optional: Define configurations for caching, refetching, etc.
  });
}

  
  const TableDisplay = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const [patients, setPatients] = useState([]);
    const [locations, setLocations] = useState([]);
    const router = useRouter()

    function calculateAge(birthDate) {
      const today = new Date();
      const birthDateObj = moment(birthDate);
      let age = today.getFullYear() - birthDateObj.year();
      const months = today.getMonth() - birthDateObj.month();
      if (months < 0 || (months === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
      }
    
      return { birthDate, age };
    }


    useEffect(() => {
      // Fetch locations when the component mounts
      async function loadLocations() {
        const locationsData = await fetchLocations();
        setLocations(locationsData);
      }
      loadLocations();
    }, []);


    const columns = useMemo(  
      () => [
        
        {
          accessorKey: "Patient Number",
          header: 'Patient #',
          size: 60,
          enableEditing: false,
          muiEditTextFieldProps: {
            required: false,
          },
        },
        {
          accessorKey: 'MI',
          header: 'MI',
          muiEditTextFieldProps: {
            required: false,  
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
        },
        
        {
         
          accessorKey: 'Birth Date',
          header: 'Birth Date',
          accessor: (row) => {
            const birthDateData = calculateAge(row['Birth Date']); // Call calculateAge
            const formattedBirthDate = birthDateData.birthDate; // Access birthDate from returned object
            return formattedBirthDate; // Return the formatted birthDate
          },
          muiEditTextFieldProps: {
            required: true,  
            Cell: ({ cell }) => {
              const date = new Date(cell.getValue());
              return <span>{date.toLocaleDateString()}</span>;
            },
            renderEditCell: ({ cell }) => {
              return (
                <DatePickerCell
                  value={cell.getValue()}
                  onChange={(newValue) => {
                    row.values[column.id] = newValue;
                  }}
                />
              );
            },

          },
          
        },
        {
          accessorKey: 'Age',
          header: 'Age',
          accessor: (row) => calculateAge(row['Birth Date']).age,
          enableEditing: false,
          muiEditTextFieldProps: {
            required: false,  
          },
        },
        {
          accessorKey: 'Address',
          header: 'Address',
          muiEditTextFieldProps: {
            required: false,  
          },
        },
        {
          accessorKey: 'City',
          header: 'City',
          muiEditTextFieldProps: {
            required: false,  
          },
        },
        {
          accessorKey: 'State',
          header: 'State',
          editVariant: 'select',
          editSelectOptions: StatesUSA,
          muiEditTextFieldProps: {
            required: false,  
          },
        },
        {
          accessorKey: 'ZIP',
          header: 'ZIP',
          muiEditTextFieldProps: {
            required: false,  
          },
        },
        {
          accessorKey: 'Cell Phone',
          header: 'Cell Phone',
          muiEditTextFieldProps: {
            required: false,  
          },
        },
        {
          accessorKey: 'EMail',
          header: 'Email',
          muiEditTextFieldProps: {
            required: false,  
          },
        },
        {
          accessorKey: 'Prior Study Location',
          header: 'Study Location',
          editVariant: 'select',
          editSelectOptions: locations.map(location => ({ label: location, value: location })),
          muiEditTextFieldProps: {
            required: false,  
          },
        },
        {
          accessorKey: 'Date Added',
          header: 'Date Added',
          muiEditTextFieldProps: {
            required: false,  
          },
        },
        {
          accessorKey: 'Last Visit',
          header: 'Last Visit',
          muiEditTextFieldProps: {
            required: false,  
          },
        },
        {
          accessorKey: 'Followup Date',
          header: 'Followup Date',
          muiEditTextFieldProps: {
            required: false,  
          },
        },
        {
          accessorKey: 'ID #',
          header: 'ID #',
          size: 60,
          enableEditing: false,
          muiEditTextFieldProps: {
            required: false,
          },
        },

        {
          accessorKey: 'ID 2',
          header: 'ID Alt',
          muiEditTextFieldProps: {
            required: false,  
          },
        },
        {
          accessorKey: 'Referring Facility',
          header: 'Referring Facility',
          muiEditTextFieldProps: {
            required: false,  
          },
        },
        {
          accessorKey: 'Primary Referring Dr.',
          header: 'Primary Referring Dr.',
          muiEditTextFieldProps: {
            required: false,  
          },
        },
        
        
        {
          accessorKey: '_id',
          header: 'id',
          enableEditing: false,
          muiEditTextFieldProps: {
            required: false,
          },
        },
       
    
      ],
      [validationErrors],
);
  //call CREATE hook
  const { mutateAsync: createPatient, isPending: isCreatingPatient } =
    useCreatePatient();
  //call READ hook
  const {
    data: fetchedPatients = [],
    isError: isLoadingPatientsError,
    isFetching: isFetchingPatients,
    isLoading: isLoadingPatients,
  } = useGetPatients();
  //call UPDATE hook
  const { mutateAsync: updatePatient, isPending: isUpdatingPatient } =
    useUpdatePatient();
 


  //CREATE action
  const handleCreatePatient = async ({ values, table }) => {
    try {
    const uniqueNumber = await generateUniquePatientNumber();
    const uniqueIDNumber = await generateUniquePatientIDNumber();
    const birthDate = values['Birth Date'];
    const newPatientData = {
      ...values,
      _id: uuidv4(), // Generate a unique ID
      'Patient Number': uniqueNumber,
      'ID #': uniqueIDNumber,
      "Age": calculateAge(birthDate).age,
    };
    const newValidationErrors = validatePatient(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
      setValidationErrors({}); // Clear any previous validation errors
      await createPatient(newPatientData);
      table.setCreatingRow(null); // Exit creating mode
    } catch (error) {
      console.error('Error creating patient:', error.message);
  
  // Handle potential errors during unique number generation:
  if (error.message === 'Failed to generate unique Patient Number after retries') {
    // Display a message to the user, offer retry options, or consider increasing `maxAttempts` (if applicable).
    console.error('Error generating unique Patient Number:', error);
    setValidationErrors({ patientNumber: 'Failed to generate unique number. Please try again.' }, 
    { patientIDNumber: 'Failed to generate unique ID number. Please try again.' });
  } else {
    console.error('Error generating unique Patient Number:', error);
    // Handle other errors (e.g., network issues) appropriately.
    setValidationErrors({ patientNumber: 'An error occurred. Please try again later.' },
    { patientIDNumber: 'An error occurred. Please try again later.' });
  }
}
};
  

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
      throw new Error('Missing patientID in form data'); // Handle missing ID
    }
    console.log('Updated patient data:', values);

    // Call the updatePatient mutation function with the extracted patientId and values
    await updatePatient({ patientId, values });

    // If the update is successful, exit editing mode
    table.setEditingRow(null);
  } catch (error) {
    console.error('Error updating patient:', error.message);
    // Handle error here, e.g., show error message to user
    setValidationErrors({ updateError: error.message }); // Set validation error for update
  }
};


  
// DELETE action
const deletePatientMutation = useDeletePatient();
const openDeleteConfirmModal = (patientId) => {
  const id = patientId.original._id;
  if (window.confirm('Are you sure you want to delete this patient?')) {
        deletePatientMutation.mutateAsync(id)
          .then(() => alert('Patient deleted successfully'))
          .catch((error) => alert('Error deleting patient:', error.message));
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
    data: fetchedPatients,
   /* muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        const patientId = row.original._id; // Assuming 'id' is the correct key for patient ID
        window.open(`/patients/${patientId}`, '_blank', 'noopener,noreferrer'); // Open in a new tab
      },
      sx: {
        cursor: 'pointer', //you might want to change the cursor too when adding an onClick
        },
      }),*/
    initialState: { columnVisibility:{'MI': false ,'Last Visit': false ,  'Followup Date': false ,
    'Referring Facility': false , 'Primary Referring Dr.': false , 'Age': false ,
    'Prior Study Location': false ,  'Date Added': false ,'EMail': false ,'Cell Phone': false ,
    'ZIP': false ,'State': false ,'City': false ,'Address': false , '_id': false } },
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
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

    muiDetailPanelProps: () => ({
      sx: (theme) => ({
        backgroundColor:
          theme.palette.mode === 'light'
            ? 'rgba(239, 240, 242)'
            : 'rgba(0,0,0,0.1)',
      }),
    }),
    
    
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreatePatient,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSavePatient,
    
    //optionally customize modal content
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      
      <Dialog
        fullWidth
        maxWidth="md"
        open={true} // or however you manage the dialog state
        onClose={handleClose} // replace handleClose with your close handler function
        aria-labelledby="create-profile-dialog-title"
        aria-describedby="create-profile-dialog-description"
      >
        <DialogTitle id="create-profile-dialog-title" variant="h4">Create New Profile</DialogTitle>
        <DialogContent
          sx={{
            display: 'grid',
            margin: 'auto',
            gridTemplateColumns: '1fr 1fr',
            width: '100%',
            gap: '1rem'
          }}
          
        >
           {internalEditComponents.map((component) => (
      component && // Check if component is defined before accessing properties
      component.column && // Check if component.column exists before accessing accessorKey
      component.column.accessorKey === 'Date Added' ? (
        <DatePicker
          key={component.column.field}
          label="Date Added"
          format="dd/MM/yyyy" // Adjust format as needed
          value={row['Date Added']} // Access existing date value
          onChange={(newValue) => {
            // Update the row value on change
            table.setEditCellValue(row.id, 'Date Added', newValue);
          }}
          // Add other DatePicker props as needed
        />
      ) : (
        // Render other edit components as usual
        component
      )
    ))}

        </DialogContent>
        <DialogActions>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <MRT_EditActionButtons variant="contained" color="primary" table={table} row={row} />
          </ThemeProvider>
        </DialogActions>
      </Dialog>
      </LocalizationProvider>
    ),
    

    

    positionActionsColumn: 'right',
    renderTopToolbarCustomActions: ({ table }) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
      <Button 
        variant="outlined"
        color="secondary"
        background='rgba(98, 34, 189)'
        sx={{ ml: 2}}
        onClick={() => {
          table.setCreatingRow(true); 
        }}
      >
        Create New Profile
      </Button>
      </ThemeProvider>
    ),
    state: {
      isLoading: isLoadingPatients,
      isSaving: isCreatingPatient || isUpdatingPatient,
      showAlertBanner: isLoadingPatientsError,
      showProgressBars: isFetchingPatients,
    },
  });

  return <MaterialReactTable table={table} />;
};



//CREATE hook (post new Patient to api)
function useCreatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPatientData) => {
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPatientData),
      });

      if (!response.ok) {
        throw new Error('Failed to create new patient');
      }

      // Optionally, you can return the newly created patient data
      return await response.json();
    },
    // Optional: Define configurations for optimistic updates, retries, etc.
    onMutate: (newPatientData) => {
      // Optimistic update: Update the cache with the new patient data
      queryClient.setQueryData(['Patients'], (prevData) => [
        ...prevData,
        newPatientData,
      ]);
    },
    // Optional: Invalidate the cache and trigger refetching after mutation
    // onSettled: () => queryClient.invalidateQueries(['Patients']),
  });
}
// Function to generate a unique Patient Number
const generateUniquePatientNumber = async () => {
  let attempts = 0;
  const maxAttempts = 10; // Set a reasonable maximum number of attempts

  // Improved logic for generating a unique number with retries:
  while (attempts < maxAttempts) {
    const uniqueNumber = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit number
    const isUnique = await checkPatientNumberExists(uniqueNumber);

    if (!isUnique) {
      return uniqueNumber;
    }

    attempts++;
  }

  throw new Error('Failed to generate unique Patient Number after retries');
};

// Function to check if a Technologist Number already exists in the database
const checkPatientNumberExists = async (patientNumber) => {
  try {
    // Improved API endpoint for efficient checking:
    const response = await fetch(`/api/patients/?patientNumber=${patientNumber}`);

    if (!response.ok) {
      throw new Error('Error checking for existing Patient Number');
    }

    const data = await response.json();
    return data.exists; // Assuming the backend response indicates existence
  } catch (error) {
    console.error('Error checking for existing Patient Number:', error);
    // Handle errors appropriately (e.g., display a generic error message to the user)
    return false; // Assume non-existence on error for safety
  }
};
// Function to generate a unique Patient Number
const generateUniquePatientIDNumber = async () => {
  let attempts = 0;
  const maxAttempts = 10; // Set a reasonable maximum number of attempts

  // Improved logic for generating a unique number with retries:
  while (attempts < maxAttempts) {
    const uniqueIDNumber = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit number
    const isUnique = await checkPatientIDNumberExists(uniqueIDNumber);

    if (!isUnique) {
      return uniqueIDNumber;
    }

    attempts++;
  }

  throw new Error('Failed to generate unique Patient ID Number after retries');
};

// Function to check if a Technologist Number already exists in the database
const checkPatientIDNumberExists = async (patientIDNumber) => {
  try {
    // Improved API endpoint for efficient checking:
    const response = await fetch(`/api/patients/?ID#=${patientIDNumber}`);

    if (!response.ok) {
      throw new Error('Error checking for existing Patient ID Number');
    }

    const data = await response.json();
    return data.exists; // Assuming the backend response indicates existence
  } catch (error) {
    console.error('Error checking for existing Patient Number:', error);
    // Handle errors appropriately (e.g., display a generic error message to the user)
    return false; // Assume non-existence on error for safety
  }
};


//UPDATE hook (put Patientin api)
function useUpdatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ patientId, values }) => {
      const response = await fetch(`/api/patients/${patientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
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

// DELETE hook (delete Patient in api)
function useDeletePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (patientId) => {
      const url = new URL('/api/patients', window.location.origin);
      // Convert the patientId to a string if necessary
      const idString = typeof patientId === 'object' ? patientId.toString() : patientId;
      url.searchParams.append('patientId', idString);
    
      const response = await fetch(url, {
  method: 'DELETE',
});


      if (!response.ok) {
        throw new Error(`Error deleting patient: ${await response.text()}`);
      }

      return response.status; // Assuming no response data needed on deletion
    },
    onSuccess: (deletedPatientId, context) => {
      // Optimistic update (optional): Remove patient from local state
      queryClient.setQueryData(['Patients'], (prevData) =>
        prevData.filter((patient) => patient._id !== deletedPatientId)
      );

      // Call the onDelete callback function (if provided)
      if (context.deleteCallback) {
        context.deleteCallback();
      }
    },
    onError: (error) => {
      console.error('Error deleting patient:', error.message);
      // Handle deletion error, e.g., display error message to user
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

const validateRequired = (value) => {
  if (typeof value === 'undefined' || value === null) {
    return false; // Treat undefined or null values as invalid
  }
  return !!value.length;
};


function validatePatient(Patient) {
  return {
    firstName: !validateRequired(['First Name'])
      ? 'First Name is Required'
      : '',
    lastName: !validateRequired(['Last Name']) ? 'Last Name is Required' : '',
    birthDate: !validateRequired(['Birth Date']) ? 'Birth Date is Required' : '',
    

  };
}