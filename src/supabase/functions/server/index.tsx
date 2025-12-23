import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';
import {
  getOrderConfirmationEmail,
  getCustomOrderConfirmationEmail,
  getOrderStatusUpdateEmail,
  type OrderEmailData,
  type CustomOrderEmailData,
} from './email-templates.tsx';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger(console.log));

// Create Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

// Health check
app.get('/make-server-48cde07a/health', (c) => {
  return c.json({ status: 'ok', message: 'Katrin Sweets Server is running' });
});

// Sign up new user
app.post('/make-server-48cde07a/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    if (!email || !password || !name) {
      return c.json({ error: 'Email, password, and name are required' }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      email_confirm: true, // Auto-confirm since email server not configured
    });

    if (error) {
      console.error('Signup error:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ user: data.user, message: 'User created successfully' });
  } catch (error: any) {
    console.error('Signup error:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

// ============================================
// ADDRESS MANAGEMENT ENDPOINTS
// ============================================

// Get user addresses
app.get('/make-server-48cde07a/addresses', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: addresses, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('user_id', user.id)
      .order('is_default', { ascending: false });

    if (error) {
      console.error('Error fetching addresses:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ addresses });
  } catch (error: any) {
    console.error('Addresses fetch error:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

// Create address
app.post('/make-server-48cde07a/addresses', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const addressData = await c.req.json();

    // If this is the default address, unset other defaults
    if (addressData.is_default) {
      await supabase
        .from('addresses')
        .update({ is_default: false })
        .eq('user_id', user.id);
    }

    const { data: address, error } = await supabase
      .from('addresses')
      .insert([{
        ...addressData,
        user_id: user.id,
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating address:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ address, message: 'Address created successfully' });
  } catch (error: any) {
    console.error('Address creation error:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

// Update address
app.put('/make-server-48cde07a/addresses/:id', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const addressId = c.req.param('id');
    const addressData = await c.req.json();

    // If this is the default address, unset other defaults
    if (addressData.is_default) {
      await supabase
        .from('addresses')
        .update({ is_default: false })
        .eq('user_id', user.id)
        .neq('id', addressId);
    }

    const { data: address, error } = await supabase
      .from('addresses')
      .update(addressData)
      .eq('id', addressId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating address:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ address, message: 'Address updated successfully' });
  } catch (error: any) {
    console.error('Address update error:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

// Delete address
app.delete('/make-server-48cde07a/addresses/:id', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const addressId = c.req.param('id');

    const { error } = await supabase
      .from('addresses')
      .delete()
      .eq('id', addressId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting address:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ message: 'Address deleted successfully' });
  } catch (error: any) {
    console.error('Address deletion error:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

// Update user profile
app.put('/make-server-48cde07a/profile', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const profileData = await c.req.json();

    const { data: profile, error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating profile:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ profile, message: 'Profile updated successfully' });
  } catch (error: any) {
    console.error('Profile update error:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

// ============================================
// EMAIL SENDING ENDPOINTS
// ============================================

// Send order confirmation email
app.post('/make-server-48cde07a/send-order-email', async (c) => {
  try {
    const emailData: OrderEmailData = await c.req.json();
    
    console.log('📧 Sending order confirmation email to:', emailData.customerEmail || emailData.deliveryInfo.email);
    
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    const emailHtml = getOrderConfirmationEmail(emailData);
    
    if (!resendApiKey) {
      console.warn('⚠️ RESEND_API_KEY is not configured - Email will not be sent');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📬 EMAIL PREVIEW (would have been sent):');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('To:', emailData.customerEmail || emailData.deliveryInfo.email);
      console.log('Subject: Bestellbestätigung #' + emailData.orderId + ' - Katrin Sweets');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(emailHtml);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      return c.json({ success: false, warning: 'Email service not configured' });
    }

    const recipientEmail = emailData.customerEmail || emailData.deliveryInfo.email;
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Katrinsweets <team@katrinsweets.de>',
        to: [recipientEmail],
        subject: `Bestellbestätigung #${emailData.orderId} - Katrin Sweets`,
        html: emailHtml,
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.warn('⚠️ Failed to send email via Resend API');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📬 EMAIL PREVIEW (sending failed):');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('To:', recipientEmail);
      console.log('Subject: Bestellbestätigung #' + emailData.orderId + ' - Katrin Sweets');
      console.log('Error:', result);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('ℹ️ Note: Resend free plan only sends to verified email addresses');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(emailHtml);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      // Return success anyway - email is optional
      return c.json({ success: false, warning: 'Email not sent - domain verification required', details: result });
    }

    console.log('✅ Order confirmation email sent successfully:', result);
    return c.json({ success: true, emailId: result.id });
  } catch (error: any) {
    console.error('Email sending error:', error);
    // Don't fail the whole order if email fails
    return c.json({ success: false, error: error.message }, 200);
  }
});

// Send custom order confirmation email
app.post('/make-server-48cde07a/send-custom-order-email', async (c) => {
  try {
    const emailData: CustomOrderEmailData = await c.req.json();
    
    console.log('📧 Sending custom order confirmation email to:', emailData.deliveryInfo.email);
    
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    const emailHtml = getCustomOrderConfirmationEmail(emailData);
    
    if (!resendApiKey) {
      console.warn('⚠️ RESEND_API_KEY is not configured - Email will not be sent');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📬 CUSTOM ORDER EMAIL PREVIEW (would have been sent):');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('To:', emailData.deliveryInfo.email);
      console.log('Subject: Anfrage-Bestätigung #' + emailData.orderId + ' - Katrin Sweets');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(emailHtml);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      return c.json({ success: false, warning: 'Email service not configured' });
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Katrinsweets <team@katrinsweets.de>',
        to: [emailData.deliveryInfo.email],
        subject: `Anfrage-Bestätigung #${emailData.orderId} - Katrin Sweets`,
        html: emailHtml,
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.warn('⚠️ Failed to send custom order email via Resend API');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📬 CUSTOM ORDER EMAIL PREVIEW (sending failed):');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('To:', emailData.deliveryInfo.email);
      console.log('Subject: Anfrage-Bestätigung #' + emailData.orderId + ' - Katrin Sweets');
      console.log('Error:', result);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('ℹ️ Note: Resend free plan only sends to verified email addresses');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log(emailHtml);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      // Return success anyway - email is optional
      return c.json({ success: false, warning: 'Email not sent - domain verification required', details: result });
    }

    console.log('✅ Custom order confirmation email sent successfully:', result);
    return c.json({ success: true, emailId: result.id });
  } catch (error: any) {
    console.error('Email sending error:', error);
    // Don't fail the whole order if email fails
    return c.json({ success: false, warning: error.message });
  }
});

// Send status update email
app.post('/make-server-48cde07a/send-status-update-email', async (c) => {
  try {
    const { customerName, customerEmail, orderId, oldStatus, newStatus } = await c.req.json();
    
    console.log('Sending status update email to:', customerEmail);
    
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (!resendApiKey) {
      console.error('RESEND_API_KEY is not configured');
      return c.json({ error: 'Email service not configured' }, 500);
    }

    const emailHtml = getOrderStatusUpdateEmail(customerName, orderId, oldStatus, newStatus);
    
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Katrinsweets <team@katrinsweets.de>',
        to: [customerEmail],
        subject: `Status-Update: Bestellung #${orderId} - Katrin Sweets`,
        html: emailHtml,
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error('Resend API error:', result);
      return c.json({ error: 'Failed to send email', details: result }, 500);
    }

    console.log('Status update email sent successfully:', result);
    return c.json({ success: true, emailId: result.id });
  } catch (error: any) {
    console.error('Email sending error:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

// ============================================
// PRODUCT MANAGEMENT ENDPOINTS
// ============================================

// Get all products
app.get('/make-server-48cde07a/products', async (c) => {
  try {
    // Use getByPrefix to get all products
    const products = await kv.getByPrefix('product:');
    
    return c.json({ products });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

// Create product
app.post('/make-server-48cde07a/products', async (c) => {
  try {
    const productData = await c.req.json();
    
    console.log('Creating product:', productData);
    
    // Add timestamp if not present
    if (!productData.created_at) {
      productData.created_at = new Date().toISOString();
    }
    
    // Store product with simple key structure
    const productKey = `product:${productData.id}`;
    await kv.set(productKey, productData);
    
    console.log(`✅ Product stored successfully at key: ${productKey}`);
    return c.json({ product: productData, message: 'Product created successfully' });
  } catch (error: any) {
    console.error('❌ Product creation error:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

// Update product
app.put('/make-server-48cde07a/products', async (c) => {
  try {
    const productData = await c.req.json();
    
    console.log('Updating product:', productData);
    
    // Add updated timestamp
    productData.updated_at = new Date().toISOString();
    
    // Store product
    const productKey = `product:${productData.id}`;
    await kv.set(productKey, productData);
    
    console.log(`✅ Product updated successfully at key: ${productKey}`);
    return c.json({ product: productData, message: 'Product updated successfully' });
  } catch (error: any) {
    console.error('❌ Product update error:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

// Delete product
app.delete('/make-server-48cde07a/products/:id', async (c) => {
  try {
    const productId = c.req.param('id');
    
    console.log('Deleting product:', productId);
    
    // Delete product
    const productKey = `product:${productId}`;
    await kv.del(productKey);
    
    console.log(`✅ Product deleted successfully: ${productKey}`);
    return c.json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    console.error('❌ Product deletion error:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

// ============================================
// RECIPE MANAGEMENT ENDPOINTS
// ============================================

// Get all recipes
app.get('/make-server-48cde07a/recipes', async (c) => {
  try {
    // Use getByPrefix to get all recipes
    const recipes = await kv.getByPrefix('recipe:');
    
    return c.json({ recipes });
  } catch (error: any) {
    console.error('Error fetching recipes:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

// Create recipe
app.post('/make-server-48cde07a/recipes', async (c) => {
  try {
    const recipeData = await c.req.json();
    
    console.log('Creating recipe:', recipeData);
    
    // Add timestamp if not present
    if (!recipeData.created_at) {
      recipeData.created_at = new Date().toISOString();
    }
    
    // Store recipe with simple key structure
    const recipeKey = `recipe:${recipeData.id}`;
    await kv.set(recipeKey, recipeData);
    
    console.log(`✅ Recipe stored successfully at key: ${recipeKey}`);
    return c.json({ recipe: recipeData, message: 'Recipe created successfully' });
  } catch (error: any) {
    console.error('❌ Recipe creation error:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

// Update recipe
app.put('/make-server-48cde07a/recipes', async (c) => {
  try {
    const recipeData = await c.req.json();
    
    console.log('Updating recipe:', recipeData);
    
    // Add updated timestamp
    recipeData.updated_at = new Date().toISOString();
    
    // Store recipe
    const recipeKey = `recipe:${recipeData.id}`;
    await kv.set(recipeKey, recipeData);
    
    console.log(`✅ Recipe updated successfully at key: ${recipeKey}`);
    return c.json({ recipe: recipeData, message: 'Recipe updated successfully' });
  } catch (error: any) {
    console.error('❌ Recipe update error:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

// Delete recipe
app.delete('/make-server-48cde07a/recipes/:id', async (c) => {
  try {
    const recipeId = c.req.param('id');
    
    console.log('Deleting recipe:', recipeId);
    
    // Delete recipe
    const recipeKey = `recipe:${recipeId}`;
    await kv.del(recipeKey);
    
    console.log(`✅ Recipe deleted successfully: ${recipeKey}`);
    return c.json({ message: 'Recipe deleted successfully' });
  } catch (error: any) {
    console.error('❌ Recipe deletion error:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

// ============================================
// ORDER MANAGEMENT ENDPOINTS
// ============================================

// Get all orders (admin)
app.get('/make-server-48cde07a/orders', async (c) => {
  try {
    // Use getByPrefix to get all orders
    const allOrders = await kv.getByPrefix('order:');
    
    // Sort by created_at descending (newest first)
    const sortedOrders = allOrders.sort((a, b) => {
      const dateA = new Date(a.created_at || 0).getTime();
      const dateB = new Date(b.created_at || 0).getTime();
      return dateB - dateA;
    });

    return c.json({ orders: sortedOrders });
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

// Get orders by user email
app.get('/make-server-48cde07a/orders/user/:email', async (c) => {
  try {
    const email = c.req.param('email');
    
    // Get all orders and filter by email
    const allOrders = await kv.getByPrefix('order:');
    const userOrders = allOrders.filter(order => order.user_email === email);
    
    // Sort by created_at descending (newest first)
    const sortedOrders = userOrders.sort((a, b) => {
      const dateA = new Date(a.created_at || 0).getTime();
      const dateB = new Date(b.created_at || 0).getTime();
      return dateB - dateA;
    });

    return c.json({ orders: sortedOrders });
  } catch (error: any) {
    console.error('Error fetching user orders:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

// Create order (unified for both shop and custom orders)
app.post('/make-server-48cde07a/orders', async (c) => {
  try {
    const orderData = await c.req.json();
    
    console.log('🎯 POST /orders endpoint called');
    console.log('📦 Received order data:', JSON.stringify(orderData, null, 2));
    
    // Add timestamp if not present
    if (!orderData.created_at) {
      orderData.created_at = new Date().toISOString();
    }
    
    // Store order with simple key structure
    const orderKey = `order:${orderData.id}`;
    console.log(`💾 Attempting to store at key: ${orderKey}`);
    
    await kv.set(orderKey, orderData);
    
    console.log(`✅ Order stored successfully at key: ${orderKey}`);
    console.log('📊 Stored data:', JSON.stringify(orderData, null, 2));
    
    return c.json({ order: orderData, message: 'Order created successfully' });
  } catch (error: any) {
    console.error('❌ Order creation error:', error);
    console.error('❌ Error stack:', error.stack);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

// Update order status
app.put('/make-server-48cde07a/orders/:id/status', async (c) => {
  try {
    const orderId = c.req.param('id');
    const { status } = await c.req.json();
    
    console.log('Updating order status:', orderId, status);
    
    // Get existing order
    const orderKey = `order:${orderId}`;
    const order = await kv.get(orderKey);
    
    if (!order) {
      return c.json({ error: 'Order not found' }, 404);
    }
    
    // Update status
    order.status = status;
    order.updated_at = new Date().toISOString();
    
    // Store updated order
    await kv.set(orderKey, order);
    
    console.log(`✅ Order status updated successfully: ${orderKey}`);
    return c.json({ order, message: 'Order status updated successfully' });
  } catch (error: any) {
    console.error('❌ Order status update error:', error);
    return c.json({ error: error.message || 'Internal server error' }, 500);
  }
});

Deno.serve(app.fetch);