import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Plus, Filter, RefreshCw } from 'lucide-react';
import { timeSlots, classrooms, teachers, courses } from '../../data/mockData';
import { TimeSlot } from '../../types';

const TimetablePage: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'timeGridWeek' | 'dayGridMonth'>('timeGridWeek');
  const [events, setEvents] = useState<TimeSlot[]>(timeSlots);
  
  const handleEventClick = (info: any) => {
    const eventId = parseInt(info.event.id);
    const event = events.find(e => e.id === eventId);
    
    if (event) {
      alert(`
        Cours: ${event.title}
        Début: ${new Date(event.start).toLocaleString()}
        Fin: ${new Date(event.end).toLocaleString()}
        Salle: ${classrooms.find(c => c.id === event.classroomId)?.name || 'N/A'}
        Enseignant: ${teachers.find(t => t.id === event.teacherId)?.name || 'N/A'}
      `);
    }
  };
  
  return (
    <DashboardLayout title="Gestion des Emplois du Temps">
      <div className="bg-white rounded-lg shadow-card p-6 mb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 mb-6">
          <h2 className="text-2xl font-semibold">Emploi du Temps</h2>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <button className="flex items-center justify-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors">
              <Plus size={16} />
              <span>Ajouter un cours</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
              <Filter size={16} />
              <span>Filtres</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
              <RefreshCw size={16} />
              <span>Actualiser</span>
            </button>
          </div>
        </div>
        
        <div className="flex space-x-2 mb-6">
          <button
            className={`px-4 py-2 rounded-md ${
              selectedView === 'timeGridWeek'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
            onClick={() => setSelectedView('timeGridWeek')}
          >
            Vue semaine
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              selectedView === 'dayGridMonth'
                ? 'bg-primary-100 text-primary-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
            onClick={() => setSelectedView('dayGridMonth')}
          >
            Vue mois
          </button>
        </div>
        
        <div className="h-[600px] bg-white">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={selectedView}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: '',
            }}
            events={events.map(event => ({
              id: event.id.toString(),
              title: event.title,
              start: event.start,
              end: event.end,
              backgroundColor: event.color,
              borderColor: event.color,
            }))}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
            allDaySlot={false}
            slotMinTime="08:00:00"
            slotMaxTime="18:00:00"
            height="100%"
            eventClick={handleEventClick}
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              meridiem: false,
              hour12: false
            }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-card p-6">
          <h3 className="text-lg font-semibold mb-4">Salles disponibles</h3>
          <div className="space-y-3">
            {classrooms.map(classroom => (
              <div key={classroom.id} className="p-3 border rounded-md hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{classroom.name}</h4>
                    <p className="text-sm text-gray-500">
                      {classroom.building}, {classroom.capacity} places
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {classroom.hasProjector && (
                      <span className="w-2 h-2 bg-green-500 rounded-full" title="Projecteur disponible"></span>
                    )}
                    {classroom.hasComputers && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full" title="Ordinateurs disponibles"></span>
                    )}
                    {classroom.isLab && (
                      <span className="w-2 h-2 bg-purple-500 rounded-full" title="Laboratoire"></span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-card p-6">
          <h3 className="text-lg font-semibold mb-4">Enseignants</h3>
          <div className="space-y-3">
            {teachers.map(teacher => (
              <div key={teacher.id} className="p-3 border rounded-md hover:bg-gray-50">
                <h4 className="font-medium">{teacher.name}</h4>
                <p className="text-sm text-gray-500">{teacher.department} - {teacher.specialization}</p>
                <div className="mt-1 flex flex-wrap gap-1">
                  {teacher.availableDays.map((day, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-0.5 text-xs bg-primary-100 text-primary-700 rounded-full"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-card p-6">
          <h3 className="text-lg font-semibold mb-4">Cours</h3>
          <div className="space-y-3">
            {courses.map(course => (
              <div key={course.id} className="p-3 border rounded-md hover:bg-gray-50">
                <h4 className="font-medium">{course.name}</h4>
                <div className="flex justify-between">
                  <p className="text-sm text-gray-500">{course.code}</p>
                  <p className="text-sm text-gray-500">{course.credits} crédits</p>
                </div>
                <p className="text-sm text-gray-500">{course.department}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TimetablePage;