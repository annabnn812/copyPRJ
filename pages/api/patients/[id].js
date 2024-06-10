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
        const patientId = id;
    
        console.log('Request method:', req.method);
        console.log('Request query:', { patientId });
    
        if (!ObjectId.isValid(patientId)) {
          return res.status(400).json({ message: 'Invalid patient ID' });
        }
    
        const client = await clientPromise;
        const db = client.db('SonoWeb');
        const collection = db.collection('PATIENTS');
    
        if (req.method === 'GET') {
          try {
            const patient = await collection.findOne({ _id: new ObjectId(patientId) });
            if (!patient) {
              return res.status(404).json({ message: 'patient not found' });
            }
            res.status(200).json(patient);
          } catch (err) {
            console.error('Error fetching patient:', err);
            res.status(500).json({ message: 'Error fetching patient data' });
          }
        } else if (req.method === 'PUT') {
          let updatedData = req.body;
    
          console.log('Request body:', updatedData);
    
          // Remove the _id field from the updatedData
          delete updatedData._id;
    
          const updatedPatient = await collection.updateOne(
            { _id: new ObjectId(patientId) },
            { $set: updatedData }
          );
    
          if (updatedPatient.modifiedCount === 0) {
            return res.status(404).json({ message: 'Patient not found' });
          }
    
          res.status(200).json({ message: 'Patient updated successfully' });
        } else {
          res.status(405).json({ message: 'Method not allowed' });
        }
      } catch (err) {
        console.error('Error in API route:', err);
        res.status(500).json({ message: 'Error processing request' });
      }
    }
    