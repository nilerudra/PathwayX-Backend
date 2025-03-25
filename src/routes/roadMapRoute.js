import express from 'express';
import Roadmap from '../models/GeneratedRoadmap.js'
const router = express.Router();


router.get('/:userId', async (req, res) => {
    const { userId } = req.params;  


    console.log("Received userId:", userId);

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }
  
    try {
      const roadmap = await Roadmap.find({ userId }).sort({ createdAt: -1 });
      console.log(roadmap)
  
      if (!roadmap) {
        return res.status(404).json({ message: 'Roadmap not found' });
      }
  
      res.json(roadmap);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching roadmap',
        error: error.message,
      });
    }
  });
  
export default router;
