import { useState } from 'react';
import { Mail, Package, Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function EmailPreviewPage() {
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<'order' | 'custom' | 'status'>('order');

  // Sample data for order confirmation email
  const orderEmailData = {
    customerName: 'Max Mustermann',
    orderId: 'order_1234567890_abc123',
    orderDate: new Date().toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    items: [
      { name: 'Schokoladen-Torte', quantity: 1, price: 45.00 },
      { name: 'Vanille Cupcakes (6 Stück)', quantity: 2, price: 18.00 },
      { name: 'Erdbeertorte', quantity: 1, price: 38.00 },
    ],
    total: 101.00,
    deliveryInfo: {
      name: 'Max Mustermann',
      address: 'Musterstraße 123',
      city: 'Berlin',
      postal_code: '10115',
      phone: '+49 123 456789',
      delivery_date: '15. Dezember 2025',
      delivery_time: '14:00 Uhr',
      notes: 'Bitte an der Haustür klingeln',
    },
    paymentMethod: 'cash',
  };

  // Sample data for custom order email
  const customOrderEmailData = {
    customerName: 'Anna Schmidt',
    orderId: 'custom_9876543210_xyz789',
    orderDate: new Date().toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    orderType: 'Individuelle Hochzeitstorte',
    customDetails: {
      flavor: 'Red Velvet',
      size: 'Groß (20-25 Personen)',
      filling: 'Cream Cheese Frosting',
      design_description: 'Dreistöckig mit weißen Rosen aus Fondant, Blattgold-Akzente, minimalistisch elegant',
      special_requests: 'Glutenfrei, mit essbaren Blüten dekoriert',
      occasion: 'Hochzeit',
    },
    deliveryInfo: {
      name: 'Anna Schmidt',
      email: 'anna.schmidt@example.com',
      phone: '+49 987 654321',
      delivery_date: '20. Januar 2026',
    },
  };

  // Sample data for status update email
  const statusUpdateEmailData = {
    customerName: 'Lisa Müller',
    orderId: 'order_5555555555_def456',
    oldStatus: 'pending_review',
    newStatus: 'in_production',
  };

  const getOrderConfirmationEmailHTML = () => {
    const itemsHtml = orderEmailData.items
      .map(
        (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #f0f0f0;">${item.name}</td>
        <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; text-align: right;">${item.price.toFixed(2)} €</td>
      </tr>
    `
      )
      .join('');

    return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bestellbestätigung - Katrin Sweets</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #ec4899 0%, #f97316 100%); padding: 40px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">🍰 Katrin Sweets</h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">Ihre Bestellung wurde erfolgreich aufgegeben!</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              
              <!-- Greeting -->
              <h2 style="margin: 0 0 20px 0; color: #333; font-size: 24px;">Hallo ${orderEmailData.customerName},</h2>
              <p style="margin: 0 0 30px 0; color: #666; font-size: 16px; line-height: 1.6;">
                Vielen Dank für Ihre Bestellung! Wir haben Ihre Anfrage erhalten und werden diese schnellstmöglich bearbeiten.
              </p>

              <!-- Order Details -->
              <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <h3 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">Bestelldetails</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666;">Bestellnummer:</td>
                    <td style="padding: 8px 0; color: #333; font-weight: bold; text-align: right;">${orderEmailData.orderId}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;">Bestelldatum:</td>
                    <td style="padding: 8px 0; color: #333; text-align: right;">${orderEmailData.orderDate}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;">Zahlungsmethode:</td>
                    <td style="padding: 8px 0; color: #333; text-align: right;">Barzahlung bei Lieferung</td>
                  </tr>
                </table>
              </div>

              <!-- Items Table -->
              <h3 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">Bestellte Artikel</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
                <thead>
                  <tr style="background-color: #f8f9fa;">
                    <th style="padding: 12px; text-align: left; color: #666; font-weight: 600; border-bottom: 2px solid #e0e0e0;">Artikel</th>
                    <th style="padding: 12px; text-align: center; color: #666; font-weight: 600; border-bottom: 2px solid #e0e0e0;">Menge</th>
                    <th style="padding: 12px; text-align: right; color: #666; font-weight: 600; border-bottom: 2px solid #e0e0e0;">Preis</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                  <tr style="background-color: #f8f9fa;">
                    <td colspan="2" style="padding: 15px; font-weight: bold; color: #333; border-top: 2px solid #e0e0e0;">Gesamt</td>
                    <td style="padding: 15px; font-weight: bold; color: #ec4899; text-align: right; font-size: 18px; border-top: 2px solid #e0e0e0;">${orderEmailData.total.toFixed(2)} €</td>
                  </tr>
                </tbody>
              </table>

              <!-- Delivery Info -->
              <h3 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">Lieferinformationen</h3>
              <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <p style="margin: 0 0 8px 0; color: #333; font-weight: bold;">${orderEmailData.deliveryInfo.name}</p>
                <p style="margin: 0 0 5px 0; color: #666;">${orderEmailData.deliveryInfo.address}</p>
                <p style="margin: 0 0 5px 0; color: #666;">${orderEmailData.deliveryInfo.postal_code} ${orderEmailData.deliveryInfo.city}</p>
                <p style="margin: 0 0 5px 0; color: #666;">Tel: ${orderEmailData.deliveryInfo.phone}</p>
                <p style="margin: 15px 0 5px 0; color: #ec4899; font-weight: bold;">Gewünschtes Lieferdatum: ${orderEmailData.deliveryInfo.delivery_date} um ${orderEmailData.deliveryInfo.delivery_time}</p>
                <p style="margin: 10px 0 0 0; color: #666; font-style: italic;">Hinweise: ${orderEmailData.deliveryInfo.notes}</p>
              </div>

              <!-- Next Steps -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px; padding: 15px; margin-bottom: 30px;">
                <h4 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">📋 Wie geht es weiter?</h4>
                <ol style="margin: 0; padding-left: 20px; color: #92400e;">
                  <li style="margin-bottom: 8px;">Wir prüfen Ihre Bestellung und melden uns bei Rückfragen</li>
                  <li style="margin-bottom: 8px;">Nach Bestätigung beginnen wir mit der Zubereitung</li>
                  <li style="margin-bottom: 8px;">Sie erhalten eine weitere E-Mail, wenn Ihre Bestellung fertig ist</li>
                  <li>Lieferung zum gewünschten Termin</li>
                </ol>
              </div>

              <!-- Contact -->
              <div style="text-align: center; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
                <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">Fragen zu Ihrer Bestellung?</p>
                <p style="margin: 0; color: #333; font-weight: bold;">📧 kontakt@katrinsweets.de | 📱 +49 123 456789</p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px 0; color: #999; font-size: 12px;">© 2025 Katrin Sweets - Handgemachte Torten & Cookies mit Liebe</p>
              <p style="margin: 0; color: #999; font-size: 12px;">Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese E-Mail.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
  };

  const getCustomOrderEmailHTML = () => {
    const detailsHtml = Object.entries(customOrderEmailData.customDetails)
      .map(
        ([key, value]) => `
      <tr>
        <td style="padding: 8px 0; color: #666; text-transform: capitalize;">${key.replace(/_/g, ' ')}:</td>
        <td style="padding: 8px 0; color: #333; font-weight: 500; text-align: right;">${value}</td>
      </tr>
    `
      )
      .join('');

    return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Anfrage-Bestätigung - Katrin Sweets</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%); padding: 40px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">✨ Katrin Sweets</h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.9;">Ihre individuelle Anfrage wurde erhalten!</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              
              <!-- Greeting -->
              <h2 style="margin: 0 0 20px 0; color: #333; font-size: 24px;">Hallo ${customOrderEmailData.customerName},</h2>
              <p style="margin: 0 0 30px 0; color: #666; font-size: 16px; line-height: 1.6;">
                Vielen Dank für Ihre individuelle Anfrage! Wir freuen uns sehr, dass Sie uns mit der Herstellung Ihrer Wunschtorte bzw. Ihrer Wunsch-Cookies betrauen möchten.
              </p>

              <!-- Order Details -->
              <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <h3 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">Anfragedetails</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #666;">Anfrage-Nummer:</td>
                    <td style="padding: 8px 0; color: #333; font-weight: bold; text-align: right;">${customOrderEmailData.orderId}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;">Datum:</td>
                    <td style="padding: 8px 0; color: #333; text-align: right;">${customOrderEmailData.orderDate}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #666;">Art:</td>
                    <td style="padding: 8px 0; color: #333; text-align: right; text-transform: capitalize;">${customOrderEmailData.orderType}</td>
                  </tr>
                </table>
              </div>

              <!-- Custom Details -->
              <h3 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">Ihre Wünsche</h3>
              <div style="background-color: #faf5ff; border: 2px solid #8b5cf6; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <table style="width: 100%; border-collapse: collapse;">
                  ${detailsHtml}
                </table>
              </div>

              <!-- Contact Info -->
              <h3 style="margin: 0 0 15px 0; color: #333; font-size: 18px;">Ihre Kontaktdaten</h3>
              <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <p style="margin: 0 0 8px 0; color: #333; font-weight: bold;">${customOrderEmailData.deliveryInfo.name}</p>
                <p style="margin: 0 0 5px 0; color: #666;">📧 ${customOrderEmailData.deliveryInfo.email}</p>
                <p style="margin: 0 0 5px 0; color: #666;">📱 ${customOrderEmailData.deliveryInfo.phone}</p>
                <p style="margin: 15px 0 0 0; color: #8b5cf6; font-weight: bold;">Gewünschter Termin: ${customOrderEmailData.deliveryInfo.delivery_date}</p>
              </div>

              <!-- Next Steps -->
              <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; border-radius: 4px; padding: 15px; margin-bottom: 30px;">
                <h4 style="margin: 0 0 10px 0; color: #1e40af; font-size: 16px;">🎨 Wie geht es weiter?</h4>
                <ol style="margin: 0; padding-left: 20px; color: #1e40af;">
                  <li style="margin-bottom: 8px;">Wir prüfen Ihre Anfrage und Ihre Wünsche im Detail</li>
                  <li style="margin-bottom: 8px;">Innerhalb von 24-48 Stunden melden wir uns bei Ihnen</li>
                  <li style="margin-bottom: 8px;">Wir erstellen ein individuelles Angebot mit Preis</li>
                  <li style="margin-bottom: 8px;">Nach Ihrer Bestätigung beginnen wir mit der Herstellung</li>
                  <li>Lieferung zum gewünschten Termin</li>
                </ol>
              </div>

              <!-- Important Note -->
              <div style="background-color: #fef3c7; border-radius: 8px; padding: 15px; margin-bottom: 30px;">
                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.6;">
                  <strong>💡 Hinweis:</strong> Bitte beachten Sie, dass dies zunächst nur eine Anfrage ist. Der finale Preis wird Ihnen nach Prüfung Ihrer Wünsche mitgeteilt. Erst nach Ihrer Bestätigung beginnen wir mit der Produktion.
                </p>
              </div>

              <!-- Contact -->
              <div style="text-align: center; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
                <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">Haben Sie noch Fragen oder möchten Sie etwas ergänzen?</p>
                <p style="margin: 0; color: #333; font-weight: bold;">📧 kontakt@katrinsweets.de | 📱 +49 123 456789</p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px 0; color: #999; font-size: 12px;">© 2025 Katrin Sweets - Handgemachte Torten & Cookies mit Liebe</p>
              <p style="margin: 0; color: #999; font-size: 12px;">Diese E-Mail wurde automatisch generiert. Bitte antworten Sie nicht direkt auf diese E-Mail.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
  };

  const getStatusUpdateEmailHTML = () => {
    const statusConfig: Record<string, { color: string; icon: string; title: string; message: string }> = {
      in_production: {
        color: '#3b82f6',
        icon: '👨‍🍳',
        title: 'In Produktion',
        message: 'Ihre Bestellung wird gerade mit viel Liebe zubereitet.',
      },
    };

    const config = statusConfig[statusUpdateEmailData.newStatus];

    return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Status-Update - Katrin Sweets</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 600px; max-width: 100%; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: ${config.color}; padding: 40px; text-align: center; border-radius: 12px 12px 0 0;">
              <div style="font-size: 64px; margin-bottom: 15px;">${config.icon}</div>
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">${config.title}</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              
              <h2 style="margin: 0 0 20px 0; color: #333; font-size: 24px;">Hallo ${statusUpdateEmailData.customerName},</h2>
              <p style="margin: 0 0 30px 0; color: #666; font-size: 16px; line-height: 1.6;">
                Der Status Ihrer Bestellung hat sich geändert.
              </p>

              <!-- Status Update Box -->
              <div style="background-color: #f8f9fa; border-radius: 8px; padding: 25px; margin-bottom: 30px; text-align: center;">
                <p style="margin: 0 0 10px 0; color: #999; font-size: 14px;">Bestellnummer: <strong>${statusUpdateEmailData.orderId}</strong></p>
                <div style="background-color: ${config.color}; color: white; padding: 15px 25px; border-radius: 8px; display: inline-block; margin: 10px 0;">
                  <p style="margin: 0; font-size: 18px; font-weight: bold;">${config.icon} ${config.title}</p>
                </div>
                <p style="margin: 20px 0 0 0; color: #666; font-size: 16px; line-height: 1.6;">${config.message}</p>
              </div>

              <!-- Contact -->
              <div style="text-align: center; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
                <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">Fragen zu Ihrer Bestellung?</p>
                <p style="margin: 0; color: #333; font-weight: bold;">📧 kontakt@katrinsweets.de | 📱 +49 123 456789</p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-radius: 0 0 12px 12px; border-top: 1px solid #e0e0e0;">
              <p style="margin: 0 0 10px 0; color: #999; font-size: 12px;">© 2025 Katrin Sweets - Handgemachte Torten & Cookies mit Liebe</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
  };

  const getCurrentEmailHTML = () => {
    switch (selectedTemplate) {
      case 'order':
        return getOrderConfirmationEmailHTML();
      case 'custom':
        return getCustomOrderEmailHTML();
      case 'status':
        return getStatusUpdateEmailHTML();
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Zurück
            </button>
            <h1 className="text-gray-900">E-Mail Vorschau</h1>
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Info Box */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-blue-900 mb-2">E-Mail-Templates Vorschau</h2>
              <p className="text-blue-800 text-sm leading-relaxed">
                Hier sehen Sie eine Vorschau aller E-Mail-Templates, die Ihre Kunden nach einer Bestellung erhalten. 
                Diese E-Mails werden automatisch versendet, sobald Sie eine Domain verifiziert haben.
              </p>
            </div>
          </div>
        </div>

        {/* Template Selector */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => setSelectedTemplate('order')}
            className={`p-6 rounded-2xl border-2 transition-all ${
              selectedTemplate === 'order'
                ? 'border-pink-500 bg-pink-50 shadow-lg scale-105'
                : 'border-gray-200 bg-white hover:border-pink-300'
            }`}
          >
            <Package className={`w-8 h-8 mb-3 ${selectedTemplate === 'order' ? 'text-pink-500' : 'text-gray-400'}`} />
            <h3 className={`mb-1 ${selectedTemplate === 'order' ? 'text-pink-600' : 'text-gray-700'}`}>
              Bestellbestätigung
            </h3>
            <p className="text-sm text-gray-500">
              E-Mail nach normaler Warenkorb-Bestellung
            </p>
          </button>

          <button
            onClick={() => setSelectedTemplate('custom')}
            className={`p-6 rounded-2xl border-2 transition-all ${
              selectedTemplate === 'custom'
                ? 'border-purple-500 bg-purple-50 shadow-lg scale-105'
                : 'border-gray-200 bg-white hover:border-purple-300'
            }`}
          >
            <Sparkles className={`w-8 h-8 mb-3 ${selectedTemplate === 'custom' ? 'text-purple-500' : 'text-gray-400'}`} />
            <h3 className={`mb-1 ${selectedTemplate === 'custom' ? 'text-purple-600' : 'text-gray-700'}`}>
              Individuelle Anfrage
            </h3>
            <p className="text-sm text-gray-500">
              E-Mail nach individueller Tortenbestellung
            </p>
          </button>

          <button
            onClick={() => setSelectedTemplate('status')}
            className={`p-6 rounded-2xl border-2 transition-all ${
              selectedTemplate === 'status'
                ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                : 'border-gray-200 bg-white hover:border-blue-300'
            }`}
          >
            <CheckCircle2 className={`w-8 h-8 mb-3 ${selectedTemplate === 'status' ? 'text-blue-500' : 'text-gray-400'}`} />
            <h3 className={`mb-1 ${selectedTemplate === 'status' ? 'text-blue-600' : 'text-gray-700'}`}>
              Status-Update
            </h3>
            <p className="text-sm text-gray-500">
              E-Mail bei Bestellstatus-Änderung
            </p>
          </button>
        </div>

        {/* Email Preview */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-4">
            <h2 className="text-white">
              {selectedTemplate === 'order' && '📧 Bestellbestätigung'}
              {selectedTemplate === 'custom' && '✨ Individuelle Anfrage-Bestätigung'}
              {selectedTemplate === 'status' && '🔔 Status-Update Benachrichtigung'}
            </h2>
          </div>
          
          <div className="p-8">
            <iframe
              srcDoc={getCurrentEmailHTML()}
              className="w-full border-0 rounded-xl shadow-inner"
              style={{ height: '800px', backgroundColor: '#f9f9f9' }}
              title="E-Mail Vorschau"
            />
          </div>
        </div>

        {/* Info Footer */}
        <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div>
              <h3 className="text-yellow-900 mb-2">Hinweis zur Domain-Verifizierung</h3>
              <p className="text-yellow-800 text-sm leading-relaxed mb-3">
                Aktuell werden E-Mails nur im Testmodus versendet (über Resend Free Plan). 
                Um echte E-Mails an Kunden zu versenden, müssen Sie:
              </p>
              <ol className="text-yellow-800 text-sm space-y-2 ml-4">
                <li>1. Eine Domain bei einem Anbieter (z.B. Namecheap, GoDaddy) kaufen</li>
                <li>2. Die Domain bei Resend verifizieren (DNS-Einträge hinzufügen)</li>
                <li>3. Die Absender-E-Mail in den E-Mail-Templates anpassen (z.B. shop@ihre-domain.de)</li>
              </ol>
              <p className="text-yellow-800 text-sm mt-3">
                Bis dahin werden E-Mail-Inhalte in der Browser-Konsole angezeigt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
