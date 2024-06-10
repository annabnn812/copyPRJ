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
    const physicianId = id;

    console.log('Request method:', req.method);
    console.log('Request query:', { physicianId });

    if (!ObjectId.isValid(physicianId)) {
      return res.status(400).json({ message: 'Invalid physician ID' });
    }

    const client = await clientPromise;
    const db = client.db('SonoWeb');
    const collection = db.collection('PHYSICIANS');

    if (req.method === 'GET') {
      try {
        const physician = await collection.findOne({ _id: new ObjectId(physicianId) });
        if (!physician) {
          return res.status(404).json({ message: 'physician not found' });
        }
        res.status(200).json(physician);
      } catch (err) {
        console.error('Error fetching physician:', err);
        res.status(500).json({ message: 'Error fetching physician data' });
      }
    } else if (req.method === 'PUT') {
      let updatedData = req.body;

      console.log('Request body:', updatedData);

      // Remove the _id field from the updatedData
      delete updatedData._id;

      const updatedPhysician = await collection.updateOne(
        { _id: new ObjectId(physicianId) },
        { $set: updatedData }
      );

      if (updatedPhysician.modifiedCount === 0) {
        return res.status(404).json({ message: 'Physician not found' });
      }

      res.status(200).json({ message: 'Physician updated successfully' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (err) {
    console.error('Error in API route:', err);
    res.status(500).json({ message: 'Error processing request' });
  }
}
