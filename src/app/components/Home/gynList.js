
export async function fetchGynstudys() {
    try {
      const response = await fetch('/api/gynStudy');
      if (!response.ok) {
        throw new Error('Failed to fetch gynstudys');
      }
      const gynstudys = await response.json();
      return gynstudys.map(gynstudy => gynstudy['Patient Number']); // Extract 'Patient Number'
    } catch (error) {
      console.error('Error fetching gynstudys:', error);
      return []; // Return an empty array in case of an error
    }
  }