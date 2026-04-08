const pdf = require('pdf-parse');

const extractTextFromPDF = async (buffer) => {
  try {
    const data = await pdf(buffer);
    return data.text;
  } catch (error) {
    throw new Error('Failed to extract text from PDF');
  }
};

const extractTextFromDocument = async (file) => {
  try {
    if (file.mimetype === 'application/pdf') {
      return await extractTextFromPDF(file.buffer);
    } else {
      // For Word documents, you might want to use mammoth or similar library
      // For now, we'll handle it as text
      return file.buffer.toString('utf-8');
    }
  } catch (error) {
    throw new Error('Failed to extract text from document');
  }
};

module.exports = {
  extractTextFromPDF,
  extractTextFromDocument
};
