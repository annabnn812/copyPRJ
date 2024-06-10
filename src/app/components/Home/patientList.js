export async function fetchPatients() {
    try {
      const response = await fetch('/api/patients');
      if (!response.ok) {
        throw new Error('Failed to fetch patients');
      }
      const patients = await response.json();
      return patients.map(patient => patient['Last Name']); // Extract 'Patient Last Name'
    } catch (error) {
      console.error('Error fetching patients:', error);
      return []; // Return an empty array in case of an error
    }
  }