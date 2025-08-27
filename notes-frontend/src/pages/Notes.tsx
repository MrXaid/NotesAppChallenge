import { useEffect, useState } from "react";
import api from "../services/api";

interface Note {
  id: number;
  title: string;
  content: string;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data);
    } catch {
      alert("Error loading notes");
    }
  };

  const addNote = async () => {
    try {
      await api.post("/notes", { title, content });
      setTitle("");
      setContent("");
      fetchNotes();
    } catch {
      alert("Error creating note");
    }
  };

  const deleteNote = async (id: number) => {
    try {
      await api.delete(`/notes/${id}`);
      fetchNotes();
    } catch {
      alert("Error deleting note");
    }
  };

  const startEditing = (note: Note) => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const updateNote = async (id: number) => {
    try {
      await api.put(`/notes/${id}`, {
        title: editTitle,
        content: editContent,
      });
      setEditingId(null);
      fetchNotes();
    } catch {
      alert("Error updating note");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-3xl mx-auto font-cinzel text-wood">
      <h2 className="text-3xl font-bold mb-6 text-gold drop-shadow-md">
        📜 Your Ancient Notes
      </h2>

      {/* ✅ Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search scrolls..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border-2 border-wood bg-parchment p-3 w-full mb-6 rounded shadow-md placeholder:text-wood"
      />

      {/* Add Note Form */}
      <div className="mb-6 flex flex-col md:flex-row gap-3">
        <input
          className="border-2 border-wood bg-parchment p-3 flex-1 rounded shadow-md placeholder:text-wood"
          placeholder="Title of the scroll..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border-2 border-wood bg-parchment p-3 flex-1 rounded shadow-md placeholder:text-wood"
          placeholder="Write on parchment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={addNote}
          className="bg-gold text-wood px-4 py-2 rounded shadow-md font-bold hover:bg-parchment hover:text-wood transition"
        >
          ✍️ Add
        </button>
      </div>

      {/* Notes List */}
      <ul className="space-y-4">
        {filteredNotes.map((note) => (
          <li
            key={note.id}
            className="bg-parchment border-2 border-wood p-4 rounded-lg shadow-lg"
          >
            {editingId === note.id ? (
              <div className="flex flex-col gap-3">
                <input
                  className="border-2 border-wood bg-parchment p-2 rounded"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  className="border-2 border-wood bg-parchment p-2 rounded"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => updateNote(note.id)}
                    className="bg-green-700 text-parchment px-3 py-1 rounded hover:bg-green-800"
                  >
                    💾 Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-600 text-parchment px-3 py-1 rounded hover:bg-gray-700"
                  >
                    ❌ Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-bold text-lg">📖 {note.title}</span>
                  <p className="mt-1">{note.content}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(note)}
                    className="bg-yellow-600 text-parchment px-3 py-1 rounded hover:bg-yellow-700"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="bg-red-700 text-parchment px-3 py-1 rounded hover:bg-red-800"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
        {filteredNotes.length === 0 && (
          <p className="text-gray-400 mt-6 italic">No scrolls found...</p>
        )}
      </ul>
    </div>
  );
}
