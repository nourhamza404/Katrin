import { useState } from 'react';
import { User, MapPin, Package, Plus, Edit2, Trash2, Clock, CheckCircle } from 'lucide-react';

interface ProfilePageProps {
  currentUser: any;
  onLogin: () => void;
}

export default function ProfilePage({ currentUser, onLogin }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'orders'>('profile');
  
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto">
            <User className="w-10 h-10 text-pink-600" />
          </div>
          <h2 className="text-3xl text-gray-900">Anmeldung erforderlich</h2>
          <p className="text-gray-600">
            Bitte melden Sie sich an, um auf Ihr Kundenkonto zuzugreifen.
          </p>
          <button
            onClick={onLogin}
            className="w-full bg-pink-600 text-white py-3 rounded-full hover:bg-pink-700 transition-colors"
          >
            Jetzt anmelden
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl">
              {currentUser.name?.charAt(0).toUpperCase() || 'K'}
            </div>
            <div>
              <h1 className="text-3xl text-gray-900">Willkommen zurück!</h1>
              <p className="text-gray-600">{currentUser.email}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-t-3xl shadow-lg">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-4 px-6 flex items-center justify-center space-x-2 transition-colors ${
                activeTab === 'profile'
                  ? 'border-b-2 border-pink-600 text-pink-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className="w-5 h-5" />
              <span>Meine Daten</span>
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`flex-1 py-4 px-6 flex items-center justify-center space-x-2 transition-colors ${
                activeTab === 'addresses'
                  ? 'border-b-2 border-pink-600 text-pink-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MapPin className="w-5 h-5" />
              <span>Adressen</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-4 px-6 flex items-center justify-center space-x-2 transition-colors ${
                activeTab === 'orders'
                  ? 'border-b-2 border-pink-600 text-pink-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Package className="w-5 h-5" />
              <span>Bestellungen</span>
            </button>
          </div>

          <div className="p-6 md:p-8">
            {activeTab === 'profile' && <ProfileTab currentUser={currentUser} />}
            {activeTab === 'addresses' && <AddressesTab />}
            {activeTab === 'orders' && <OrdersTab />}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ currentUser }: any) {
  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    email: currentUser.email || '',
    phone: currentUser.phone || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock update - would integrate with Supabase
    console.log('Profile updated:', formData);
    alert('Profil erfolgreich aktualisiert!');
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl text-gray-900 mb-6">Persönliche Informationen</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-2">E-Mail</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-2">Telefon</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            placeholder="+49 123 456789"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <button
          type="submit"
          className="bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition-colors"
        >
          Änderungen speichern
        </button>
      </form>
    </div>
  );
}

function AddressesTab() {
  const [addresses, setAddresses] = useState([
    {
      id: '1',
      name: 'Zu Hause',
      street: 'Musterstraße 123',
      city: 'München',
      zip: '80331',
      country: 'Deutschland',
      isDefault: true,
    },
  ]);
  
  const [isAdding, setIsAdding] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: '',
    street: '',
    city: '',
    zip: '',
    country: 'Deutschland',
  });

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    const address = {
      id: Date.now().toString(),
      ...newAddress,
      isDefault: addresses.length === 0,
    };
    setAddresses(prev => [...prev, address]);
    setNewAddress({ name: '', street: '', city: '', zip: '', country: 'Deutschland' });
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl text-gray-900">Meine Adressen</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Neue Adresse</span>
        </button>
      </div>

      {isAdding && (
        <div className="bg-pink-50 rounded-2xl p-6 mb-6">
          <h3 className="text-lg text-gray-900 mb-4">Neue Adresse hinzufügen</h3>
          <form onSubmit={handleAddAddress} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Bezeichnung</label>
              <input
                type="text"
                value={newAddress.name}
                onChange={(e) => setNewAddress(prev => ({ ...prev, name: e.target.value }))}
                placeholder="z.B. Zu Hause, Büro"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Straße & Hausnummer</label>
              <input
                type="text"
                value={newAddress.street}
                onChange={(e) => setNewAddress(prev => ({ ...prev, street: e.target.value }))}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-2">PLZ</label>
                <input
                  type="text"
                  value={newAddress.zip}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, zip: e.target.value }))}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-2">Stadt</label>
                <input
                  type="text"
                  value={newAddress.city}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, city: e.target.value }))}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-colors"
              >
                Speichern
              </button>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 transition-colors"
              >
                Abbrechen
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {addresses.map(address => (
          <div
            key={address.id}
            className={`p-6 rounded-2xl border-2 ${
              address.isDefault
                ? 'border-pink-600 bg-pink-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-gray-900">{address.name}</h3>
                  {address.isDefault && (
                    <span className="bg-pink-600 text-white text-xs px-2 py-1 rounded-full">
                      Standard
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm">
                  {address.street}<br />
                  {address.zip} {address.city}<br />
                  {address.country}
                </p>
              </div>
              <div className="flex space-x-2">
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="p-2 text-gray-600 hover:text-pink-600 transition-colors"
                    title="Als Standard festlegen"
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                )}
                <button
                  className="p-2 text-gray-600 hover:text-pink-600 transition-colors"
                  title="Bearbeiten"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                  title="Löschen"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersTab() {
  const mockOrders = [
    {
      id: '1',
      date: '2024-11-15',
      status: 'Genehmigt',
      statusColor: 'green',
      items: [
        { name: 'Schokoladentorte Deluxe', quantity: 1, price: 45.00 }
      ],
      total: 45.00,
    },
    {
      id: '2',
      date: '2024-11-10',
      status: 'Prüfung ausstehend',
      statusColor: 'yellow',
      items: [
        { name: 'Individuelle Hochzeitstorte', quantity: 1, price: 250.00 }
      ],
      total: 250.00,
    },
    {
      id: '3',
      date: '2024-10-28',
      status: 'Abgeschlossen',
      statusColor: 'gray',
      items: [
        { name: 'Chocolate Chip Cookies (12 Stk)', quantity: 2, price: 15.00 }
      ],
      total: 30.00,
    },
  ];

  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'completed'>('all');

  let filteredOrders = mockOrders;
  if (filter === 'pending') {
    filteredOrders = mockOrders.filter(o => o.status === 'Prüfung ausstehend');
  } else if (filter === 'approved') {
    filteredOrders = mockOrders.filter(o => o.status === 'Genehmigt');
  } else if (filter === 'completed') {
    filteredOrders = mockOrders.filter(o => o.status === 'Abgeschlossen');
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl text-gray-900">Meine Bestellungen</h2>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              filter === 'all'
                ? 'bg-pink-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Alle
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              filter === 'pending'
                ? 'bg-pink-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Ausstehend
          </button>
          <button
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              filter === 'approved'
                ? 'bg-pink-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Genehmigt
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.map(order => (
          <div key={order.id} className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-pink-300 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-gray-900">Bestellung #{order.id}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${
                      order.statusColor === 'green'
                        ? 'bg-green-100 text-green-700'
                        : order.statusColor === 'yellow'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  {new Date(order.date).toLocaleDateString('de-DE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
              </div>
              <button className="text-pink-600 hover:text-pink-700 text-sm">
                Details ansehen
              </button>
            </div>

            <div className="border-t pt-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-2">
                  <div>
                    <span className="text-gray-900">{item.name}</span>
                    <span className="text-gray-500 text-sm"> × {item.quantity}</span>
                  </div>
                  <span className="text-gray-900">€{item.price.toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t mt-2 pt-2 flex justify-between items-center">
                <span className="text-gray-900">Gesamt</span>
                <span className="text-xl text-pink-600">€{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Keine Bestellungen gefunden</p>
          </div>
        )}
      </div>
    </div>
  );
}
