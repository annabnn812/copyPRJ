
import clientPromise from "../../../ABI/mongodb"
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { patientId } = req.query; 
  const client = await clientPromise;
  const db = client.db('SonoWeb');
  const collection = db.collection('PATIENTS');
 
  switch (req.method) {
    case 'GET':
      if (!patientId) {
        try {
          // Fetch all patients (replace with your pagination logic)
          const patientsCursor = await collection.find();
          const patientsArray = await patientsCursor.toArray();
          //console.log('Fetched patients:', patientsArray);

          res.status(200).json(patientsArray);
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Error fetching patients' });
        }
      }
      break;

    case 'POST':
      try {
        const newPatient = req.body; // Assuming req.body contains the new patient object
        delete newPatient._id; 
        await collection.insertOne(newPatient);
        res.status(201).json(newPatient);
      } catch (err) {
        console.error(err);
        res.status(400).json({ message: 'Error creating patient' });
      }
      break;

      
      case 'PUT':
        const updatePatientId = req.query.patientId; 
      
        if (!patientId) {
          return res.status(400).json({ message: 'Patient ID required for update' });
        }
      
        try {
          const updatedPatientData = req.body;
      
          const updatedPatient = await collection.updateOne(patientId,
            { $set: updatedPatientData }
          );
      
          if (updatedPatient.modifiedCount === 1) {
            // Send only the updatedPatientData without additional message
            res.status(200).json(updatedPatientData);
          } else {
            res.status(404).json({ message: 'Patient not found' });
          }
        } catch (err) {
          console.error('Error updating patient:', err.message);
          res.status(500).json({ message: 'Error updating patient' });
        }
        break;
      


      

      case 'DELETE':
  const patientId = req.query.patientId; // Correct way to extract patientId from req.query
  if (!patientId) {
    return res.status(400).json({ message: 'Patient ID required for deletion' });
  }
  try {
    const deleteResult = await collection.deleteOne({ _id: new ObjectId(patientId) }); // Use `new ObjectId`

    if (deleteResult.deletedCount === 1) {
      res.status(204).end();
    } else {
      console.error('Patient not found for deletion with ID:', patientId);
      res.status(404).json({ message: 'Patient not found' });
    }
  } catch (err) {
    console.error('Error deleting patient:', err.message); // Log specific error message
    res.status(500).json({ message: 'Error deleting patient' });
  }
  break;

    default:
      res.status(405).json({ message: 'Method not allowed' });
  }
}
