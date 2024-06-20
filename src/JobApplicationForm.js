import React, { useState } from 'react';

const JobApplicationForm = () => {
  const [formValues, setFormValues] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioUrl: '',
    managementExperience: '',
    additionalSkills: {
      JavaScript: false,
      CSS: false,
      Python: false,
      // Add other skills as needed
    },
    preferredInterviewTime: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormValues({
        ...formValues,
        additionalSkills: {
          ...formValues.additionalSkills,
          [name]: checked,
        },
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const validate = () => {
    const errors = {};
    if (!formValues.fullName) errors.fullName = 'Full Name is required';
    if (!formValues.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!formValues.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (isNaN(formValues.phoneNumber)) {
      errors.phoneNumber = 'Phone Number must be a valid number';
    }
    if (
      (formValues.position === 'Developer' ||
        formValues.position === 'Designer') &&
      (!formValues.relevantExperience || formValues.relevantExperience <= 0)
    ) {
      errors.relevantExperience =
        'Relevant Experience is required and must be a number greater than 0';
    }
    if (
      formValues.position === 'Designer' &&
      (!formValues.portfolioUrl ||
        !/^https?:\/\/.+\..+/.test(formValues.portfolioUrl))
    ) {
      errors.portfolioUrl = 'Portfolio URL is required and must be a valid URL';
    }
    if (formValues.position === 'Manager' && !formValues.managementExperience) {
      errors.managementExperience = 'Management Experience is required';
    }
    if (!Object.values(formValues.additionalSkills).includes(true)) {
      errors.additionalSkills = 'At least one skill must be selected';
    }
    if (!formValues.preferredInterviewTime) {
      errors.preferredInterviewTime = 'Preferred Interview Time is required';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setSubmitted(true);
    }
  };

  return (
    <div>
      {submitted ? (
        <div>
          <h2>Application Summary</h2>
          <p>Full Name: {formValues.fullName}</p>
          <p>Email: {formValues.email}</p>
          <p>Phone Number: {formValues.phoneNumber}</p>
          <p>Applying for Position: {formValues.position}</p>
          {(formValues.position === 'Developer' ||
            formValues.position === 'Designer') && (
            <p>Relevant Experience: {formValues.relevantExperience} years</p>
          )}
          {formValues.position === 'Designer' && (
            <p>Portfolio URL: {formValues.portfolioUrl}</p>
          )}
          {formValues.position === 'Manager' && (
            <p>Management Experience: {formValues.managementExperience}</p>
          )}
          <p>
            Additional Skills:{' '}
            {Object.keys(formValues.additionalSkills)
              .filter((skill) => formValues.additionalSkills[skill])
              .join(', ')}
          </p>
          <p>Preferred Interview Time: {formValues.preferredInterviewTime}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Full Name:</label>
            <input
              type="text"
              name="fullName"
              placeholder="enter your name "
              value={formValues.fullName}
              onChange={handleInputChange}
            />
            {formErrors.fullName && (
              <p className="error">{formErrors.fullName}</p>
            )}
          </div>

          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="enter your email "
              value={formValues.email}
              onChange={handleInputChange}
            />
            {formErrors.email && <p className="error">{formErrors.email}</p>}
          </div>

          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              placeholder="enter your phone number "
              value={formValues.phoneNumber}
              onChange={handleInputChange}
            />
            {formErrors.phoneNumber && (
              <p className="error">{formErrors.phoneNumber}</p>
            )}
          </div>

          <div>
            <label>Applying for Position:</label>
            <select
              name="position"
              value={formValues.position}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          {(formValues.position === 'Developer' ||
            formValues.position === 'Designer') && (
            <div>
              <label>Relevant Experience (years):</label>
              <input
                type="number"
                name="relevantExperience"
                value={formValues.relevantExperience}
                onChange={handleInputChange}
              />
              {formErrors.relevantExperience && (
                <p className="error">{formErrors.relevantExperience}</p>
              )}
            </div>
          )}

          {formValues.position === 'Designer' && (
            <div>
              <label>Portfolio URL:</label>
              <input
                type="text"
                name="portfolioUrl"
                value={formValues.portfolioUrl}
                onChange={handleInputChange}
              />
              {formErrors.portfolioUrl && (
                <p className="error">{formErrors.portfolioUrl}</p>
              )}
            </div>
          )}

          {formValues.position === 'Manager' && (
            <div>
              <label>Management Experience:</label>
              <textarea
                name="managementExperience"
                value={formValues.managementExperience}
                onChange={handleInputChange}
              />
              {formErrors.managementExperience && (
                <p className="error">{formErrors.managementExperience}</p>
              )}
            </div>
          )}

          <div>
            <label>Additional Skills:</label>
            <div>
              {Object.keys(formValues.additionalSkills).map((skill) => (
                <label key={skill}>
                  <input
                    type="checkbox"
                    name={skill}
                    checked={formValues.additionalSkills[skill]}
                    onChange={handleInputChange}
                  />
                  {skill}
                </label>
              ))}
            </div>
            {formErrors.additionalSkills && (
              <p className="error">{formErrors.additionalSkills}</p>
            )}
          </div>

          <div>
            <label>Preferred Interview Time:</label>
            <input
              type="datetime-local"
              name="preferredInterviewTime"
              value={formValues.preferredInterviewTime}
              onChange={handleInputChange}
            />
            {formErrors.preferredInterviewTime && (
              <p className="error">{formErrors.preferredInterviewTime}</p>
            )}
          </div>

          <button type="submit">Submit Application</button>
        </form>
      )}
    </div>
  );
};

export default JobApplicationForm;
