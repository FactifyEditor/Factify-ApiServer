import  service  from "./../services/index.js";
const {languageService} =service

const getAllLanguages = async (req, res) => {
  try {
    const languages = await languageService.getAllLanguages();
    res.json({ data: languages, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createLanguage = async (req, res) => {
  try {
    const language = await languageService.createLanguage(req.body);
    res.json({ data: language, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getLanguageById = async (req, res) => {
  try {
    const language = await languageService.getLanguageById(req.params.id);
    res.json({ data: language, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateLanguage = async (req, res) => {
  try {
    const language = await languageService.updateLanguage(req.params.id, req.body);
    res.json({ data: language, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteLanguage = async (req, res) => {
  try {
    const language = await languageService.deleteLanguage(req.params.id);
    res.json({ data: language, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
getAllLanguages,
createLanguage,
updateLanguage,
deleteLanguage,
getLanguageById
}