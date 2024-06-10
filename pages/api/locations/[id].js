import clientPromise from "../../../ABI/mongodb";
import { ObjectId } from 'mongodb';

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const locationId = id;

    console.log('Request method:', req.method);
    console.log('Request query:', { locationId });

    if (!ObjectId.isValid(locationId)) {
      return res.status(400).json({ message: 'Invalid location ID' });
    }

    const client = await clientPromise;
    const db = client.db('SonoWeb');
    const collection = db.collection('FILMLOCATIONS');

    if (req.method === 'GET') {
      try {
        const location = await collection.findOne({ _id: new ObjectId(locationId) });
        if (!location) {
          return res.status(404).json({ message: 'Location not found' });
        }
        res.status(200).json(location);
      } catch (err) {
        console.error('Error fetching location:', err);
        res.status(500).json({ message: 'Error fetching location data' });
      }
    } else if (req.method === 'PUT') {
      let updatedData = req.body;

      console.log('Request body:', updatedData);

      // Remove the _id field from the updatedData
      delete updatedData._id;

      const updatedLocation = await collection.updateOne(
        { _id: new ObjectId(locationId) },
        { $set: updatedData }
      );

      if (updatedLocation.modifiedCount === 0) {
        return res.status(404).json({ message: 'Location not found' });
      }

      res.status(200).json({ message: 'Location updated successfully' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (err) {
    console.error('Error in API route:', err);
    res.status(500).json({ message: 'Error processing request' });
  }
}
