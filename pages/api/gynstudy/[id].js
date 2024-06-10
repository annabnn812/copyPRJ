
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
      const gynstudyId = id;
  
      console.log('Request method:', req.method);
      console.log('Request query:', { gynstudyId });
  
      if (!ObjectId.isValid(gynstudyId)) {
        return res.status(400).json({ message: 'Invalid gynstudy ID' });
      }
  
      const client = await clientPromise;
      const db = client.db('SonoWeb');
      const collection = db.collection('GYNSTUDY');
  
      if (req.method === 'GET') {
        try {
          const gynstudy = await collection.findOne({ _id: new ObjectId(gynstudyId) });
          if (!gynstudy) {
            return res.status(404).json({ message: 'Gynstudy not found' });
          }
          res.status(200).json(gynstudy);
        } catch (err) {
          console.error('Error fetching gynstudy:', err);
          res.status(500).json({ message: 'Error fetching gynstudy data' });
        }
      } else if (req.method === 'PUT') {
        let updatedData = req.body;
  
        console.log('Request body:', updatedData);
  
        // Remove the _id field from the updatedData
        delete updatedData._id;
  
        const updatedGynstudy = await collection.updateOne(
          { _id: new ObjectId(gynstudyId) },
          { $set: updatedData }
        );
  
        if (updatedGynstudy.modifiedCount === 0) {
          return res.status(404).json({ message: 'Gynstudy not found' });
        }
  
        res.status(200).json({ message: 'Gynstudy updated successfully' });
      } else {
        res.status(405).json({ message: 'Method not allowed' });
      }
    } catch (err) {
      console.error('Error in API route:', err);
      res.status(500).json({ message: 'Error processing request' });
    }
  }
  
  