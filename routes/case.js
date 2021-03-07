const express = require('express');
const router = express.Router();
const Case = require('../models/case');


router.get('/', async (req, res) => {
  try {
    const cases = await Case.find();
    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: err })
  }
})

router.get('/docket/:docket', getCase, async (req, res) => {
  res.json(res.theCase);
});

router.get('/year/:year', getCasesByYear, async (req, res) => {
  res.json(res.cases);
});

router.get('/active', getActiveCases, async (req, res) => {
  res.json(res.cases);
});

router.post('/', async (req, res) => {
  const newCase = new Case({
    name: req.body.name,
    docket: req.body.docket,
    petitioner: req.body.petitioner,
    respondent: req.body.respondent,
    appellant: req.body.appellant,
    appellee: req.body.appellee,
    decided_by: req.body.decided_by,
    lower_court: req.body.lower_court,
    citation: req.body.citation,
    granted: req.body.granted,
    argued: req.body.argued,
    decided: req.body.decided,
    description: req.body.description,
    facts: req.body.facts,
    question: req.body.question,
    year: req.body.year
  });
  try {
    const savedCase = await newCase.save();
    res.status(201).json(savedCase);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.patch('/:id', getCase, async (req, res) => {
  if (req.body.name != null) {
    res.theCase.name = req.body.name
  }
  if (req.body.docket != null) {
    res.theCase.docket = req.body.docket
  }
  if (req.body.petitioner != null) {
    res.theCase.petitioner = req.body.petitioner
  }

  try {
    const updatedCase = await res.theCase.save()
    res.json(updatedCase)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// router.patch('/:id', getCase, async (req, res) => {
//   try {
//     const updatedCase = await Case.updateOne(
//       { _id: req.params.id },
//       { $set: { name: req.body.name } }
//     );
//     res.json(updatedCase);
//   } catch (err) {
//     res.json({ message: err });
//   }
// })

// router.delete('/:id', getCase, async (req, res) => {
//   try {
//     const removedCase = await res.theCase.remove();
//     res.json(
//       {
//         message: 'Deleted case',
//         removed: removedCase
//       })
//   } catch (err) {
//     res.json({ message: err });
//   }
// })

router.delete('/all', async (req, res) => {
  try {
    const cases = await Case.deleteMany({});
    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: err })
  }
})


async function getCase(req, res, next) {
  let theCase
  try {
    theCase = await Case.findById(req.params.id)
    theCase = await Case.find({'docket': req.params.docket})
    if (theCase == null) {
      return res.status(404).json({ message: 'Cannot find case' })
    }
  } catch (err) {
    return res.status(500).json({ message: err })
  }

  res.theCase = theCase 
  next()
}

async function getCasesByYear(req, res, next) {
  let cases
  try {
    cases = await Case.find({'year': req.params.year})
    if (cases == null) {
      return res.status(404).json({ message: 'Cannot find cases' })
    }
  } catch (err) {
    return res.status(500).json({ message: err })
  }

  res.cases = cases 
  next()
}

async function getActiveCases(req, res, next) {
  let cases
  try {
    cases = await Case.find({'decided': null})
    if (cases == null) {
      return res.status(404).json({ message: 'Cannot find cases' })
    }
  } catch (err) {
    return res.status(500).json({ message: err })
  }

  res.cases = cases 
  next()
}


module.exports = router;