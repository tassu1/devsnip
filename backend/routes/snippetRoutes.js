const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { check, validationResult } = require('express-validator');
const Snippet = require('../models/Snippet');
const mongoose = require('mongoose');

// @route   GET api/snippets
router.get('/', auth, async (req, res) => {
  try {
    const snippets = await Snippet.find({ user: req.user.id })
      .select('-code') // Explicitly exclude code
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      count: snippets.length,
      data: snippets
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      success: false,
      error: 'Server error' 
    });
  }
});

// Add new route for single snippet with code
router.get('/:id/code', auth, async (req, res) => {
  try {
    const snippet = await Snippet.findOne({
      _id: req.params.id,
      user: req.user.id // Security: verify ownership
    }).select('code');

    if (!snippet) {
      return res.status(404).json({
        success: false,
        error: 'Snippet not found'
      });
    }

    res.json({
      success: true,
      data: {
        code: snippet.code
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ 
      success: false,
      error: 'Server error' 
    });
  }
});

// @route   POST api/snippets
// @desc    Add new snippet
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('code', 'Code is required').not().isEmpty(),
      check('language', 'Language is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, code, language, tags } = req.body;

    try {
      const newSnippet = new Snippet({
        title,
        code,
        language,
        tags,
        user: req.user.id,
      });

      const snippet = await newSnippet.save();
      res.json(snippet);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   PUT api/snippets/:id
// @desc    Update snippet
router.put('/:id', auth, async (req, res) => {
  const { title, code, language, tags } = req.body;

  // Build snippet object
  const snippetFields = {};
  if (title) snippetFields.title = title;
  if (code) snippetFields.code = code;
  if (language) snippetFields.language = language;
  if (tags) snippetFields.tags = tags;

  try {
    let snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ msg: 'Snippet not found' });
    }

    // Make sure user owns snippet
    if (snippet.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    snippet = await Snippet.findByIdAndUpdate(
      req.params.id,
      { $set: snippetFields },
      { new: true }
    );

    res.json(snippet);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/snippets/:id
// @desc    Delete snippet
router.delete('/:id', auth, async (req, res) => {
  try {
    // Validate ID format first
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid snippet ID format'
      });
    }

    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({
        success: false,
        error: 'Snippet not found'
      });
    }

    // Make sure user owns snippet
    if (snippet.user.toString() !== req.user.id) {
      return res.status(403).json({  // 403 Forbidden is more appropriate
        success: false,
        error: 'Not authorized to delete this snippet'
      });
    }

    await snippet.deleteOne();  // Preferred over findByIdAndRemove
    
    res.json({
      success: true,
      message: 'Snippet deleted successfully',
      data: {
        id: req.params.id
      }
    });
    
  } catch (err) {
    console.error('DELETE Error:', err.message);
    
    // More specific error handling
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Server error',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});
module.exports = router;