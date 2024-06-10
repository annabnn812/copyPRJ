
import clientPromise from "../../../ABI/mongodb"
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { sonographerId } = req.query; 
  const client = await clientPromise;
  const db = client.db('SonoWeb');
  const collection = db.collection('TECHNOLOGISTS');
 
  switch (req.method) {
    case 'GET':
      if (!sonographerId) {
        try {
          // Fetch all sonographers (replace with your pagination logic)
          const sonographersCursor = await collection.find();
          const sonographersArray = await sonographersCursor.toArray();
          //console.log('Fetched sonographers:', sonographersArray);

          res.status(200).json(sonographersArray);
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Error fetching sonographers' });
        }
      }
      break;

    case 'POST':
      try {
        const newSonographer = req.body; // Assuming req.body contains the new sonographer object
        delete newSonographer._id; 
        await collection.insertOne(newSonographer);
        res.status(201).json(newSonographer);
      } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error creating sonographer' });
      }
      break;

      
      case 'PUT':
        const updateSonographerId = req.query.sonographerId; 
      
        if (!sonographerId) {
          return res.status(400).json({ message: 'Sonographer ID required for update' });
        }
      
        try {
          const updatedSonographerData = req.body;
      
          const updatedSonographer = await collection.updateOne(sonographerId,
            { $set: updatedSonographerData }
          );
      
          if (updatedSonographer.modifiedCount === 1) {
            // Send only the updatedSonographerData without additional message
            res.status(200).json(updatedSonographerData);
          } else {
            res.status(404).json({ message: 'Sonographer not found' });
          }
        } catch (err) {
          console.error('Error updating sonographer:', err.message);
          res.status(500).json({ message: 'Error updating sonographer' });
        }
        break;
      


      

      case 'DELETE':
  const sonographerId = req.query.sonographerId; // Correct way to extract sonographerId from req.query
  if (!sonographerId) {
    return res.status(400).json({ message: 'Sonographer ID required for deletion' });
  }
  try {
    const deleteResult = await collection.deleteOne({ _id: new ObjectId(sonographerId) }); // Use `new ObjectId`

    if (deleteResult.deletedCount === 1) {
      res.status(204).end();
    } else {
      console.error('Sonographer not found for deletion with ID:', sonographerId);
      res.status(404).json({ message: 'Sonographer not found' });
    }
  } catch (err) {
    console.error('Error deleting sonographer:', err.message); // Log specific error message
    res.status(500).json({ message: 'Error deleting sonographer' });
  }
  break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}
