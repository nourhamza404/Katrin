// Email Templates for Katrin Sweets - Based on Figma Design

export interface OrderEmailData {
  customerName: string;
  customerEmail?: string;
  orderId: string;
  orderDate: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  deliveryInfo: {
    name: string;
    email?: string;
    address: string;
    city: string;
    postal_code: string;
    phone: string;
    delivery_date?: string;
    delivery_time?: string;
    delivery_method?: string;
    notes?: string;
  };
  paymentMethod: string;
}

export interface CustomOrderEmailData {
  customerName: string;
  orderId: string;
  orderDate: string;
  orderType: string;
  customDetails: {
    flavor?: string;
    size?: string;
    layers?: string;
    filling?: string;
    occasion?: string;
    design_description?: string;
    special_requests?: string;
  };
  deliveryInfo: {
    name: string;
    email: string;
    phone: string;
    delivery_date?: string;
  };
}

// Shop Order Confirmation Email
export function getOrderConfirmationEmail(data: OrderEmailData): string {
  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; font-family: Arimo, sans-serif; color: #364153;">${item.name}</td>
        <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; text-align: center; font-family: Arimo, sans-serif; color: #364153;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #f0f0f0; text-align: right; font-family: Arimo, sans-serif; color: #364153;">${item.price.toFixed(2)} €</td>
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
<body style="margin: 0; padding: 40px 0; font-family: Arimo, 'Arial', sans-serif; background-color: #f9fafb;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center">
        <table role="presentation" style="width: 608px; max-width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          
          <!-- Header with Pink Gradient -->
          <tr>
            <td style="background: linear-gradient(180deg, #e60076 0%, #f6339a 100%); padding: 32px; text-align: center;">
              <h1 style="margin: 0 0 8px 0; color: #ffffff; font-size: 16px; font-weight: normal; font-family: Arimo, sans-serif;">Anfrage Bestätigung</h1>
              <p style="margin: 0; color: #ffffff; font-size: 16px; opacity: 0.9; font-family: Arimo, sans-serif;">Vielen Dank für Ihre Bestellung!</p>
            </td>
          </tr>

          <!-- Content Area -->
          <tr>
            <td style="padding: 32px;">
              
              <!-- Greeting -->
              <p style="margin: 0 0 24px 0; color: #364153; font-size: 16px; font-family: Arimo, sans-serif;">Liebe/r ${data.customerName},</p>
              
              <!-- Thank you message -->
              <p style="margin: 0 0 24px 0; color: #364153; font-size: 16px; line-height: 24px; font-family: Arimo, sans-serif;">
                vielen Dank für Ihre Anfrage bei <span style="color: #e60076; font-weight: 500;">Katrin Sweets</span>! Wir haben Ihre Bestellung erfolgreich erhalten und werden diese nun sorgfältig prüfen.
              </p>

              <!-- Info Box with Icon -->
              <div style="background: linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #bedbff; border-radius: 16px; padding: 26px; margin-bottom: 24px;">
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="width: 32px; padding-right: 16px; vertical-align: top;">
                      <div style="width: 32px; height: 32px; background-color: #dbeafe; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M10 6V10L12.5 12.5M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z" stroke="#155DFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                    </td>
                    <td style="vertical-align: top;">
                      <p style="margin: 0; color: #1c398e; font-size: 16px; line-height: 26px; font-family: Arimo, sans-serif;">
                        Wir werden Ihre Anfrage innerhalb von 24 Stunden prüfen und Ihnen ein individuelles Angebot zusenden. Die Bestellung wird erst nach Ihrer Bestätigung verbindlich.
                      </p>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Order Details Box -->
              <div style="background-color: #f9fafb; border-radius: 10px; padding: 24px; margin-bottom: 24px;">
                <h3 style="margin: 0 0 16px 0; color: #1e2939; font-size: 16px; font-weight: normal; font-family: Arimo, sans-serif;">Ihre Bestelldetails:</h3>
                
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px;">
                  <tr>
                    <td style="padding: 4px 0; color: #4a5565; font-size: 16px; font-family: Arimo, sans-serif;">Bestellnummer:</td>
                    <td style="padding: 4px 0; color: #4a5565; font-size: 16px; text-align: right; font-family: Arimo, sans-serif;">${data.orderId}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #4a5565; font-size: 16px; font-family: Arimo, sans-serif;">Datum:</td>
                    <td style="padding: 4px 0; color: #4a5565; font-size: 16px; text-align: right; font-family: Arimo, sans-serif;">${data.orderDate}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #4a5565; font-size: 16px; font-family: Arimo, sans-serif;">Status:</td>
                    <td style="padding: 4px 0; text-align: right;">
                      <span style="background-color: #fef9c2; color: #894b00; padding: 2px 10px; border-radius: 20px; font-size: 16px; font-family: Arimo, sans-serif;">In Prüfung</span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Products Table -->
              <h3 style="margin: 0 0 12px 0; color: #1e2939; font-size: 16px; font-weight: normal; font-family: Arimo, sans-serif;">Bestellte Artikel:</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
                <thead>
                  <tr style="background-color: #f9fafb;">
                    <th style="padding: 12px; text-align: left; color: #4a5565; font-weight: 500; font-size: 16px; font-family: Arimo, sans-serif;">Artikel</th>
                    <th style="padding: 12px; text-align: center; color: #4a5565; font-weight: 500; font-size: 16px; font-family: Arimo, sans-serif;">Menge</th>
                    <th style="padding: 12px; text-align: right; color: #4a5565; font-weight: 500; font-size: 16px; font-family: Arimo, sans-serif;">Preis</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                  <tr style="background-color: #f9fafb;">
                    <td colspan="2" style="padding: 15px; font-weight: 500; color: #1e2939; font-size: 16px; font-family: Arimo, sans-serif;">Gesamt</td>
                    <td style="padding: 15px; font-weight: 500; color: #e60076; text-align: right; font-size: 18px; font-family: Arimo, sans-serif;">${data.total.toFixed(2)} €</td>
                  </tr>
                </tbody>
              </table>

              <!-- Delivery Info -->
              <h3 style="margin: 0 0 12px 0; color: #1e2939; font-size: 16px; font-weight: normal; font-family: Arimo, sans-serif;">Lieferinformationen:</h3>
              <div style="background-color: #f9fafb; border-radius: 10px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 5px 0; color: #1e2939; font-weight: 500; font-size: 16px; font-family: Arimo, sans-serif;">${data.deliveryInfo.name}</p>
                ${data.deliveryInfo.email ? `<p style="margin: 0 0 3px 0; color: #4a5565; font-size: 16px; font-family: Arimo, sans-serif;">📧 ${data.deliveryInfo.email}</p>` : ''}
                <p style="margin: 0 0 3px 0; color: #4a5565; font-size: 16px; font-family: Arimo, sans-serif;">${data.deliveryInfo.address}</p>
                <p style="margin: 0 0 3px 0; color: #4a5565; font-size: 16px; font-family: Arimo, sans-serif;">${data.deliveryInfo.postal_code} ${data.deliveryInfo.city}</p>
                <p style="margin: 0; color: #4a5565; font-size: 16px; font-family: Arimo, sans-serif;">Tel: ${data.deliveryInfo.phone}</p>
                ${data.deliveryInfo.delivery_date ? `<p style="margin: 15px 0 0 0; color: #e60076; font-weight: 500; font-size: 16px; font-family: Arimo, sans-serif;">Gewünschtes Lieferdatum: ${data.deliveryInfo.delivery_date}${data.deliveryInfo.delivery_time ? ` um ${data.deliveryInfo.delivery_time}` : ''}${data.deliveryInfo.delivery_method ? ` (${data.deliveryInfo.delivery_method})` : ''}</p>` : ''}
              </div>

              <!-- Status Tracking Info -->
              <p style="margin: 0 0 24px 0; color: #364153; font-size: 16px; line-height: 24px; font-family: Arimo, sans-serif;">
                Sie können den aktuellen Status Ihrer Anfrage jederzeit über den untenstehenden Button einsehen.
              </p>

              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td align="center">
                    <a href="https://YOUR_DOMAIN.com/profile" style="display: inline-block; background: linear-gradient(90deg, #e60076 0%, #f6339a 100%); color: #ffffff; text-decoration: none; padding: 12px 32px; border-radius: 24px; font-weight: 500; font-size: 16px; font-family: Arimo, sans-serif;">
                      Bestellstatus ansehen
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Additional Info -->
              <div style="background-color: #eff6ff; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 10px 0; color: #1e2939; font-size: 16px; font-family: Arimo, sans-serif; font-weight: 500;">📋 Wie geht es weiter?</p>
                <ol style="margin: 0; padding-left: 20px; color: #364153; font-size: 16px; line-height: 24px; font-family: Arimo, sans-serif;">
                  <li style="margin-bottom: 8px;">Wir prüfen Ihre Bestellung und melden uns bei Rückfragen</li>
                  <li style="margin-bottom: 8px;">Nach Bestätigung beginnen wir mit der Zubereitung</li>
                  <li style="margin-bottom: 8px;">Sie erhalten eine weitere E-Mail, wenn Ihre Bestellung fertig ist</li>
                  <li>Lieferung zum gewünschten Termin</li>
                </ol>
              </div>

              <!-- Contact -->
              <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; text-align: center;">
                <p style="margin: 0 0 8px 0; color: #4a5565; font-size: 14px; font-family: Arimo, sans-serif;">Haben Sie Fragen zu Ihrer Bestellung?</p>
                <p style="margin: 0; color: #1e2939; font-size: 16px; font-family: Arimo, sans-serif;">
                  📧 <a href="mailto:kontakt@katrinsweets.de" style="color: #e60076; text-decoration: none;">kontakt@katrinsweets.de</a> | 
                  📱 +49 123 456789
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px 0; color: #9ca3af; font-size: 12px; font-family: Arimo, sans-serif;">© 2025 Katrin Sweets - Handgemachte Torten & Cookies mit Liebe</p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px; font-family: Arimo, sans-serif;">Diese E-Mail wurde automatisch generiert.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Custom Order Confirmation Email
export function getCustomOrderConfirmationEmail(data: CustomOrderEmailData): string {
  const detailsHtml = Object.entries(data.customDetails)
    .filter(([_, value]) => value)
    .map(
      ([key, value]) => `
      <tr>
        <td style="padding: 4px 0; color: #4a5565; font-size: 16px; font-family: Arimo, sans-serif; text-transform: capitalize;">${key.replace(/_/g, ' ')}:</td>
        <td style="padding: 4px 0; color: #1e2939; font-size: 16px; text-align: right; font-family: Arimo, sans-serif; font-weight: 500;">${value}</td>
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
  <title>Individuelle Anfrage - Katrin Sweets</title>
</head>
<body style="margin: 0; padding: 40px 0; font-family: Arimo, 'Arial', sans-serif; background-color: #f9fafb;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center">
        <table role="presentation" style="width: 608px; max-width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          
          <!-- Header with Pink Gradient -->
          <tr>
            <td style="background: linear-gradient(180deg, #e60076 0%, #f6339a 100%); padding: 32px; text-align: center;">
              <h1 style="margin: 0 0 8px 0; color: #ffffff; font-size: 16px; font-weight: normal; font-family: Arimo, sans-serif;">Individuelle Anfrage Bestätigung</h1>
              <p style="margin: 0; color: #ffffff; font-size: 16px; opacity: 0.9; font-family: Arimo, sans-serif;">Vielen Dank für Ihre Anfrage!</p>
            </td>
          </tr>

          <!-- Content Area -->
          <tr>
            <td style="padding: 32px;">
              
              <!-- Greeting -->
              <p style="margin: 0 0 24px 0; color: #364153; font-size: 16px; font-family: Arimo, sans-serif;">Liebe/r ${data.customerName},</p>
              
              <!-- Thank you message -->
              <p style="margin: 0 0 24px 0; color: #364153; font-size: 16px; line-height: 24px; font-family: Arimo, sans-serif;">
                vielen Dank für Ihre individuelle Anfrage bei <span style="color: #e60076; font-weight: 500;">Katrin Sweets</span>! Wir haben Ihre Anfrage erfolgreich erhalten und freuen uns sehr, dass Sie uns mit der Herstellung Ihrer Wunschtorte bzw. Ihrer Wunsch-Cookies betrauen möchten.
              </p>

              <!-- Info Box with Icon -->
              <div style="background: linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #bedbff; border-radius: 16px; padding: 26px; margin-bottom: 24px;">
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="width: 32px; padding-right: 16px; vertical-align: top;">
                      <div style="width: 32px; height: 32px; background-color: #dbeafe; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M10 6V10L12.5 12.5M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10Z" stroke="#155DFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                    </td>
                    <td style="vertical-align: top;">
                      <p style="margin: 0; color: #1c398e; font-size: 16px; line-height: 26px; font-family: Arimo, sans-serif;">
                        Wir werden Ihre Anfrage innerhalb von 24-48 Stunden prüfen und Ihnen ein individuelles Angebot mit Preis zusenden. Die Bestellung wird erst nach Ihrer Bestätigung verbindlich.
                      </p>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Order Details Box -->
              <div style="background-color: #f9fafb; border-radius: 10px; padding: 24px; margin-bottom: 24px;">
                <h3 style="margin: 0 0 16px 0; color: #1e2939; font-size: 16px; font-weight: normal; font-family: Arimo, sans-serif;">Ihre Anfragedetails:</h3>
                
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px;">
                  <tr>
                    <td style="padding: 4px 0; color: #4a5565; font-size: 16px; font-family: Arimo, sans-serif;">Anfrage-Nummer:</td>
                    <td style="padding: 4px 0; color: #4a5565; font-size: 16px; text-align: right; font-family: Arimo, sans-serif;">${data.orderId}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #4a5565; font-size: 16px; font-family: Arimo, sans-serif;">Datum:</td>
                    <td style="padding: 4px 0; color: #4a5565; font-size: 16px; text-align: right; font-family: Arimo, sans-serif;">${data.orderDate}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #4a5565; font-size: 16px; font-family: Arimo, sans-serif;">Art:</td>
                    <td style="padding: 4px 0; color: #4a5565; font-size: 16px; text-align: right; font-family: Arimo, sans-serif; text-transform: capitalize;">${data.orderType}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #4a5565; font-size: 16px; font-family: Arimo, sans-serif;">Status:</td>
                    <td style="padding: 4px 0; text-align: right;">
                      <span style="background-color: #fef9c2; color: #894b00; padding: 2px 10px; border-radius: 20px; font-size: 16px; font-family: Arimo, sans-serif;">In Prüfung</span>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Custom Details -->
              <h3 style="margin: 0 0 12px 0; color: #1e2939; font-size: 16px; font-weight: normal; font-family: Arimo, sans-serif;">Ihre Wünsche:</h3>
              <div style="background-color: #faf5ff; border: 2px solid #e9d5ff; border-radius: 10px; padding: 20px; margin-bottom: 24px;">
                <table style="width: 100%; border-collapse: collapse;">
                  ${detailsHtml}
                </table>
              </div>

              <!-- Contact Info -->
              <h3 style="margin: 0 0 12px 0; color: #1e2939; font-size: 16px; font-weight: normal; font-family: Arimo, sans-serif;">Ihre Kontaktdaten:</h3>
              <div style="background-color: #f9fafb; border-radius: 10px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 5px 0; color: #1e2939; font-weight: 500; font-size: 16px; font-family: Arimo, sans-serif;">${data.deliveryInfo.name}</p>
                <p style="margin: 0 0 3px 0; color: #4a5565; font-size: 16px; font-family: Arimo, sans-serif;">📧 ${data.deliveryInfo.email}</p>
                <p style="margin: 0; color: #4a5565; font-size: 16px; font-family: Arimo, sans-serif;">📱 ${data.deliveryInfo.phone}</p>
                ${data.deliveryInfo.delivery_date ? `<p style="margin: 15px 0 0 0; color: #e60076; font-weight: 500; font-size: 16px; font-family: Arimo, sans-serif;">Gewünschter Termin: ${data.deliveryInfo.delivery_date}</p>` : ''}
              </div>

              <!-- Status Tracking Info -->
              <p style="margin: 0 0 24px 0; color: #364153; font-size: 16px; line-height: 24px; font-family: Arimo, sans-serif;">
                Sie können den aktuellen Status Ihrer Anfrage jederzeit über den untenstehenden Button einsehen.
              </p>

              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td align="center">
                    <a href="https://YOUR_DOMAIN.com/profile" style="display: inline-block; background: linear-gradient(90deg, #e60076 0%, #f6339a 100%); color: #ffffff; text-decoration: none; padding: 12px 32px; border-radius: 24px; font-weight: 500; font-size: 16px; font-family: Arimo, sans-serif;">
                      Anfragestatus ansehen
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Additional Info -->
              <div style="background-color: #eff6ff; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 10px 0; color: #1e2939; font-size: 16px; font-family: Arimo, sans-serif; font-weight: 500;">🎨 Wie geht es weiter?</p>
                <ol style="margin: 0; padding-left: 20px; color: #364153; font-size: 16px; line-height: 24px; font-family: Arimo, sans-serif;">
                  <li style="margin-bottom: 8px;">Wir prüfen Ihre Anfrage und Ihre Wünsche im Detail</li>
                  <li style="margin-bottom: 8px;">Innerhalb von 24-48 Stunden melden wir uns bei Ihnen</li>
                  <li style="margin-bottom: 8px;">Wir erstellen ein individuelles Angebot mit Preis</li>
                  <li style="margin-bottom: 8px;">Nach Ihrer Bestätigung beginnen wir mit der Herstellung</li>
                  <li>Lieferung zum gewünschten Termin</li>
                </ol>
              </div>

              <!-- Important Note -->
              <div style="background-color: #fef9c2; border-left: 4px solid #f59e0b; border-radius: 4px; padding: 15px; margin-bottom: 24px;">
                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 22px; font-family: Arimo, sans-serif;">
                  <strong>💡 Hinweis:</strong> Bitte beachten Sie, dass dies zunächst nur eine Anfrage ist. Der finale Preis wird Ihnen nach Prüfung Ihrer Wünsche mitgeteilt. Erst nach Ihrer Bestätigung beginnen wir mit der Produktion.
                </p>
              </div>

              <!-- Contact -->
              <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; text-align: center;">
                <p style="margin: 0 0 8px 0; color: #4a5565; font-size: 14px; font-family: Arimo, sans-serif;">Haben Sie Fragen oder möchten Sie etwas ergänzen?</p>
                <p style="margin: 0; color: #1e2939; font-size: 16px; font-family: Arimo, sans-serif;">
                  📧 <a href="mailto:kontakt@katrinsweets.de" style="color: #e60076; text-decoration: none;">kontakt@katrinsweets.de</a> | 
                  📱 +49 123 456789
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px 0; color: #9ca3af; font-size: 12px; font-family: Arimo, sans-serif;">© 2025 Katrin Sweets - Handgemachte Torten & Cookies mit Liebe</p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px; font-family: Arimo, sans-serif;">Diese E-Mail wurde automatisch generiert.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// Order Status Update Email
export function getOrderStatusUpdateEmail(
  customerName: string,
  orderId: string,
  oldStatus: string,
  newStatus: string
): string {
  const statusConfig: Record<string, { color: string; bgColor: string; icon: string; title: string; message: string; badge: string }> = {
    pending_review: {
      color: '#894b00',
      bgColor: '#fef9c2',
      icon: '⏳',
      title: 'Bestellung wird geprüft',
      message: 'Wir prüfen Ihre Bestellung und melden uns bald bei Ihnen.',
      badge: 'In Prüfung'
    },
    approved: {
      color: '#065f46',
      bgColor: '#d1fae5',
      icon: '✅',
      title: 'Bestellung bestätigt',
      message: 'Ihre Bestellung wurde bestätigt und wir beginnen mit der Zubereitung!',
      badge: 'Bestätigt'
    },
    in_production: {
      color: '#1e40af',
      bgColor: '#dbeafe',
      icon: '👨‍🍳',
      title: 'In Produktion',
      message: 'Ihre Bestellung wird gerade mit viel Liebe zubereitet.',
      badge: 'In Herstellung'
    },
    ready: {
      color: '#5b21b6',
      bgColor: '#ede9fe',
      icon: '🎉',
      title: 'Bereit zur Lieferung',
      message: 'Ihre Bestellung ist fertig und bereit für die Lieferung!',
      badge: 'Bereit'
    },
    delivered: {
      color: '#be185d',
      bgColor: '#fce7f3',
      icon: '🚚',
      title: 'Ausgeliefert',
      message: 'Ihre Bestellung wurde erfolgreich ausgeliefert. Guten Appetit!',
      badge: 'Ausgeliefert'
    },
    cancelled: {
      color: '#991b1b',
      bgColor: '#fee2e2',
      icon: '❌',
      title: 'Bestellung storniert',
      message: 'Ihre Bestellung wurde storniert. Bei Fragen kontaktieren Sie uns bitte.',
      badge: 'Storniert'
    },
  };

  const config = statusConfig[newStatus] || statusConfig.pending_review;

  return `
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Status-Update - Katrin Sweets</title>
</head>
<body style="margin: 0; padding: 40px 0; font-family: Arimo, 'Arial', sans-serif; background-color: #f9fafb;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center">
        <table role="presentation" style="width: 608px; max-width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          
          <!-- Header with Pink Gradient -->
          <tr>
            <td style="background: linear-gradient(180deg, #e60076 0%, #f6339a 100%); padding: 32px; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 10px;">${config.icon}</div>
              <h1 style="margin: 0; color: #ffffff; font-size: 18px; font-weight: normal; font-family: Arimo, sans-serif;">${config.title}</h1>
            </td>
          </tr>

          <!-- Content Area -->
          <tr>
            <td style="padding: 32px;">
              
              <!-- Greeting -->
              <p style="margin: 0 0 24px 0; color: #364153; font-size: 16px; font-family: Arimo, sans-serif;">Liebe/r ${customerName},</p>
              
              <!-- Status message -->
              <p style="margin: 0 0 24px 0; color: #364153; font-size: 16px; line-height: 24px; font-family: Arimo, sans-serif;">
                Der Status Ihrer Bestellung bei <span style="color: #e60076; font-weight: 500;">Katrin Sweets</span> hat sich geändert.
              </p>

              <!-- Status Update Box -->
              <div style="background-color: #f9fafb; border-radius: 10px; padding: 24px; margin-bottom: 24px; text-align: center;">
                <p style="margin: 0 0 12px 0; color: #4a5565; font-size: 14px; font-family: Arimo, sans-serif;">Bestellnummer: <strong>${orderId}</strong></p>
                <div style="display: inline-block; background-color: ${config.bgColor}; color: ${config.color}; padding: 8px 20px; border-radius: 24px; font-size: 16px; font-family: Arimo, sans-serif; font-weight: 500; margin: 10px 0;">
                  ${config.icon} ${config.badge}
                </div>
                <p style="margin: 20px 0 0 0; color: #364153; font-size: 16px; line-height: 24px; font-family: Arimo, sans-serif;">${config.message}</p>
              </div>

              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td align="center">
                    <a href="https://YOUR_DOMAIN.com/profile" style="display: inline-block; background: linear-gradient(90deg, #e60076 0%, #f6339a 100%); color: #ffffff; text-decoration: none; padding: 12px 32px; border-radius: 24px; font-weight: 500; font-size: 16px; font-family: Arimo, sans-serif;">
                      Bestellung im Portal ansehen
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Info Box -->
              <div style="background: linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #bedbff; border-radius: 16px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0; color: #1c398e; font-size: 16px; line-height: 26px; font-family: Arimo, sans-serif; text-align: center;">
                  Verfolgen Sie Ihre Bestellung jederzeit in Echtzeit über das Kundenportal.
                </p>
              </div>

              <!-- Contact -->
              <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; text-align: center;">
                <p style="margin: 0 0 8px 0; color: #4a5565; font-size: 14px; font-family: Arimo, sans-serif;">Fragen zu Ihrer Bestellung?</p>
                <p style="margin: 0; color: #1e2939; font-size: 16px; font-family: Arimo, sans-serif;">
                  📧 <a href="mailto:kontakt@katrinsweets.de" style="color: #e60076; text-decoration: none;">kontakt@katrinsweets.de</a> | 
                  📱 +49 123 456789
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px 0; color: #9ca3af; font-size: 12px; font-family: Arimo, sans-serif;">© 2025 Katrin Sweets - Handgemachte Torten & Cookies mit Liebe</p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px; font-family: Arimo, sans-serif;">Diese E-Mail wurde automatisch generiert.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}