import { useMemo, useState } from 'react';
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import MinusIcon from '@mui/icons-material/Remove';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { purple } from '@mui/material/colors';
import { v4 as uuidv4 } from 'uuid';
import {StatesUSA} from "../Patients/StatesUSA"


//READ hook (get Physicians from api)
function useGetPhysicians() {
  return useQuery({
    queryKey: ['Physicians'], // Unique query key for physicians
    queryFn: async () => {
      const response = await fetch('/api/physicians'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch physicians');
      }
      return await response.json();
    },
    // Optional: Define configurations for caching, refetching, etc.
  });
}

  
  const TableDisplay = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const [physicians, setPhysicians] = useState([]);
    const columns = useMemo(  
      () => [
        
        {
          accessorKey: "Ref Provider Number",
          header: 'Referring Provider #',
          muiEditTextFieldProps: {
            required: true,
            error: !!validationErrors?.referringProviderNumber,
            helperText: validationErrors?.referringProviderNumber,
            //remove any previous validation errors when Physician focuses on the input
            onFocus: () =>
              setValidationErrors({
                ...validationErrors,
                referringProviderNumber: undefined,
              }),
          
          },
        },
        {
          accessorKey: 'Name',
          header: 'Provider Name',
          muiEditTextFieldProps: {
            required: true,
            error: !!validationErrors?.providerName,
            helperText: validationErrors?.providerName,
            //remove any previous validation errors when Physician focuses on the input
            onFocus: () =>
              setValidationErrors({
                ...validationErrors,
                providerName: undefined,
              }),
            //optionally add validation checking for onBlur or onChange
          },
        },
        {
          accessorKey: 'Practice Name',
          header: 'Practice Name',
          muiEditTextFieldProps: {
            required: true,
            error: !!validationErrors?.practiceName,
            helperText: validationErrors?.practiceName,
            //remove any previous validation errors when Physician focuses on the input
            onFocus: () =>
              setValidationErrors({
                ...validationErrors,
                practiceName: undefined,
              }),
          },
        },
        {
          accessorKey: 'Email',
          header: 'Email',
          muiEditTextFieldProps: {
            type: 'email',
            required: true,
            error: !!validationErrors?.email,
            helperText: validationErrors?.email,
            //remove any previous validation errors when Physician focuses on the input
            onFocus: () =>
              setValidationErrors({
                ...validationErrors,
                email: undefined,
              }),
          },
        },
  
        {
          accessorKey: 'Fax',
          header: 'FAX',
          muiEditTextFieldProps: {
            required: true,  
            error: !!validationErrors?.fax,
            helperText: validationErrors?.fax,
            //remove any previous validation errors when Physician focuses on the input
            onFocus: () =>
              setValidationErrors({
                ...validationErrors,
                fax: undefined,
              }),
          },
        },
        {
          accessorKey: 'Phone',
          header: 'Phone #',
          muiEditTextFieldProps: {
            required: true,  
            error: !!validationErrors?.phoneNumber,
            helperText: validationErrors?.phoneNumber,
            //remove any previous validation errors when Physician focuses on the input
            onFocus: () =>
              setValidationErrors({
                ...validationErrors,
                phoneNumber: undefined,
              }),
          },
        },
        {
          accessorKey: 'Extension',
          header: 'Xt',
          size: 80,
          muiEditTextFieldProps: {
            required: false,  
            error: !!validationErrors?.extension,
            helperText: validationErrors?.extension,
            //remove any previous validation errors when Physician focuses on the input
            onFocus: () =>
              setValidationErrors({
                ...validationErrors,
                extension: undefined,
              }),
          },
        },
        
        {
          accessorKey: 'Country',
          header: 'Country',
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
          accessorKey: 'City',
          header: 'City',
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
          accessorKey: "Address",
          header: 'Address',
          muiEditTextFieldProps: {
            required: false,
          },
        },
        {
          accessorKey: "Address 2",
          header: 'Address 2',
          muiEditTextFieldProps: {
            required: false,
          },
        },
        {
          accessorKey: 'Contact',
          header: 'Contact',
          muiEditTextFieldProps: {
            required: false,
          },
        },
        {
          accessorKey: 'Back Phone',
          header: 'Back Phone',
          muiEditTextFieldProps: {
            required: false,
          },
        },
        {
          accessorKey: 'Specialty',
          header: 'Specialty',
          muiEditTextFieldProps: {
            required: false,
          },
        },
        {
          accessorKey: 'Medical License Number',
          header: 'Medical License Number',
          muiEditTextFieldProps: {
            required: false,
          },
        },
        {
          accessorKey: 'Medicare Number',
          header: 'Medicare Number',
          muiEditTextFieldProps: {
            required: false,
          },
        },
        {
          accessorKey: 'Medicaid Number',
          header: 'Medicaid Number',
          muiEditTextFieldProps: {
            required: false,
          },
        },
        {
          accessorKey: 'Notes',
          header: 'Notes',
          muiEditTextFieldProps: {
            required: false,
          },
        },
        {
          accessorKey: 'Bitmap Signature',
          header: 'Bitmap Signature',
          muiEditTextFieldProps: {
            required: false,
          },
        },
        {
          accessorKey: 'Reporting Physician Name',
          header: 'Reporting Physician Name',
          muiEditTextFieldProps: {
            required: false,
          },
        },
        {
          accessorKey: 'InActive',
          header: 'InActive',
          muiEditTextFieldProps: {
            required: false,
          },
          editVariant: 'select',
          editSelectOptions:  [
            { label: 'True', value: 'true' },
            { label: 'False', value: 'false' },
          ],
        },
        {
          accessorKey: 'Mnemonic',
          header: 'Mnemonic',
          muiEditTextFieldProps: {
            required: false,
          },
        },
        {
          accessorKey: '_id',
          header: 'id',
          muiEditTextFieldProps: {
            required: false,
          },
        },
       
    
      ],
      [validationErrors],
);
  //call CREATE hook
  const { mutateAsync: createPhysician, isPending: isCreatingPhysician } =
    useCreatePhysician();
  //call READ hook
  const {
    data: fetchedPhysicians = [],
    isError: isLoadingPhysiciansError,
    isFetching: isFetchingPhysicians,
    isLoading: isLoadingPhysicians,
  } = useGetPhysicians();
  //call UPDATE hook
  const { mutateAsync: updatePhysician, isPending: isUpdatingPhysician } =
    useUpdatePhysician();
 


  //CREATE action
  const handleCreatePhysician = async ({ values, table }) => {
    const newPhysicianData = {
      ...values,
      _id: uuidv4(), // Generate a unique ID
    };
    const newValidationErrors = validatePhysician(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
  
    try {
      setValidationErrors({}); // Clear any previous validation errors
      await createPhysician(values);
      table.setCreatingRow(null); // Exit creating mode
    } catch (error) {
      console.error('Error creating physician:', error.message);
      // Optionally, you can handle error states or display an error message to the user
    }
  };
  

  // UPDATE action
  const handleSavePhysician = async ({ values, table }) => {
    const newValidationErrors = validatePhysician(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
  
    try {
      // Extract physicianId from values
      const physicianId = values._id; // Assuming ID is in form data
      if (!physicianId) {
        throw new Error('Missing physicianID in form data'); // Handle missing ID
      }
      console.log('Updated physician data:', values);
  
      // Call the updatePhysician mutation function with the extracted physicianId and values
      await updatePhysician({ physicianId, values });
  
      // If the update is successful, exit editing mode
      table.setEditingRow(null);
    } catch (error) {
      console.error('Error updating physician:', error.message);
      // Handle error here, e.g., show error message to user
      setValidationErrors({ updateError: error.message }); // Set validation error for update
    }
  };
  

  
// DELETE action
const deletePhysicianMutation = useDeletePhysician();
const openDeleteConfirmModal = (physicianId) => {
  const id = physicianId.original._id;
  if (window.confirm('Are you sure you want to delete this physician?')) {
        deletePhysicianMutation.mutateAsync(id)
          .then(() => alert('Physician deleted successfully'))
          .catch((error) => alert('Error deleting physician:', error.message));
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
    data: fetchedPhysicians,
    initialState: { columnVisibility: { Address: false, 'Address 2': false, 'City': false,
     'State': false, 'Country': false, 
    'ZIP': false, 'Contact': false, 'Back Phone': false, 
    'Specialty': false, 'Medical License Number': false,
     'Medicare Number': false, 'Medicaid Number': false, 
     'Notes': false, 'Bitmap Signature': false, 
     'Reporting Physician Name': false, 
     'InActive': false, 'Mnemonic': false, '_id': false } },
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    muiExpandButtonProps: ({ row }) => ({
      children: row.getIsExpanded() ? <MinusIcon /> : <AddIcon />,
    }),
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingPhysiciansError
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
    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          display: 'grid',
          margin: 'auto',
          gridTemplateColumns: '1fr 1fr',
          width: '100%',
        }}
      >
        
        <span><b>Name:</b>{row.original.Name}</span>
        <span><b>Practice Name:</b> {row.original['Practice Name']}</span>
        <span><b>Address: </b>{row.original.Address}</span>
        <span><b>Address 2:</b> {row.original["Address 2"]}</span>
        <span><b>City:</b> {row.original.City}</span>
        <span><b>State:</b> {row.original.State}</span>
        <span><b>Country: </b>{row.original.Country}</span>
        <span><b>ZIP: </b>{row.original.ZIP}</span>
        <span><b>Contact:</b> {row.original.Contact}</span>
        <span><b>Phone:</b> {row.original.Phone}</span>
        <span><b>Extension: </b>{row.original.Extension}</span>
        <span><b>Fax: </b>{row.original.Fax}</span>
        <span><b>Back Phone:</b> {row.original[`"Back Phone"`]}</span>
        <span><b>Email: </b>{row.original.Email}</span>
        <span><b>Specialty:</b>{row.original.Specialty}</span>
        <span><b>Medical License Number: </b>{row.original["Medical License Number"]}</span>
        <span><b>Medicare Number:</b> {row.original['Medicare Number']} </span>
        <span><b>Medicaid Number: </b>{row.original['Medicaid Number']} </span>
        <span><b>Ref Provider Number: </b>{row.original["Ref Provider Number"]}</span>
        <span><b>Notes: </b>{row.original.Notes}</span>
        <span><b>Bitmap Signature:</b> {row.original['Bitmap Signature']}</span>
        <span><b>Reporting Physician Name: </b>{row.original['Reporting Physician Name']}</span>
        <span><b>InActive: </b>{row.original.InActive}</span>
        <span><b>Mnemonic: </b>{row.original.Mnemonic}</span>
        
        
      </Box>
    ),
    
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreatePhysician,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSavePhysician,
    
    //optionally customize modal content
    // Optionally customize modal content
renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
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
      {internalEditComponents} {/* or render custom edit components here */}
    </DialogContent>
    <DialogActions>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MRT_EditActionButtons variant="contained" color="primary" table={table} row={row} />
      </ThemeProvider>
    </DialogActions>
  </Dialog>
),

    //optionally customize modal content
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
      
      <Dialog
      fullWidth
      maxWidth="md"
      open={true} // or however you manage the dialog state
      onClose={handleClose} // replace handleClose with your close handler function
      aria-labelledby="create-profile-dialog-title"
      aria-describedby="create-profile-dialog-description"
    >
        <DialogTitle variant="h4">Edit Profile</DialogTitle>
        <DialogContent
         sx={{
          display: 'grid',
          margin: 'auto',
          gridTemplateColumns: '1fr 1fr',
          width: '100%',
          gap: '1rem'
        }}
        >
          {internalEditComponents} {/* or render custom edit components here */}
        </DialogContent>
        <DialogActions>
        <ThemeProvider theme={theme}>
        <CssBaseline />
          <MRT_EditActionButtons variant="contained" color="secondary" table={table} row={row} />
          </ThemeProvider>
        </DialogActions>
        </Dialog>
    ),
   
    renderRowActions: ({ row, table }) => (
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent:'center'}}> 
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => openDeleteConfirmModal(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
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
      isLoading: isLoadingPhysicians,
      isSaving: isCreatingPhysician || isUpdatingPhysician,
      showAlertBanner: isLoadingPhysiciansError,
      showProgressBars: isFetchingPhysicians,
    },
  });

  return <MaterialReactTable table={table} />;
};



//CREATE hook (post new Physician to api)
function useCreatePhysician() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newPhysicianData ) => {
      const response = await fetch('/api/physicians', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPhysicianData),
      });

      if (!response.ok) {
        throw new Error('Failed to create new physician');
      }

      // Optionally, you can return the newly created physician data
      return await response.json();
    },
    // Optional: Define configurations for optimistic updates, retries, etc.
    onMutate: (newPhysicianData) => {
      // Optimistic update: Update the cache with the new physician data
      queryClient.setQueryData(['Physicians'], (prevData) => [
        ...prevData,
        newPhysicianData,
      ]);
    },
    // Optional: Invalidate the cache and trigger refetching after mutation
    // onSettled: () => queryClient.invalidateQueries(['Physicians']),
  });
}


//UPDATE hook (put Physicianin api)
function useUpdatePhysician() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ physicianId, values }) => {
      const response = await fetch(`/api/physicians/${physicianId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Error updating physician: ${await response.text()}`); // Include server error message
      }

      return await response.json();
    },
    // Optimistic update (optional): Update local state with new physician data
    onMutate: (updatedPhysician) => {
      queryClient.setQueryData(['Physicians'], (prevData) =>
        prevData.map((physician) =>
          physician._id === updatedPhysician._id ? updatedPhysician : physician
        )
      );
    },
  });
}

// DELETE hook (delete Physician in api)
function useDeletePhysician() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (physicianId) => {
      const url = new URL('/api/physicians', window.location.origin);
      // Convert the physicianId to a string if necessary
      const idString = typeof physicianId === 'object' ? physicianId.toString() : physicianId;
      url.searchParams.append('physicianId', idString);
    
      const response = await fetch(url, {
  method: 'DELETE',
});


      if (!response.ok) {
        throw new Error(`Error deleting physician: ${await response.text()}`);
      }

      return response.status; // Assuming no response data needed on deletion
    },
    onSuccess: (deletedPhysicianId, context) => {
      // Optimistic update (optional): Remove physician from local state
      queryClient.setQueryData(['Physicians'], (prevData) =>
        prevData.filter((physician) => physician._id !== deletedPhysicianId)
      );

      // Call the onDelete callback function (if provided)
      if (context.deleteCallback) {
        context.deleteCallback();
      }
    },
    onError: (error) => {
      console.error('Error deleting physician:', error.message);
      // Handle deletion error, e.g., display error message to user
    },
  });
}

const queryClient = new QueryClient();

const TableDisplayWithProviders = () => (
  //Put this with your other react-query providers near root of your app
  <QueryClientProvider client={queryClient}> 
    <TableDisplay />
  </QueryClientProvider>
);

export default TableDisplayWithProviders;

const validateRequired = (value) => {
  if (typeof value === 'undefined' || value === null) {
    return false; // Treat undefined or null values as invalid
  }
  return !!value.length;
};


function validatePhysician(Physician) {
  return {
    referringProviderNumber: !validateRequired(["Ref Provider Number"]) ? 'Referring Provider Number is Required' : '',
    providerName: !validateRequired("Name") ? 'Provider Name is Required' : '',
    practiceName: !validateRequired(['Practice Name'])
      ? 'Practice Name is Required'
      : '',
   
    zip: !validateRequired("ZIP") ? 'ZIP is Required' : '',
    fax: !validateRequired("Fax") ? 'FAX is Required' : '',
  };
}