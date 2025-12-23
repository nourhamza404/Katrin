import { useState, useEffect } from 'react';
import { User, MapPin, Package, Settings, Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface CustomerPortalProps {
  currentUser: any;
  onLogin: () => void;
}

interface Address {
  id: string;
  firstName: string;
  lastName: string;
  street: string;
  houseNumber: string;
  zipCode: string;
  city: string;
  isDefault: boolean;
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  total: number;
  items: any[];
  delivery_info: any;
  type: 'shop' | 'custom';
  cake_type?: string;
  size?: string;
  flavor?: string;
  delivery_date?: string;
}

export default function CustomerPortal({ currentUser, onLogin }: CustomerPortalProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile');
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      loadUserData();
    }
  }, [currentUser]);

  const loadUserData = async () => {
    setIsLoading(true);
    try {
      // Load orders
      if (currentUser.email) {
        const ordersResponse = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-48cde07a/orders/user/${encodeURIComponent(currentUser.email)}`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        );

        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json();
          setOrders(ordersData.orders || []);
        }
      }

      // Load addresses from localStorage for now
      const savedAddresses = localStorage.getItem(`addresses_${currentUser.id}`);
      if (savedAddresses) {
        setAddresses(JSON.parse(savedAddresses));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending_review':
        return 'bg-yellow-100 text-yellow-700';
      case 'approved':
        return 'bg-blue-100 text-blue-700';
      case 'in_preparation':
        return 'bg-purple-100 text-purple-700';
      case 'ready':
        return 'bg-green-100 text-green-700';
      case 'delivered':
        return 'bg-gray-100 text-gray-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending_review':
        return 'Wird geprüft';
      case 'approved':
        return 'Bestätigt';
      case 'in_preparation':
        return 'In Vorbereitung';
      case 'ready':
        return 'Fertig';
      case 'delivered':
        return 'Geliefert';
      case 'cancelled':
        return 'Storniert';
      default:
        return status;
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 flex items-center justify-center px-4">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-gray-900 mb-2">Kundenportal</h2>
          <p className="text-gray-600 mb-6">
            Bitte melden Sie sich an, um Ihr Kundenportal zu nutzen.
          </p>
          <button
            onClick={onLogin}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
          >
            Jetzt anmelden
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">Mein Kundenportal</h1>
          <p className="text-gray-600">Willkommen zurück, {currentUser.name}!</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <User className="w-5 h-5" />
            Profil
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Package className="w-5 h-5" />
            Bestellungen
            {orders.length > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === 'orders' ? 'bg-white text-pink-500' : 'bg-pink-100 text-pink-700'
              }`}>
                {orders.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`px-6 py-3 rounded-xl font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'addresses'
                ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <MapPin className="w-5 h-5" />
            Adressen
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
          </div>
        ) : (
          <>
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-xl p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-gray-900">Profil-Informationen</h2>
                    <p className="text-gray-600">Ihre persönlichen Daten</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Name</label>
                    <p className="text-gray-900 font-medium">{currentUser.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">E-Mail</label>
                    <p className="text-gray-900 font-medium">{currentUser.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Mitglied seit</label>
                    <p className="text-gray-900 font-medium">
                      {new Date().toLocaleDateString('de-DE')}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {orders.length === 0 ? (
                  <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-gray-900 mb-2">Noch keine Bestellungen</h3>
                    <p className="text-gray-600">
                      Entdecken Sie unsere leckeren Produkte!
                    </p>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white rounded-3xl shadow-xl p-6"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-gray-900 font-medium">
                              {order.type === 'shop' ? 'Shop-Bestellung' : 'Individuelle Bestellung'} #{order.id.slice(-8)}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {getStatusText(order.status)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {new Date(order.created_at).toLocaleDateString('de-DE', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        {order.type === 'shop' && order.total && (
                          <div className="text-right">
                            <p className="text-gray-600 text-sm mb-1">Gesamt</p>
                            <p className="text-pink-500 font-medium">
                              {order.total.toFixed(2)} €
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="border-t border-gray-200 pt-4">
                        {order.type === 'shop' && order.items ? (
                          <>
                            <p className="text-sm text-gray-600 mb-3">Artikel:</p>
                            <div className="space-y-2">
                              {order.items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex justify-between text-sm"
                                >
                                  <span className="text-gray-700">
                                    {item.quantity}x {item.name}
                                  </span>
                                  <span className="text-gray-900 font-medium">
                                    {(item.price * item.quantity).toFixed(2)} €
                                  </span>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <>
                            <p className="text-sm text-gray-600 mb-3">Details:</p>
                            <div className="space-y-2">
                              {order.cake_type && (
                                <p className="text-sm text-gray-700">
                                  <span className="font-medium">Typ:</span> {order.cake_type}
                                </p>
                              )}
                              {order.size && (
                                <p className="text-sm text-gray-700">
                                  <span className="font-medium">Größe:</span> {order.size}
                                </p>
                              )}
                              {order.flavor && (
                                <p className="text-sm text-gray-700">
                                  <span className="font-medium">Geschmack:</span> {order.flavor}
                                </p>
                              )}
                              {order.delivery_date && (
                                <p className="text-sm text-gray-700">
                                  <span className="font-medium">Wunschtermin:</span> {new Date(order.delivery_date).toLocaleDateString('de-DE')}
                                </p>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {addresses.length === 0 ? (
                  <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
                    <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-gray-900 mb-2">Keine Adressen gespeichert</h3>
                    <p className="text-gray-600 mb-6">
                      Fügen Sie eine Lieferadresse hinzu
                    </p>
                    <button className="px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto">
                      <Plus className="w-5 h-5" />
                      Adresse hinzufügen
                    </button>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className="bg-white rounded-3xl shadow-xl p-6"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-gray-900 font-medium mb-1">
                              {address.firstName} {address.lastName}
                            </h3>
                            {address.isDefault && (
                              <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
                                Standard
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>
                            {address.street} {address.houseNumber}
                          </p>
                          <p>
                            {address.zipCode} {address.city}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}