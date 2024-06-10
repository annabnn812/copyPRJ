export async function fetchLocations() {
    try {
      const response = await fetch('/api/locations');
      if (!response.ok) {
        throw new Error('Failed to fetch locations');
      }
      const locations = await response.json();
      return locations.map(location => location['Facility Name']); // Extract Facility Name
    } catch (error) {
      console.error('Error fetching locations:', error);
      return []; // Return an empty array in case of an error
    }
  }