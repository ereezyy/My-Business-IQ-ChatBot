import React from 'react';
import { motion } from 'framer-motion';
import Calendar from 'react-calendar';
import { useScheduleStore } from '../../store/scheduleStore';
import { businessConfig } from '../../config/business';
import { format } from 'date-fns';

export function AppointmentScheduler() {
  const {
    selectedService,
    selectedDate,
    selectedSlot,
    form,
    setSelectedService,
    setSelectedDate,
    setSelectedSlot,
    updateForm,
  } = useScheduleStore();

  const handleServiceSelect = (serviceId: string) => {
    const service = businessConfig.services.find((s) => s.id === serviceId);
    setSelectedService(service || null);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle appointment submission
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Schedule an Appointment</h2>

        <div className="space-y-8">
          {/* Service Selection */}
          <div>
            <h3 className="text-lg font-medium mb-4">Select a Service</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {businessConfig.services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service.id)}
                  className={`p-4 rounded-lg border transition-colors ${
                    selectedService?.id === service.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <h4 className="font-medium">{service.name}</h4>
                  <p className="text-sm text-gray-600">{service.description}</p>
                  <p className="mt-2 font-medium text-blue-600">
                    ${service.price} • {service.duration} mins
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Date Selection */}
          {selectedService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-medium">Select a Date</h3>
              <Calendar
                onChange={handleDateSelect}
                value={selectedDate}
                minDate={new Date()}
                className="rounded-lg border p-4"
              />
            </motion.div>
          )}

          {/* Time Selection */}
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-medium">
                Available Times for {format(selectedDate, 'MMMM d, yyyy')}
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {/* Add time slots here */}
              </div>
            </motion.div>
          )}

          {/* Contact Form */}
          {selectedSlot && (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <h3 className="text-lg font-medium">Your Information</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  onChange={(e) =>
                    updateForm({ customerName: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) =>
                    updateForm({ customerEmail: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  onChange={(e) =>
                    updateForm({ customerPhone: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
                <textarea
                  placeholder="Additional Notes"
                  onChange={(e) => updateForm({ notes: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                  rows={4}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Confirm Appointment
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </motion.div>
  );
}