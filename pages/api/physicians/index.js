import clientPromise from "../../../ABI/mongodb"
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { physicianId } = req.query; 
  const client = await clientPromise;
  const db = client.db('SonoWeb');
  const collection = db.collection('PHYSICIANS');
 
  switch (req.method) {
      case 'GET':
        if (!physicianId) {
          try {
            // Fetch all physicianss (replace with your pagination logic)
            const physiciansCursor = await collection.find();
            const physiciansArray = await physiciansCursor.toArray();
            //console.log('Fetched physicianss:', physicianssArray);
  
            res.status(200).json(physiciansArray);
          } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Error fetching physicians' });
          }
        }
        break;

    case 'POST':
      try {
        const newPhysician = req.body; // Assuming req.body contains the new physician object
        delete newPhysician._id; 
        await collection.insertOne(newPhysician);
        res.status(201).json(newPhysician);
      } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error creating physician' });
      }
      break;

      
      case 'PUT':
        const updatePhysicianId = req.query.physicianId; // Extract physicianId from URL
  
        if (!updatePhysicianId) {
          return res.status(400).json({ message: 'Physician ID required for update' });
        }
  
        try {
          const updatedPhysicianData = req.body;
  
          // Update only specified fields with $set
          const updateResult = await collection.findOneAndUpdate({query:
            { _id: new ObjectId(updatePhysicianId) },update: // Query
            { $set: updatedPhysicianData }, // Update - only update specified fields
            // Options - return updated document
        });
  
          if (updateResult.value) { // Check if physician was found and updated
            res.status(200).json(updateResult.value); // Send updated physician data
          } else {
            res.status(404).json({ message: 'Physician not found' });
          }
        } catch (err) {
          console.error('Error updating physician:', err.message);
          res.status(500).json({ message: 'Error updating physician' });
        }
        break;

      case 'DELETE':
  const physicianId = req.query.physicianId; // Correct way to extract physicianId from req.query
  if (!physicianId) {
    return res.status(400).json({ message: 'Physician ID required for deletion' });
  }
  try {
    const deleteResult = await collection.deleteOne({ _id: new ObjectId(physicianId) }); // Use `new ObjectId`

    if (deleteResult.deletedCount === 1) {
      res.status(204).end();
    } else {
      console.error('Physician not found for deletion with ID:', physicianId);
      res.status(404).json({ message: 'Physician not found' });
    }
  } catch (err) {
    console.error('Error deleting physician:', err.message); // Log specific error message
    res.status(500).json({ message: 'Error deleting physician' });
  }
  break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}