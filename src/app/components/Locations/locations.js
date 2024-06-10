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



//READ hook (get Locations from api)
function useGetLocations() {
  return useQuery({
    queryKey: ['Locations'], // Unique query key for locations
    queryFn: async () => {
      const response = await fetch('/api/locations'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch locations');
      }
      return await response.json();
    },
    // Optional: Define configurations for caching, refetching, etc.
  });
}

  
  const TableDisplay = () => {
    const [validationErrors, setValidationErrors] = useState({});
    const [locations, setLocations] = useState([]);
    
    const columns = useMemo(  
      () => [
         
        {
          accessorKey: "Facility Name",
          header: 'Facility Name',
          muiEditTextFieldProps: {
            required: true,
            error: !!validationErrors?.FacilityName,
            helperText: validationErrors?.FacilityName,
            //remove any previous validation errors when Locationfocuses on the input
            onFocus: () =>
              setValidationErrors({
                ...validationErrors,
                referringProviderNumber: undefined,
              }),
          
          },
        },
        {
            accessorKey: "Address",
            header: 'Address',
            muiEditTextFieldProps: {
              required: true,
            },
          },
        {
          accessorKey: 'Primary Contact',
          header: 'Primary Contact',
          muiEditTextFieldProps: {
            required: false,
          },
        },
        {
            accessorKey: 'Email',
            header: 'Email',
            muiEditTextFieldProps: {
              type: 'email',
              required: false,
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
            required: true,  
            error: !!validationErrors?.phoneNumber,
            helperText: validationErrors?.phoneNumber,
            //remove any previous validation errors when Locationfocuses on the input
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
          },
        },
        {
          accessorKey: 'Secondary Contact',
          header: 'Secondary Contact',
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
          accessorKey: "Address 2",
          header: 'Address 2',
          muiEditTextFieldProps: {
            required: false,
          },
        },
        {
            accessorKey: "Back Phone",
            header: 'Back Phone',
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
          accessorKey: 'Report Header',
          header: 'Report Header',
          muiEditTextFieldProps: {
            required: false,
          },
        },
        {
          accessorKey: 'AIUM Logo',
          header: 'AIUM Logo',
          muiEditTextFieldProps: {
            required: false,
          },
        },
        {
            accessorKey: 'Location Number',
            header: 'Location Number',
            muiEditTextFieldProps: {
              required: false,
            },
          },
          {
            accessorKey: 'Folder Name',
            header: 'Folder Name',
            muiEditTextFieldProps: {
              required: false,
            },
          },
        {
          accessorKey: '_id',
          header: 'id',
          muiEditTextFieldProps: {
            required: false,
            enableEditing: false,
          },
        },

         
    
      ],
      [validationErrors],
);
  //call CREATE hook
  const { mutateAsync: createLocation, isPending: isCreatingLocation} =
    useCreateLocation();
  //call READ hook
  const {
    data: fetchedLocations = [],
    isError: isLoadingLocationsError,
    isFetching: isFetchingLocations,
    isLoading: isLoadingLocations,
  } = useGetLocations();
  //call UPDATE hook
  const { mutateAsync: updateLocation, isPending: isUpdatingLocation} =
    useUpdateLocation();
 


  //CREATE action
  const handleCreateLocation = async ({ values, table }) => {
    const newLocationData = {
      ...values,
      _id: uuidv4(), // Generate a unique ID
    };
    const newValidationErrors = validateLocation(values);
    if (Object.values(newValidationErrors).some((error) => error)) {
      setValidationErrors(newValidationErrors);
      return;
    }
  
    try {
      setValidationErrors({}); // Clear any previous validation errors
      await createLocation(values); 
      table.setCreatingRow(null); // Exit creating mode
    } catch (error) {
      console.error('Error creating location:', error.message);
      // Optionally, you can handle error states or display an error message to the user
    }
  };
  
  

  // UPDATE action
const handleSaveLocation = async ({ values, table }) => {
  const newValidationErrors = validateLocation(values);
  if (Object.values(newValidationErrors).some((error) => error)) {
    setValidationErrors(newValidationErrors);
    return;
  }
  setValidationErrors({});

  try {
    // Extract locationId from values
    const locationId = values._id; // Assuming ID is in form data
    if (!locationId) {
      throw new Error('Missing locationID in form data'); // Handle missing ID
    }
    console.log('Updated location data:', values);

    // Call the updateLocation mutation function with the extracted locationId and values
    await updateLocation({ locationId, values });

    // If the update is successful, exit editing mode
    table.setEditingRow(null);
  } catch (error) {
    console.error('Error updating location:', error.message);
    // Handle error here, e.g., show error message to user
    setValidationErrors({ updateError: error.message }); // Set validation error for update
  }
};


  
// DELETE action
const deleteLocationMutation = useDeleteLocation();
const openDeleteConfirmModal = (locationId) => {
  const id = locationId.original._id;
  if (window.confirm('Are you sure you want to delete this location?')) {
        deleteLocationMutation.mutateAsync(id)
          .then(() => alert('Location deleted successfully'))
          .catch((error) => alert('Error deleting location:', error.message));
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
    data: fetchedLocations,
    initialState: { columnVisibility: {'Secondary Contact': false, 
    'Address 2': false, 'City': false, 'Email': false, 'Extension': false,
     'State': false,  'ZIP': false,  'Back Phone': false,
     'Notes': false,  'Report Header': false, 'AIUM Logo': false, 'Location Number': false, 
     'Folder Name': false,'_id': false } },
    createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
    editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    muiExpandButtonProps: ({ row }) => ({
      children: row.getIsExpanded() ? <MinusIcon /> : <AddIcon />,
    }),
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isLoadingLocationsError
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
        
        <span><b>Facility Name:</b>{row.original['Facility Name']}</span>
        <span><b>Primary Contact:</b> {row.original['Primary Contact']}</span>
        <span><b>Secondary Contact: </b>{row.original['Secondary Contact']}</span>
        <span><b>Address: </b>{row.original.Address}</span>
        <span><b>Address 2:</b> {row.original["Address 2"]}</span>
        <span><b>City:</b> {row.original.City}</span>
        <span><b>State:</b> {row.original.State}</span>
        <span><b>ZIP: </b>{row.original.ZIP}</span>
        <span><b>Phone:</b> {row.original.Phone}</span>
        <span><b>Extension: </b>{row.original.Extension}</span>
        <span><b>Fax: </b>{row.original.Fax}</span>
        <span><b>Back Phone: </b>{row.original["Back Phone"]}</span>
        <span><b>Email:</b>{row.original.Email}</span>
        <span><b>Notes: </b>{row.original.Notes}</span>
        <span><b>Report Header: </b>{row.original["Report Header"]}</span>
        <span><b>AIUM Logo: </b>{row.original["AIUM Logo"]}</span>
        <span><b>Location Number: </b>{row.original["Location Number"]}</span>
        <span><b>Folder Name: </b>{row.original["Folder Name"]}</span>

      </Box>
    ),
    
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateLocation,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveLocation,
    
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
      isLoading: isLoadingLocations,
      isSaving: isCreatingLocation|| isUpdatingLocation,
      showAlertBanner: isLoadingLocationsError,
      showProgressBars: isFetchingLocations,
    },
  });

  return <MaterialReactTable table={table} />;
};



//CREATE hook (post new Locationto api)
function useCreateLocation() {
  const queryClient = useQueryClient();

  return useMutation({
     mutationFn: async (newLocationData) => {
        const response = await fetch('/api/locations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newLocationData),
        });

      if (!response.ok) {
        throw new Error('Failed to create new location');
      }

      // Optionally, you can return the newly created locationdata
      return await response.json();
    },
    // Optional: Define configurations for optimistic updates, retries, etc.
    onMutate: (newLocationData) => {
      // Optimistic update: Update the cache with the new locationdata
      queryClient.setQueryData(['Locations'], (prevData) => [
        ...prevData,
        newLocationData,
      ]);
    },
    // Optional: Invalidate the cache and trigger refetching after mutation
    // onSettled: () => queryClient.invalidateQueries(['Locations']),
  });
}



//UPDATE hook (put Locationin api)
function useUpdateLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ locationId, values }) => {
      const response = await fetch(`/api/locations/${locationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`Error updating location: ${await response.text()}`); // Include server error message
      }

      return await response.json();
    },
    // Optimistic update (optional): Update local state with new location data
    onMutate: (updatedLocation) => {
      queryClient.setQueryData(['Locations'], (prevData) =>
        prevData.map((location) =>
          location._id === updatedLocation._id ? updatedLocation : location
        )
      );
    },
  });
}

// DELETE hook (delete Location in api)
function useDeleteLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (locationId) => {
      const url = new URL('/api/locations', window.location.origin);
      // Convert the locationId to a string if necessary
      const idString = typeof locationId === 'object' ? locationId.toString() : locationId;
      url.searchParams.append('locationId', idString);
    
      const response = await fetch(url, {
  method: 'DELETE',
});


      if (!response.ok) {
        throw new Error(`Error deleting location: ${await response.text()}`);
      }

      return response.status; // Assuming no response data needed on deletion
    },
    onSuccess: (deletedLocationId, context) => {
      // Optimistic update (optional): Remove locationfrom local state
      queryClient.setQueryData(['Locations'], (prevData) =>
        prevData.filter((location) => location._id !== deletedLocationId)
      );

      // Call the onDelete callback function (if provided)
      if (context.deleteCallback) {
        context.deleteCallback();
      }
    },
    onError: (error) => {
      console.error('Error deleting location:', error.message);
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


function validateLocation(Location) {
  return {
    FacilityName: !validateRequired(["Facility Name"]) ? 'Facility Name is Required' : '',
    Address: !validateRequired("Address") ? 'Address is Required' : '',
    phone: !validateRequired("Phone") ? 'Phone is Required' : '',
  };
}