import axios from "axios";

export function getNotes(id_category) {
  return axios.get(`http://localhost:8000/api/notes/${id_category}`);
}

export function getNote(noteId) {
  return axios.get(`http://localhost:8000/api/notes/note/${noteId}`);
}

export function createNote(id_category, title, content) {
  return axios.post("http://localhost:8000/api/notes", {
    id_category,
    title,
    content,
  });
}

export function deleteNote(noteId) {
  return axios.delete(`http://localhost:8000/api/notes/delete/${noteId}`);
}

export function updateNote(noteId, title, content) {
  return axios.put(`http://localhost:8000/api/notes/update`, {
    id: noteId,
    title,
    content,
  });
}

export function updateNoteVisibility(noteId, visibility) {
  return axios.put(`http://localhost:8000/api/notes/visibility`, {
    id: noteId,
    visibility,
  });
}

export function getLatestNotes() {
  return axios.get(`http://localhost:8000/api/notes/latest`);
}

export function getCategories() {
  return axios.get("http://localhost:8000/api/categories");
}

export function createCategory(name) {
  return axios.post("http://localhost:8000/api/categories/create", { name });
}

export function deleteCategory(id_category) {
  return axios.delete(
    `http://localhost:8000/api/categories/delete/${id_category}`
  );
}

export function updateCategory(id_category, name) {
  return axios.put("http://localhost:8000/api/categories/update", {
    categoryId: id_category,
    name,
  });
}
