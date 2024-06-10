
import clientPromise from "../../../ABI/mongodb"
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { gynstudyId } = req.query; 
  const client = await clientPromise;
  const db = client.db('SonoWeb');
  const collection = db.collection('GYNSTUDY');
 
  switch (req.method) {
    case 'GET':
      if (!gynstudyId) {
        try {
          // Fetch all gynstudys (replace with your pagination logic)
          const gynstudysCursor = await collection.find();
          const gynstudysArray = await gynstudysCursor.toArray();
          //console.log('Fetched gynstudys:', gynstudysArray);

          res.status(200).json(gynstudysArray);
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Error fetching gynstudys' });
        }
      }
      break;

    case 'POST':
      try {
        const newGynstudy = req.body; // Assuming req.body contains the new gynstudy object
        delete newGynstudy._id; 
        await collection.insertOne(newGynstudy);
        res.status(201).json(newGynstudy);
      } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error creating gynstudy' });
      }
      break;
      

      
      case 'PUT':
        const updateGynstudyId = req.query.gynstudyId; 
      
        if (!gynstudyId) {
          return res.status(400).json({ message: 'Gynstudy ID required for update' });
        }
      
        try {
          const updatedGynstudyData = req.body;
      
          const updatedGynstudy = await collection.updateOne(gynstudyId,
            { $set: updatedGynstudyData }
          );
      
          if (updatedGynstudy.modifiedCount === 1) {
            // Send only the updatedGynstudyData without additional message
            res.status(200).json(updatedGynstudyData);
          } else {
            res.status(404).json({ message: 'Gynstudy not found' });
          }
        } catch (err) {
          console.error('Error updating gynstudy:', err.message);
          res.status(500).json({ message: 'Error updating gynstudy' });
        }
        break;
      


      

      case 'DELETE':
  const gynstudyId = req.query.gynstudyId; // Correct way to extract gynstudyId from req.query
  if (!gynstudyId) {
    return res.status(400).json({ message: 'Gynstudy ID required for deletion' });
  }
  try {
    const deleteResult = await collection.deleteOne({ _id: new ObjectId(gynstudyId) }); // Use `new ObjectId`

    if (deleteResult.deletedCount === 1) {
      res.status(204).end();
    } else {
      console.error('Gynstudy not found for deletion with ID:', gynstudyId);
      res.status(404).json({ message: 'Gynstudy not found' });
    }
  } catch (err) {
    console.error('Error deleting gynstudy:', err.message); // Log specific error message
    res.status(500).json({ message: 'Error deleting gynstudy' });
  }
  break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}
