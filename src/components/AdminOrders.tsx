import { useState, useEffect } from 'react';
import { ShoppingBag, Package, Clock, CheckCircle, XCircle, Eye, Loader2, TrendingUp, Calendar, User, Mail, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Order {
  id: string;
  type: 'shop' | 'custom';
  user_email: string;
  user_id: string | null;
  status: 'pending_review' | 'accepted' | 'rejected' | 'in_progress' | 'completed';
  created_at: string;
  
  // Shop order fields
  items?: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  delivery_info?: any;
  payment_method?: string;
  total?: number;
  
  // Custom order fields
  cake_type?: string;
  flavor?: string;
  size?: string;
  layers?: string;
  filling?: string;
  occasion?: string;
  design_description?: string;
  colors?: string;
  decoration?: string;
  allergies?: string;
  special_wishes?: string;
  delivery_method?: string;
  delivery_date?: string;
  delivery_address?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
}

interface AdminOrdersProps {
  currentUser: any;
}

export default function AdminOrders({ currentUser }: AdminOrdersProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending_review' | 'accepted' | 'rejected' | 'in_progress' | 'completed'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const ADMIN_EMAIL = 'nourhamza221@gmail.com';
  const isAdmin = currentUser?.email === ADMIN_EMAIL;

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-48cde07a/orders`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load orders');
      }

      const data = await response.json();
      // Sort by created_at (newest first)
      const sortedOrders = (data.orders || []).sort((a: Order, b: Order) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
      setOrders(sortedOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error('Fehler beim Laden der Bestellungen');
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: 'accepted' | 'rejected' | 'in_progress' | 'completed') => {
    try {
      setIsUpdating(true);
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-48cde07a/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      toast.success(`Bestellung ${newStatus === 'accepted' ? 'akzeptiert' : newStatus === 'rejected' ? 'abgelehnt' : 'aktualisiert'}!`);
      loadOrders();
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Fehler beim Aktualisieren der Bestellung');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, { bg: string; text: string; icon: any }> = {
      pending_review: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
      accepted: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
      rejected: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle },
      in_progress: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Package },
      completed: { bg: 'bg-gray-100', text: 'text-gray-700', icon: CheckCircle },
    };

    const style = styles[status] || styles.pending_review;
    const Icon = style.icon;

    const labels: Record<string, string> = {
      pending_review: 'Zur Prüfung',
      accepted: 'Akzeptiert',
      rejected: 'Abgelehnt',
      in_progress: 'In Bearbeitung',
      completed: 'Abgeschlossen',
    };

    return (
      <span className={`px-3 py-1 ${style.bg} ${style.text} rounded-full text-sm font-medium flex items-center gap-1 w-fit`}>
        <Icon className="w-4 h-4" />
        {labels[status]}
      </span>
    );
  };

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  const statsCards = [
    {
      label: 'Gesamt',
      value: orders.length,
      icon: ShoppingBag,
      color: 'from-pink-500 to-rose-500',
    },
    {
      label: 'Zur Prüfung',
      value: orders.filter(o => o.status === 'pending_review').length,
      icon: Clock,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      label: 'Akzeptiert',
      value: orders.filter(o => o.status === 'accepted').length,
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
    },
    {
      label: 'In Bearbeitung',
      value: orders.filter(o => o.status === 'in_progress').length,
      icon: Package,
      color: 'from-blue-500 to-cyan-500',
    },
  ];

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Keine Berechtigung für diesen Bereich.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-gray-900">Bestellverwaltung</h1>
              <p className="text-gray-600">Alle Bestellungen und Anfragen verwalten</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {[
            { value: 'all', label: 'Alle' },
            { value: 'pending_review', label: 'Zur Prüfung' },
            { value: 'accepted', label: 'Akzeptiert' },
            { value: 'in_progress', label: 'In Bearbeitung' },
            { value: 'completed', label: 'Abgeschlossen' },
            { value: 'rejected', label: 'Abgelehnt' },
          ].map(filter => (
            <button
              key={filter.value}
              onClick={() => setStatusFilter(filter.value as any)}
              className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                statusFilter === filter.value
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-gray-900">
              {statusFilter === 'all' ? 'Alle Bestellungen' : `Gefilterte Bestellungen`} ({filteredOrders.length})
            </h2>
          </div>

          {isLoading ? (
            <div className="p-12 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-pink-500 mx-auto mb-3" />
              <p className="text-gray-600">Bestellungen werden geladen...</p>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="p-12 text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">Keine Bestellungen gefunden</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          order.type === 'shop' ? 'bg-blue-100' : 'bg-purple-100'
                        }`}>
                          {order.type === 'shop' ? (
                            <ShoppingBag className="w-6 h-6 text-blue-600" />
                          ) : (
                            <Package className="w-6 h-6 text-purple-600" />
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-gray-900 font-medium">
                              {order.type === 'shop' ? 'Shop-Bestellung' : 'Individuelle Bestellung'}
                            </h3>
                            {getStatusBadge(order.status)}
                          </div>
                          
                          <div className="space-y-1 text-sm text-gray-600">
                            <p className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              {order.user_email || order.contact_email}
                            </p>
                            {(order.contact_name || order.delivery_info?.firstName) && (
                              <p className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                {order.contact_name || `${order.delivery_info?.firstName} ${order.delivery_info?.lastName}`}
                              </p>
                            )}
                            {(order.contact_phone || order.delivery_info?.phone) && (
                              <p className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                {order.contact_phone || order.delivery_info?.phone}
                              </p>
                            )}
                            <p className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {new Date(order.created_at).toLocaleDateString('de-DE', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </p>
                          </div>

                          {/* Order Preview */}
                          <div className="mt-3 p-3 bg-gray-50 rounded-xl">
                            {order.type === 'shop' ? (
                              <div>
                                <p className="text-sm text-gray-700 font-medium mb-2">
                                  {order.items?.length} Artikel
                                </p>
                                <div className="space-y-1">
                                  {order.items?.slice(0, 2).map((item, idx) => (
                                    <p key={idx} className="text-sm text-gray-600">
                                      {item.quantity}x {item.name} - {item.price.toFixed(2)} €
                                    </p>
                                  ))}
                                  {(order.items?.length || 0) > 2 && (
                                    <p className="text-sm text-gray-500">
                                      +{(order.items?.length || 0) - 2} weitere...
                                    </p>
                                  )}
                                </div>
                                <p className="text-sm font-medium text-gray-900 mt-2">
                                  Gesamt: {order.total?.toFixed(2)} €
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-1">
                                <p className="text-sm text-gray-700">
                                  <span className="font-medium">Typ:</span> {order.cake_type}
                                </p>
                                <p className="text-sm text-gray-700">
                                  <span className="font-medium">Größe:</span> {order.size}
                                </p>
                                <p className="text-sm text-gray-700">
                                  <span className="font-medium">Geschmack:</span> {order.flavor}
                                </p>
                                {order.delivery_date && (
                                  <p className="text-sm text-gray-700">
                                    <span className="font-medium">Termin:</span> {new Date(order.delivery_date).toLocaleDateString('de-DE')}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                        title="Details anzeigen"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      
                      {order.status === 'pending_review' && (
                        <>
                          <button
                            onClick={() => updateOrderStatus(order.id, 'accepted')}
                            disabled={isUpdating}
                            className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors disabled:opacity-50"
                            title="Akzeptieren"
                          >
                            <CheckCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => updateOrderStatus(order.id, 'rejected')}
                            disabled={isUpdating}
                            className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors disabled:opacity-50"
                            title="Ablehnen"
                          >
                            <XCircle className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Order Detail Modal */}
        <AnimatePresence>
          {selectedOrder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl text-gray-900 mb-1">Bestelldetails</h2>
                    <p className="text-sm text-gray-500">Bestell-ID: {selectedOrder.id}</p>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <XCircle className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6">
                  {/* Status */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Status</h3>
                    {getStatusBadge(selectedOrder.status)}
                  </div>

                  {/* Customer Info */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Kundeninformationen</h3>
                    <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                      <p className="flex items-center gap-2 text-sm text-gray-700">
                        <User className="w-4 h-4" />
                        {selectedOrder.contact_name || `${selectedOrder.delivery_info?.firstName} ${selectedOrder.delivery_info?.lastName}` || 'Nicht angegeben'}
                      </p>
                      <p className="flex items-center gap-2 text-sm text-gray-700">
                        <Mail className="w-4 h-4" />
                        {selectedOrder.user_email || selectedOrder.contact_email}
                      </p>
                      <p className="flex items-center gap-2 text-sm text-gray-700">
                        <Phone className="w-4 h-4" />
                        {selectedOrder.contact_phone || selectedOrder.delivery_info?.phone || 'Nicht angegeben'}
                      </p>
                      <p className="flex items-center gap-2 text-sm text-gray-700">
                        <Calendar className="w-4 h-4" />
                        Bestellt am: {new Date(selectedOrder.created_at).toLocaleDateString('de-DE', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Order Details */}
                  {selectedOrder.type === 'shop' ? (
                    <>
                      {/* Shop Order Items */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Bestellte Produkte</h3>
                        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                          {selectedOrder.items?.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center pb-2 border-b border-gray-200 last:border-0 last:pb-0">
                              <div>
                                <p className="font-medium text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-600">Menge: {item.quantity}</p>
                              </div>
                              <p className="font-medium text-gray-900">{(item.price * item.quantity).toFixed(2)} €</p>
                            </div>
                          ))}
                          <div className="pt-3 border-t-2 border-gray-300 flex justify-between items-center">
                            <p className="font-bold text-gray-900">Gesamt</p>
                            <p className="font-bold text-gray-900 text-lg">{selectedOrder.total?.toFixed(2)} €</p>
                          </div>
                        </div>
                      </div>

                      {/* Delivery Info */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Lieferinformationen</h3>
                        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Methode:</span> {selectedOrder.delivery_info?.deliveryMethod === 'delivery' ? 'Lieferung' : 'Abholung'}
                          </p>
                          {selectedOrder.delivery_info?.deliveryMethod === 'delivery' && (
                            <p className="flex items-start gap-2 text-sm text-gray-700">
                              <MapPin className="w-4 h-4 mt-0.5" />
                              {selectedOrder.delivery_info?.street} {selectedOrder.delivery_info?.houseNumber}, {selectedOrder.delivery_info?.zipCode} {selectedOrder.delivery_info?.city}
                            </p>
                          )}
                          {selectedOrder.delivery_info?.deliveryDate && (
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Datum:</span> {new Date(selectedOrder.delivery_info.deliveryDate).toLocaleDateString('de-DE')}
                            </p>
                          )}
                          {selectedOrder.delivery_info?.deliveryTime && (
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Zeit:</span> {selectedOrder.delivery_info.deliveryTime}
                            </p>
                          )}
                          {selectedOrder.delivery_info?.notes && (
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Anmerkungen:</span> {selectedOrder.delivery_info.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Custom Order Details */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Produktdetails</h3>
                        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Typ:</span> {selectedOrder.cake_type}
                          </p>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Größe:</span> {selectedOrder.size}
                          </p>
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Geschmack:</span> {selectedOrder.flavor}
                          </p>
                          {selectedOrder.filling && (
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Füllung:</span> {selectedOrder.filling}
                            </p>
                          )}
                          {selectedOrder.layers && (
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Schichten:</span> {selectedOrder.layers}
                            </p>
                          )}
                          {selectedOrder.occasion && (
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Anlass:</span> {selectedOrder.occasion}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Design Details */}
                      {(selectedOrder.colors || selectedOrder.decoration || selectedOrder.design_description) && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-700 mb-3">Design</h3>
                          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                            {selectedOrder.colors && (
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">Farben:</span> {selectedOrder.colors}
                              </p>
                            )}
                            {selectedOrder.decoration && (
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">Dekoration:</span> {selectedOrder.decoration}
                              </p>
                            )}
                            {selectedOrder.design_description && (
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">Beschreibung:</span> {selectedOrder.design_description}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Special Requests */}
                      {(selectedOrder.allergies || selectedOrder.special_wishes) && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-700 mb-3">Besondere Hinweise</h3>
                          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                            {selectedOrder.allergies && (
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">Allergien:</span> {selectedOrder.allergies}
                              </p>
                            )}
                            {selectedOrder.special_wishes && (
                              <p className="text-sm text-gray-700">
                                <span className="font-medium">Wünsche:</span> {selectedOrder.special_wishes}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Delivery Info */}
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Lieferung/Abholung</h3>
                        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                          <p className="text-sm text-gray-700">
                            <span className="font-medium">Methode:</span> {selectedOrder.delivery_method === 'delivery' ? 'Lieferung' : 'Abholung'}
                          </p>
                          {selectedOrder.delivery_date && (
                            <p className="text-sm text-gray-700">
                              <span className="font-medium">Wunschtermin:</span> {new Date(selectedOrder.delivery_date).toLocaleDateString('de-DE')}
                            </p>
                          )}
                          {selectedOrder.delivery_address && selectedOrder.delivery_method === 'delivery' && (
                            <p className="flex items-start gap-2 text-sm text-gray-700">
                              <MapPin className="w-4 h-4 mt-0.5" />
                              {selectedOrder.delivery_address}
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Action Buttons */}
                  {selectedOrder.status === 'pending_review' && (
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => updateOrderStatus(selectedOrder.id, 'accepted')}
                        disabled={isUpdating}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium hover:from-green-600 hover:to-emerald-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isUpdating ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            Akzeptieren
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => updateOrderStatus(selectedOrder.id, 'rejected')}
                        disabled={isUpdating}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl font-medium hover:from-red-600 hover:to-rose-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isUpdating ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <XCircle className="w-5 h-5" />
                            Ablehnen
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {selectedOrder.status === 'accepted' && (
                    <div className="pt-4 border-t border-gray-200">
                      <button
                        onClick={() => updateOrderStatus(selectedOrder.id, 'in_progress')}
                        disabled={isUpdating}
                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isUpdating ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <Package className="w-5 h-5" />
                            In Bearbeitung setzen
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {selectedOrder.status === 'in_progress' && (
                    <div className="pt-4 border-t border-gray-200">
                      <button
                        onClick={() => updateOrderStatus(selectedOrder.id, 'completed')}
                        disabled={isUpdating}
                        className="w-full px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-medium hover:from-gray-600 hover:to-gray-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isUpdating ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            Als abgeschlossen markieren
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
