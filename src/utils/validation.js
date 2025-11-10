export const validateInstructorForm = (form) => {
  const errors = {};

  if (!form.expertise || form.expertise.length === 0) {
    errors.expertise = "Please select at least one area of expertise";
  }

  if (!form.experience.trim()) {
    errors.experience = "Please describe your experience";
  }

  if (!form.sample_lesson.trim()) {
    errors.sample_lesson = "Please provide a sample lesson";
  }

  if (form.resume_url && !isValidURL(form.resume_url)) {
    errors.resume_url = "Please enter a valid URL";
  }

  return errors;
};

const isValidURL = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

export const validateReply = (content) => {
  const errors = {};
  
  if (!content || content.trim().length < 10) {
    errors.content = 'Reply must be at least 10 characters long';
  }

  return errors;
};