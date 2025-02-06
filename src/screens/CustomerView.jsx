import React, { useState, useEffect } from 'react';
import { Plus, Eye, Trash2 } from 'lucide-react';

const CustomerView = () => {
  const [tickets, setTickets] = useState([
    {
      id: 'TK001',
      title: 'Network Issue',
      description: 'Unable to connect to VPN',
      priority: 'High',
      status: 'Open',
      createdAt: '2025-02-04',
      assignedTo: 'John Doe'
    },
    {
      id: 'TK002',
      title: 'Software Bug',
      description: 'Application crashes on startup',
      priority: 'Medium',
      status: 'Pending',
      createdAt: '2025-02-05',
      assignedTo: 'Jane Smith'
    }
  ]);
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    category: '',
    email: '',
    phone: ''
  });

  const handleCreateTicket = (e) => {
    e.preventDefault();
    const newTicket = {
      id: `TK${String(tickets.length + 1).padStart(3, '0')}`,
      ...formData,
      status: 'Open',
      createdAt: new Date().toISOString().split('T')[0],
      assignedTo: 'Unassigned'
    };
    setTickets([...tickets, newTicket]);
    setShowCreateModal(false);
    setFormData({
      title: '',
      description: '',
      priority: '',
      category: '',
      email: '',
      phone: ''
    });
  };

  const handleDeleteTicket = (ticketId) => {
    setTickets(tickets.filter(ticket => ticket.id !== ticketId));
  };

  const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-2xl">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{title}</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
          </div>
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">My Support Tickets</h1>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4" />
              Create Ticket
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ticket.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${ticket.priority === 'High' ? 'bg-red-100 text-red-800' : 
                        ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${ticket.status === 'Open' ? 'bg-blue-100 text-blue-800' : 
                        ticket.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.createdAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.assignedTo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => {
                        setSelectedTicket(ticket);
                        setShowViewModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Eye className="h-4 w-4 inline" />
                    </button>
                    <button
                      onClick={() => handleDeleteTicket(ticket.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Ticket Modal */}
      <Modal 
        show={showCreateModal} 
        onClose={() => setShowCreateModal(false)}
        title="Create New Ticket"
      >
        <form onSubmit={handleCreateTicket} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                required
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                required
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowCreateModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              Create Ticket
            </button>
          </div>
        </form>
      </Modal>

      {/* View Ticket Modal */}
      <Modal
        show={showViewModal}
        onClose={() => setShowViewModal(false)}
        title="Ticket Details"
      >
        {selectedTicket && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Ticket ID</label>
              <p className="mt-1 text-sm text-gray-900">{selectedTicket.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <p className="mt-1 text-sm text-gray-900">{selectedTicket.title}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <p className="mt-1 text-sm text-gray-900">{selectedTicket.description}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <p className="mt-1 text-sm text-gray-900">{selectedTicket.status}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <p className="mt-1 text-sm text-gray-900">{selectedTicket.priority}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Assigned To</label>
              <p className="mt-1 text-sm text-gray-900">{selectedTicket.assignedTo}</p>
            </div>
            <div className="mt-4">
              <button
                onClick={() => setShowViewModal(false)}
                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CustomerView;