import React, { useState, useEffect } from 'react';
import { Search, Plus, Pin, PinOff, Edit2, Trash2, Tag, Save, X, Calendar } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  isPinned: boolean;
  createdAt: Date;
  link: string;
}

export function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: '',
    link: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = ['Personal', 'Work', 'Ideas', 'Tasks', 'Youtube', 'Twitter', 'Other'];
  const gradients = {
    Personal: 'from-pink-500 to-rose-500',
    Work: 'from-blue-500 to-indigo-500',
    Ideas: 'from-green-500 to-emerald-500',
    Tasks: 'from-yellow-500 to-orange-500',
    Youtube: 'from-red-500 to-pink-500',
    Twitter: 'from-purple-500 to-violet-500',
    Other: 'from-purple-500 to-violet-500',
  };

  // Get the auth token from localStorage
  const getToken = () => localStorage.getItem('token');

  // Fetch notes from the API
  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/notes/', {
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch notes');
      }
      
      const data = await response.json();
      
      // Transform the API response to match our Note interface
      const transformedNotes = data.notes.map((note: any) => ({
        ...note,
        isPinned: note.is_pinned, // Convert snake_case to camelCase
        createdAt: new Date(note.created_at)
      }));
      
      setNotes(transformedNotes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Load notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  // Handle search
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/api/notes/?search=${searchTerm}`, {
          headers: {
            'Authorization': `Bearer ${getToken()}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to search notes');
        }
        
        const data = await response.json();
        const transformedNotes = data.notes.map((note: any) => ({
          ...note,
          isPinned: note.is_pinned,
          createdAt: new Date(note.created_at)
        }));
        
        setNotes(transformedNotes);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if there is a search term
    if (searchTerm) {
      const timeoutId = setTimeout(() => {
        fetchSearchResults();
      }, 500); // Debounce search
      
      return () => clearTimeout(timeoutId);
    } else {
      fetchNotes(); // If search is cleared, fetch all notes
    }
  }, [searchTerm]);

  const handleAddNote = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/notes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({
          title: newNote.title,
          content: newNote.content,
          category: newNote.category || 'Other',
          link: newNote.link
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to add note');
      }
      
      // Refresh notes
      fetchNotes();
      
      // Reset form
      setNewNote({ title: '', content: '', category: '', link: '' });
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  const handleEditNote = async (note: Note) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${note.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken()}`
        },
        body: JSON.stringify({
          title: note.title,
          content: note.content,
          category: note.category,
          link: note.link,
          is_pinned: note.isPinned
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update note');
      }
      
      // Refresh notes
      fetchNotes();
      setEditingNote(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete note');
      }
      
      // Refresh notes
      fetchNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  const togglePin = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notes/${id}/pin`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${getToken()}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to toggle pin');
      }
      
      // Refresh notes
      fetchNotes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  // Sort notes by pinned status and creation date
  const sortedNotes = [...notes].sort((a, b) => {
    if (a.isPinned === b.isPinned) {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return a.isPinned ? -1 : 1;
  });

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    >
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8 bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg">
          <h1 className="text-4xl font-bold text-gray-800 tracking-tight">My Notes</h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            <Plus size={20} /> New Note
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error}</span>
            <span
              className="absolute top-0 bottom-0 right-0 px-4 py-3"
              onClick={() => setError(null)}
            >
              <X size={20} />
            </span>
          </div>
        )}

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/80 backdrop-blur-lg shadow-md transition-all duration-300"
          />
        </div>

        {showForm && (
          <div className="mb-8 glass-effect rounded-xl shadow-xl p-8 note-form border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Create New Note</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Note title"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              className="w-full mb-4 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/50"
            />
            <textarea
              placeholder="Note content"
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              className="w-full mb-4 p-3 border border-gray-200 rounded-xl h-40 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/50 resize-none"
            />
            <input
              type="text"
              placeholder="Note link (optional)"
              value={newNote.link}
              onChange={(e) => setNewNote({ ...newNote, link: e.target.value })}
              className="w-full mb-4 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/50"
            />
            <select
              value={newNote.category}
              onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
              className="w-full mb-6 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/50"
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="flex gap-3">
              <button
                onClick={handleAddNote}
                disabled={!newNote.title || !newNote.content}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Save size={20} /> Save Note
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedNotes.length === 0 ? (
              <div className="col-span-3 text-center py-16">
                <p className="text-lg text-gray-500">No notes found. Create a new note to get started!</p>
              </div>
            ) : (
              sortedNotes.map((note) => (
                <div
                  key={note.id}
                  className={`note-card bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    note.isPinned ? 'ring-2 ring-indigo-500 ring-offset-2' : ''
                  }`}
                >
                  {editingNote?.id === note.id ? (
                    <div>
                      <input
                        type="text"
                        value={editingNote.title}
                        onChange={(e) =>
                          setEditingNote({ ...editingNote, title: e.target.value })
                        }
                        className="w-full mb-4 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <textarea
                        value={editingNote.content}
                        onChange={(e) =>
                          setEditingNote({ ...editingNote, content: e.target.value })
                        }
                        className="w-full mb-4 p-3 border border-gray-200 rounded-xl h-40 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      />
                      <input
                        type="text"
                        placeholder="Note link (optional)"
                        value={editingNote.link}
                        onChange={(e) =>
                          setEditingNote({ ...editingNote, link: e.target.value })
                        }
                        className="w-full mb-4 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <select
                        value={editingNote.category}
                        onChange={(e) =>
                          setEditingNote({ ...editingNote, category: e.target.value })
                        }
                        className="w-full mb-4 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEditNote(editingNote)}
                          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
                        >
                          <Save size={20} /> Save
                        </button>
                        <button
                          onClick={() => setEditingNote(null)}
                          className="px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-all duration-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">
                          {note.title}
                        </h3>
                        <div className="flex gap-2">
                          <button
                            onClick={() => togglePin(note.id)}
                            className={`text-gray-500 hover:text-indigo-600 transition-colors ${
                              note.isPinned ? 'text-indigo-600' : ''
                            }`}
                          >
                            {note.isPinned ? <Pin size={20} /> : <PinOff size={20} />}
                          </button>
                          <button
                            onClick={() => setEditingNote({...note})}
                            className="text-gray-500 hover:text-indigo-600 transition-colors"
                          >
                            <Edit2 size={20} />
                          </button>
                          <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="text-gray-500 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-6 whitespace-pre-wrap">
                        {note.content}
                      </p>
                      {note.link && (
                        <a
                          href={note.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-500 hover:text-indigo-600 mb-6 block break-words"
                        >
                          {note.link}
                        </a>
                      )}
                      <div className="flex items-center justify-between text-sm">
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${
                          gradients[note.category as keyof typeof gradients]
                        } text-white`}>
                          <Tag size={14} />
                          <span>{note.category}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <Calendar size={14} />
                          <span>{formatDate(note.createdAt)}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notes;