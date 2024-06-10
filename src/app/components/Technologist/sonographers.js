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



//READ hook (get Sonographers from api)
function useGetSonographers() {
  return useQuery({
    queryKey: ['Sonographers'], // Unique query key for sonographers
    queryFn: async () => {
      const response = await fetch('/api/sonographers'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch sonographers');
      }
      return await response.json();
    },
    // Optional: Define configurations for caching, refetching, etc.
  });
}

  
  const TableDisplay = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const [sonographers, setSonographers] = useState([]);
    const columns = useMemo(  
      () => [
        
        {
          accessorKey: "Technologist Number",
          header: 'ID #',
          size: 60,
          enableEditing: false,
          muiEditTextFieldProps: {
            required: false,
          },
        },
        {
          accessorKey: 'Last Name',
          header: 'Last Name',
          muiEditTextFieldProps: {
            required: true,
            error: !!validationErrors?.LastName

          },
        },
        {
          accessorKey: 'First Name',
          header: 'First Name',
          muiEditTextFieldProps: {
            required: true,
            error: !!validationErrors?.FirstName

          },
        },
        {
          accessorKey: 'Expertise',
          header: 'Expertise',
          muiEditTextFieldProps: {
            required: false,
            error: !!validationErrors?.Expertise

          },
        },
  
        {
          accessorKey: 'Fax',
          header: 'FAX',
          muiEditTextFieldProps: {
            required: false,  
          },
        },
        {
          accessorKey: 'Phone',
          header: 'Phone #',
          muiEditTextFieldProps: {
            required: false,  
          },
        },
        {
          accessorKey: 'Extension',
          header: 'Xt',
          size: 80,
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
          accessorKey: 'MI',
          header: 'MI',
          muiEditTextFieldProps: {
            required: false,
          },
        },
        {
          accessorKey: 'License',
          header: 'License',
          muiEditTextFieldProps: {
            required: false,
          },
        },
        {
          accessorKey: 'CME Credits',
          header: 'CME Credits',
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
          accessorKey: 'NTQR',
          header: 'NTQR',
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
    
);
  //call CREATE hook
  const { mutateAsync: createSonographer, isPending: isCreatingSonographer} =
    useCreateSonographer();
  //call READ hook
  const {
    data: fetchedSonographers = [],
    isError: isLoadingSonographersError,
    isFetching: isFetchingSonographers,
    isLoading: isLoadingSonographers,
  } = useGetSonographers();
  //call UPDATE hook
  const { mutateAsync: updateSonographer, isPending: isUpdatingSonographer} =
    useUpdateSonographer();
 


  // CREATE action
const handleCreateSonographer = async ({ values, table }) => {
  try {
    const uniqueNumber = await generateUniqueTechnologistNumber();
    const newSonographerData = {
      ...values,
      _id: uuidv4(),
      'Technologist Number': uniqueNumber,
    };

    const newValidationErrors = validateSonographer(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }

    setValidationErrors({}); // Clear previous errors
    await createSonographer(newSonographerData);
    table.setCreatingRow(null); // Exit creating mode
  } catch (error) {
    console.error('Error creating sonographer:', error.message);

    // Handle potential errors during unique number generation:
    if (error.message === 'Failed to generate unique Technologist Number after retries') {
      // Display a message to the user, offer retry options, or consider increasing `maxAttempts` (if applicable).
      console.error('Error generating unique Technologist Number:', error);
      setValidationErrors({ technologistNumber: 'Failed to generate unique number. Please try again.' });
    } else {
      console.error('Error generating unique Technologist Number:', error);
      // Handle other errors (e.g., network issues) appropriately.
      setValidationErrors({ technologistNumber: 'An error occurred. Please try again later.' });
    }
  }
};
  

  // UPDATE action
  const handleSaveSonographer = async ({ values, table }) => {
    const newValidationErrors = validateSonographer(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
    setValidationErrors({});
  
    try {
      // Extract sonographerId from values
      const sonographerId = values._id; // Assuming ID is in form data
      if (!sonographerId) {
        throw new Error('Missing sonographerID in form data'); // Handle missing ID
      }
      console.log('Updated sonographer data:', values);
  
      // Call the updatesonographer mutation function with the extracted sonographerId and values
      await updateSonographer({ sonographerId, values });
  
      // If the update is successful, exit editing mode
      table.setEditingRow(null);
    } catch (error) {
      console.error('Error updating sonographer:', error.message);
      // Handle error here, e.g., show error message to user
      setValidationErrors({ updateError: error.message }); // Set validation error for update
    }
  };
  


  
// DELETE action
const deleteSonographerMutation = useDeleteSonographer();
const openDeleteConfirmModal = (sonographerId) => {
  const id = sonographerId.original._id;
  if (window.confirm('Are you sure you want to delete this sonographer?')) {
        deleteSonographerMutation.mutateAsync(id)
          .then(() => alert('Sonographer deleted successfully'))
          .catch((error) => alert('Error deleting sonographer:', error.message));
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
    data: fetchedSonographers,
    initialState: { columnVisibility: { MI: false, Address: false, 'Address 2': false, 'City': false,
     'State': false,  'ZIP': false, 'Contact': false, 'Fax': false,
     'Notes': false,  'InActive': false, 'CME Credits': false, 'License': false, 
     'NTQR': false,'_id': false } },
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    muiExpandButtonProps: ({ row }) => ({
      children: row.getIsExpanded() ? <MinusIcon /> : <AddIcon />,
    }),
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingSonographersError
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
        
        <span><b>Technologist Number:</b>{row.original['Technologist Number']}</span>
        <span><b>Last Name:</b> {row.original['Last Name']}</span>
        <span><b>First Name: </b>{row.original['First Name']}</span>
        <span><b>MI: </b>{row.original.MI}</span>
        <span><b>Expertise: </b>{row.original.Expertise}</span>
        <span><b>Address: </b>{row.original.Address}</span>
        <span><b>Address 2:</b> {row.original["Address 2"]}</span>
        <span><b>City:</b> {row.original.City}</span>
        <span><b>State:</b> {row.original.State}</span>
        <span><b>ZIP: </b>{row.original.ZIP}</span>
        <span><b>Contact:</b> {row.original.Contact}</span>
        <span><b>Phone:</b> {row.original.Phone}</span>
        <span><b>Extension: </b>{row.original.Extension}</span>
        <span><b>Fax: </b>{row.original.Fax}</span>
        <span><b>CME Credits: </b>{row.original["CME Credits"]}</span>
        <span><b>License:</b>{row.original.License}</span>
        <span><b>Notes: </b>{row.original.Notes}</span>
        <span><b>InActive: </b>{row.original.InActive}</span>
        <span><b>NTQR: </b>{row.original.NTQR}</span>
        
       
      </Box>
    ),
    
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateSonographer,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveSonographer,
    
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
      isLoading: isLoadingSonographers,
      isSaving: isCreatingSonographer|| isUpdatingSonographer,
      showAlertBanner: isLoadingSonographersError,
      showProgressBars: isFetchingSonographers,
    },
  });

  return <MaterialReactTable table={table} />;
};

// CREATE hook (post new Sonographer to API)
function useCreateSonographer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newSonographerData) => {
      const response = await fetch('/api/sonographers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSonographerData),
      });

      if (!response.ok) {
        throw new Error('Failed to create new sonographer');
      }

      return await response.json();
    },
    // Optional: Define configurations for optimistic updates, retries, etc.
    onMutate: (newSonographerData) => {
      // Optimistic update: Update the cache with the new sonographer data
      queryClient.setQueryData(['Sonographers'], (prevData) => [
        ...prevData,
        newSonographerData,
      ]);
    },
    // Optional: Invalidate the cache and trigger refetching after mutation
    // onSettled: () => queryClient.invalidateQueries(['Sonographers']),
  });
}

// Function to generate a unique Technologist Number
const generateUniqueTechnologistNumber = async () => {
  let attempts = 0;
  const maxAttempts = 10; // Set a reasonable maximum number of attempts

  // Improved logic for generating a unique number with retries:
  while (attempts < maxAttempts) {
    const uniqueNumber = Math.floor(1000 + Math.random() * 9000); //  Generate a 4-digit number
    const isUnique = await checkTechnologistNumberExists(uniqueNumber);

    if (!isUnique) {
      return uniqueNumber;
    }

    attempts++;
  }

  throw new Error('Failed to generate unique Technologist Number after retries');
};

// Function to check if a Technologist Number already exists in the database
const checkTechnologistNumberExists = async (technologistNumber) => {
  try {
    // Improved API endpoint for efficient checking:
    const response = await fetch(`/api/sonographers/?technologistNumber=${technologistNumber}`);

    if (!response.ok) {
      throw new Error('Error checking for existing Technologist Number');
    }

    const data = await response.json();
    return data.exists; // Assuming the backend response indicates existence
  } catch (error) {
    console.error('Error checking for existing Technologist Number:', error);
    // Handle errors appropriately (e.g., display a generic error message to the user)
    return false; // Assume non-existence on error for safety
  }
};


//UPDATE hook (put Sonographerin api)
function useUpdateSonographer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ sonographerId, values }) => {
      const response = await fetch(`/api/sonographers/${sonographerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Error updating sonographer: ${await response.text()}`); // Include server error message
      }

      return await response.json();
    },
    // Optimistic update (optional): Update local state with new sonographer data
    onMutate: (updatedSonographer) => {
      queryClient.setQueryData(['Sonographers'], (prevData) =>
        prevData.map((sonographer) =>
          sonographer._id === updatedSonographer._id ? updatedSonographer : sonographer
        )
      );
    },
  });
}

// DELETE hook (delete Sonographer in api)
function useDeleteSonographer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sonographerId) => {
      const url = new URL('/api/sonographers', window.location.origin);
      // Convert the sonographerId to a string if necessary
      const idString = typeof sonographerId === 'object' ? sonographerId.toString() : sonographerId;
      url.searchParams.append('sonographerId', idString);
    
      const response = await fetch(url, {
  method: 'DELETE',
});


      if (!response.ok) {
        throw new Error(`Error deleting sonographer: ${await response.text()}`);
      }

      return response.status; // Assuming no response data needed on deletion
    },
    onSuccess: (deletedSonographerId, context) => {
      // Optimistic update (optional): Remove sonographerfrom local state
      queryClient.setQueryData(['Sonographers'], (prevData) =>
        prevData.filter((sonographer) => sonographer._id !== deletedSonographerId)
      );

      // Call the onDelete callback function (if provided)
      if (context.deleteCallback) {
        context.deleteCallback();
      }
    },
    onError: (error) => {
      console.error('Error deleting sonographer:', error.message);
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


function validateSonographer(Sonographer) {
  return {
    TechnologistNumber: !validateRequired(["Technologist Number"]) ? 'Technologist Number is Required' : '',
    LastName: !validateRequired("Last Name") ? 'Last Name is Required' : '',
    FirstName: !validateRequired("First Name") ? 'First Name is Required' : '',
    Expertise: !validateRequired(['Expertise'])
      ? 'Expertise is Required'
      : '',
  };
}