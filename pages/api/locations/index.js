
import clientPromise from "../../../ABI/mongodb"
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { locationId } = req.query; 
  const client = await clientPromise;
  const db = client.db('SonoWeb');
  const collection = db.collection('FILMLOCATIONS');
 
  switch (req.method) {
    case 'GET':
      if (!locationId) {
        try {
          // Fetch all locations (replace with your pagination logic)
          const locationsCursor = await collection.find();
          const locationsArray = await locationsCursor.toArray();
          //console.log('Fetched locations:', locationsArray);

          res.status(200).json(locationsArray);
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Error fetching locations' });
        }
      }
      break;

    case 'POST':
      try {
        const newLocation = req.body; // Assuming req.body contains the new location object
        delete newLocation._id; 
        await collection.insertOne(newLocation);
        res.status(201).json(newLocation);
      } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error creating location' });
      }
      break;

      case 'DELETE':
  const locationId = req.query.locationId; // Correct way to extract locationId from req.query
  if (!locationId) {
    return res.status(400).json({ message: 'Location ID required for deletion' });
  }
  try {
    const deleteResult = await collection.deleteOne({ _id: new ObjectId(locationId) }); // Use `new ObjectId`

    if (deleteResult.deletedCount === 1) {
      res.status(204).end();
    } else {
      console.error('Location not found for deletion with ID:', locationId);
      res.status(404).json({ message: 'Location not found' });
    }
  } catch (err) {
    console.error('Error deleting location:', err.message); // Log specific error message
    res.status(500).json({ message: 'Error deleting location' });
  }
  break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}
