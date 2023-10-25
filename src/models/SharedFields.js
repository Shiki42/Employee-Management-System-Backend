const name= {
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
};


const referrer = {
  name: name,
  Number: {
    type: String,
  },
  email: {
    type: String,
  },
  relationship: {
    type: String,
    required: true,
  },
};

const emergencyContact = {
  name: name,
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  relationship: {
    type: String,
    required: true,
  },
};


const workAuth= {
  type: String,
  enum: ['H1-B', 'L2', 'F1(CPT/OPT)', 'H4', 'Other', 'N/A'],
  workAuthStartDate: {
    type: String,
  },
  workAuthEndDate: {
    type: String,
  },
  workAuthOther: {
    type: String,
  },
};


module.exports = {
  emergencyContact,
  referrer,
  workAuth,
};
