const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { check, validationResult } = require('express-validator');
const Snippet = require('../models/Snippet');

// @route   GET api/snippets
// @desc    Get all user snippets
router.get('/', auth, async (req, res) => {
  try {
    const snippets = await Snippet.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(snippets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
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
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ msg: 'Snippet not found' });
    }

    // Make sure user owns snippet
    if (snippet.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Snippet.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Snippet removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;