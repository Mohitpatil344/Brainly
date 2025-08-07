import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, CheckCircle, Circle, Sparkles } from 'lucide-react';
import axios from 'axios';
import { BACKEND_URL } from '../config';

interface Todo {
  id: string;  // Changed to string since MongoDB IDs are strings
  text: string;
  completed: boolean;
}

export function Todo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/todo/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Add new todo
  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      try {
        const response = await axios.post(`${BACKEND_URL}/api/todo/todos`, {
          text: newTodo.trim(),
        });
        setTodos([...todos, response.data]);
        setNewTodo('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  // Toggle todo completion
  const toggleTodo = async (id: string) => {
    try {
      const response = await axios.patch(`${BACKEND_URL}/api/todo/todos/${id}`);
      setTodos(todos.map((todo) => (todo.id === id ? response.data : todo)));
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  // Delete todo
  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/todo/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;
  const progress = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Sparkles className="text-purple-500" size={28} />
            <h1 className="text-4xl font-bold text-gray-800">Tasks</h1>
          </div>

          <form onSubmit={addTodo} className="mb-8">
            <div className="flex gap-3">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-1 px-6 py-3 bg-gray-50 rounded-xl border border-gray-200 placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-300"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-all duration-300 font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <PlusCircle size={20} />
                Add Task
              </button>
            </div>
          </form>

          {totalCount > 0 && (
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2 text-gray-600">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <div className="space-y-3">
            {todos.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-3">
                  <Sparkles size={32} className="inline-block" />
                </div>
                <p className="text-gray-500">
                  Your task list is empty. Time to add some goals!
                </p>
              </div>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="group flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className="text-gray-400 hover:text-purple-600 transition-colors duration-200"
                  >
                    {todo.completed ? (
                      <CheckCircle className="text-green-500" size={24} />
                    ) : (
                      <Circle size={24} />
                    )}
                  </button>
                  <span
                    className={`flex-1 transition-all duration-300 ${
                      todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'
                    }`}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-gray-400 hover:text-red-500 transition-all duration-300 opacity-0 group-hover:opacity-100 transform group-hover:scale-110"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>

          {todos.length > 0 && (
            <div className="mt-8 text-sm text-gray-500 text-center">
              {completedCount} of {totalCount} tasks completed
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;
