export async function fetchObstudys() {
    try {
      const response = await fetch('/api/obStudy');
      if (!response.ok) {
        throw new Error('Failed to fetch obstudys');
      }
      const obstudys = await response.json();
      return obstudys.map(obstudy => obstudy['Patient Number']); // Extract 'Patient Number'
    } catch (error) {
      console.error('Error fetching obstudys:', error);
      return []; // Return an empty array in case of an error
    }
  }