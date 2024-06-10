import React, { useMemo, useState, useEffect, useCallback  } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import ErrorBoundary from './ErrorBoundary';
import Loader from './Loader';

function useGetPatient(patientID) {
  return useQuery({
    queryKey: ["patient", patientID],
    queryFn: async () => {
      if (!patientID) {
        throw new Error("Missing patient ID");
      }
      const response = await fetch(`/api/patients/${patientID}`);
      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }
      return await response.json();
    },
    enabled: !!patientID,
  });
}

const TableDisplay = () => {
  const patientParams = useParams();

  const {
    data: patientFetched,
    isError: isLoadingPatientsError,
    isFetching: isFetchingPatient,
    isLoading: isLoadingPatient,
    error,
  } = useGetPatient(patientParams?.id);
  console.log("fetched: ", patientFetched);

  const columns = useMemo(
    () => [
      {
        accessorKey: "Patient Number",
        header: "Patient #",
        size: 60,
        enableEditing: false,
        muiEditTextFieldProps: {
          required: false,
        },
      },
      {
        accessorKey: "Last Name",
        header: "Last Name",
      },
      {
        accessorKey: "First Name",
        header: "First Name",
      },
      {
        accessorKey: "Birth Date",
        header: "Birth Date",
      },
      {
        accessorKey: "ID #",
        header: "ID #",
      },
      {
        accessorKey: "_id",
        header: "id",
        enableEditing: false,
        muiEditTextFieldProps: {
          required: false,
        },
      },
    ],
    [],
  );

  const data = patientFetched ? [patientFetched] : [];
  console.log("Data: ", data);

  const table = useMaterialReactTable({
    columns,
    data,
    enableEditing: true,
  });

  if (isLoadingPatient) {
    return <Loader />;
  }

  if (isLoadingPatientsError) {
    return <ErrorBoundary error={error} />;
  }

  return (
    <div>
      {patientFetched === 0 && !isLoadingPatient && !isLoadingPatientsError ? (
        <p>No records</p>
      ) : (
        <MaterialReactTable table={table} />
      )}
    </div>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const TableDisplayWithProviders = () => (
  <QueryClientProvider client={queryClient}>
    <TableDisplay />
  </QueryClientProvider>
);

export default TableDisplayWithProviders;