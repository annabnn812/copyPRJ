
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
      const obstudyId = id;
  
      console.log('Request method:', req.method);
      console.log('Request query:', { obstudyId });
  
      if (!ObjectId.isValid(obstudyId)) {
        return res.status(400).json({ message: 'Invalid obstudy ID' });
      }
  
      const client = await clientPromise;
      const db = client.db('SonoWeb');
      const collection = db.collection('OBSTUDY');
  
      if (req.method === 'GET') {
        try {
          const obstudy = await collection.findOne({ _id: new ObjectId(obstudyId) });
          if (!obstudy) {
            return res.status(404).json({ message: 'Obstudy not found' });
          }
          res.status(200).json(obstudy);
        } catch (err) {
          console.error('Error fetching obstudy:', err);
          res.status(500).json({ message: 'Error fetching obstudy data' });
        }
      } else if (req.method === 'PUT') {
        let updatedData = req.body;
  
        console.log('Request body:', updatedData);
  
        // Remove the _id field from the updatedData
        delete updatedData._id;
  
        const updatedObstudy = await collection.updateOne(
          { _id: new ObjectId(obstudyId) },
          { $set: updatedData }
        );
  
        if (updatedObstudy.modifiedCount === 0) {
          return res.status(404).json({ message: 'Obstudy not found' });
        }
  
        res.status(200).json({ message: 'Obstudy updated successfully' });
      } else {
        res.status(405).json({ message: 'Method not allowed' });
      }
    } catch (err) {
      console.error('Error in API route:', err);
      res.status(500).json({ message: 'Error processing request' });
    }
  }
  
 