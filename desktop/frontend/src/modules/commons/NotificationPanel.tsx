import { useState } from 'react';

interface Notification {
  id: number;
  category: string;
  message: string;
  time: string;
  iconClass: string;
}

const NotificationPanel = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Actualizaciones');

  // Ejemplo de categorías
  const categories = ['Updates', 'Messages', 'Alert', 'Task'];

  // Ejemplo de notificaciones
  const notifications: Notification[] = [
    { id: 1, category: 'Updates', message: 'Nueva actualización disponible', time: 'Hace 2 horas', iconClass: 'pi pi-info-circle text-blue-500' },
    { id: 2, category: 'Messages', message: 'Tienes un nuevo mensaje', time: 'Hace 5 minutos', iconClass: 'pi pi-envelope text-green-500' },
    { id: 4, category: 'Messages', message: 'Tienes un nuevo mensaje', time: 'Hace 5 minutos', iconClass: 'pi pi-envelope text-green-500' },
    { id: 5, category: 'Alert', message: 'Alerta de seguridad', time: 'Hace 1 día', iconClass: 'pi pi-exclamation-triangle text-yellow-500' },
  ];

  // Filtrar notificaciones por categoría seleccionada
  const filteredNotifications = notifications.filter(
    (notification) => notification.category === selectedCategory
  );

  return (
    <div className="flex w-full bg-gray-50 mt-10" style={{ height: 'calc(100vh - 100px)' }}>
      {/* Sidebar de Categorías */}
      <div className="w-1/4 bg-white shadow-md p-4 h-full">
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li
              key={category}
              className={`category-item cursor-pointer p-2 rounded ${
                selectedCategory === category ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* Lista de Notificaciones */}
      <section className="w-3/4 p-4 overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Notificaciones - {selectedCategory}</h3>
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <div key={notification.id} className="notification-item bg-white p-3 rounded-lg shadow mb-3">
              <div className="flex items-start">
                <div className="icon mr-3">
                  <i className={notification.iconClass}></i>
                </div>
                <div className="content flex-1">
                  <p className="text-sm font-medium text-gray-700">{notification.message}</p>
                  <p className="text-xs text-gray-500">{notification.time}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay notificaciones en esta categoría.</p>
        )}
      </section>
    </div>
  );
};

export {NotificationPanel};
