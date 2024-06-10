
import clientPromise from "../../../ABI/mongodb"
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { obstudyId } = req.query; 
  const client = await clientPromise;
  const db = client.db('SonoWeb');
  const collection = db.collection('OBSTUDY');
 
  switch (req.method) {
    case 'GET':
      if (!obstudyId) {
        try {
          // Fetch all obstudys (replace with your pagination logic)
          const obstudysCursor = await collection.find();
          const obstudysArray = await obstudysCursor.toArray();
          //console.log('Fetched obstudys:', obstudysArray);

          res.status(200).json(obstudysArray);
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Error fetching obstudys' });
        }
      }
      break;

    case 'POST':
      try {
        const newObstudy = req.body; // Assuming req.body contains the new obstudy object
        delete newObstudy._id; 
        await collection.insertOne(newObstudy);
        res.status(201).json(newObstudy);
      } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error creating obstudy' });
      }
      break;
      

      
      case 'PUT':
        const updateObstudyId = req.query.obstudyId; 
      
        if (!obstudyId) {
          return res.status(400).json({ message: 'Obstudy ID required for update' });
        }
      
        try {
          const updatedObstudyData = req.body;
      
          const updatedObstudy = await collection.updateOne(obstudyId,
            { $set: updatedObstudyData }
          );
      
          if (updatedObstudy.modifiedCount === 1) {
            // Send only the updatedObstudyData without additional message
            res.status(200).json(updatedObstudyData);
          } else {
            res.status(404).json({ message: 'Obstudy not found' });
          }
        } catch (err) {
          console.error('Error updating obstudy:', err.message);
          res.status(500).json({ message: 'Error updating obstudy' });
        }
        break;
      


      

      case 'DELETE':
  const obstudyId = req.query.obstudyId; // Correct way to extract obstudyId from req.query
  if (!obstudyId) {
    return res.status(400).json({ message: 'Obstudy ID required for deletion' });
  }
  try {
    const deleteResult = await collection.deleteOne({ _id: new ObjectId(obstudyId) }); // Use `new ObjectId`

    if (deleteResult.deletedCount === 1) {
      res.status(204).end();
    } else {
      console.error('Obstudy not found for deletion with ID:', obstudyId);
      res.status(404).json({ message: 'Obstudy not found' });
    }
  } catch (err) {
    console.error('Error deleting obstudy:', err.message); // Log specific error message
    res.status(500).json({ message: 'Error deleting obstudy' });
  }
  break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}
