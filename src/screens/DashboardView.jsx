import React, { useState } from 'react';
import { Bell, LogOut, Plus, Eye, Edit2, Trash2, X } from 'lucide-react';


export  const DashboardView = () =>{
     const [showTicketModal, setShowTicketModal] = useState(false);
    

   return <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-800">Support System</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back, Agent</p>
        </div>
        
        <nav className="mt-6">
          <div className="px-6 py-3 bg-blue-50 border-r-4 border-blue-500 flex items-center">
            <span className="text-blue-500 font-medium">Tickets</span>
          </div>
          <div className="px-6 py-3 flex items-center text-gray-500 hover:bg-gray-50 cursor-pointer" 
               onClick={() => {console.log("clicked logout")}}>
            <LogOut className="w-4 h-4 mr-3" />
            <span>Logout</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <header className="bg-white border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-lg font-semibold">Ticket Management</h2>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold">All Tickets</h3>
              <p className="text-sm text-gray-500">Manage and track support requests</p>
            </div>
            <button
              onClick={() => setShowTicketModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Ticket
            </button>
          </div>

          <div className="bg-white rounded-lg shadow">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Ticket ID</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Subject</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Priority</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Status</th>
                  <th className="text-left p-4 text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'TKT-001', subject: 'Login Issue', priority: 'High', status: 'Open' },
                  { id: 'TKT-002', subject: 'Payment Failed', priority: 'Medium', status: 'In Progress' },
                  { id: 'TKT-003', subject: 'Account Access', priority: 'Low', status: 'Closed' },
                ].map((ticket) => (
                  <tr key={ticket.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{ticket.id}</td>
                    <td className="p-4">{ticket.subject}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        ticket.priority === 'High' ? 'bg-red-100 text-red-700' :
                        ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        ticket.status === 'Open' ? 'bg-blue-100 text-blue-700' :
                        ticket.status === 'In Progress' ? 'bg-purple-100 text-purple-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <button className="p-1 hover:text-blue-500"><Eye className="w-4 h-4" /></button>
                        <button className="p-1 hover:text-green-500"><Edit2 className="w-4 h-4" /></button>
                        <button className="p-1 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* New Ticket Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-[600px] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-semibold">Create New Ticket</h3>
              <button onClick={() => setShowTicketModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input type="text" className="w-full p-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea className="w-full p-2 border rounded-lg h-32" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select className="w-full p-2 border rounded-lg">
                      <option>Technical</option>
                      <option>Billing</option>
                      <option>General</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Attachment</label>
                  <input type="file" className="w-full p-2 border rounded-lg" />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowTicketModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Create Ticket
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
}
