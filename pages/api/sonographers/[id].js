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
    const sonographerId = id;

    console.log('Request method:', req.method);
    console.log('Request query:', { sonographerId });

    if (!ObjectId.isValid(sonographerId)) {
      return res.status(400).json({ message: 'Invalid sonographer ID' });
    }

    const client = await clientPromise;
    const db = client.db('SonoWeb');
    const collection = db.collection('TECHNOLOGISTS');

    if (req.method === 'GET') {
      try {
        const sonographer = await collection.findOne({ _id: new ObjectId(sonographerId) });
        if (!sonographer) {
          return res.status(404).json({ message: 'Sonographer not found' });
        }
        res.status(200).json(sonographer);
      } catch (err) {
        console.error('Error fetching sonographer:', err);
        res.status(500).json({ message: 'Error fetching sonographer data' });
      }
    } else if (req.method === 'PUT') {
      let updatedData = req.body;

      console.log('Request body:', updatedData);

      // Remove the _id field from the updatedData
      delete updatedData._id;

      const updatedSonographer = await collection.updateOne(
        { _id: new ObjectId(sonographerId) },
        { $set: updatedData }
      );

      if (updatedSonographer.modifiedCount === 0) {
        return res.status(404).json({ message: 'Sonographer not found' });
      }

      res.status(200).json({ message: 'Sonographer updated successfully' });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (err) {
    console.error('Error in API route:', err);
    res.status(500).json({ message: 'Error processing request' });
  }
}
