import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner@2.0.3";
import HomePage from "./components/HomePage";
import ProductsPage from "./components/ProductsPage";
import CustomOrderPage from "./components/CustomOrderPage";
import RecipesPage from "./components/RecipesPage";
import CustomerPortal from "./components/CustomerPortal";
import AdminPanel from "./components/AdminPanel";
import CheckoutPage from "./components/CheckoutPage";
import OrderConfirmationPage from "./components/OrderConfirmationPage";
import EmailPreviewPage from "./components/EmailPreviewPage";
import AuthModal from "./components/AuthModal";
import CartModal from "./components/CartModal";
import CartDrawer from "./components/CartDrawer";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import GoogleOAuthDebug from "./components/GoogleOAuthDebug";
import WhatsAppButton from "./components/WhatsAppButton";
import { supabase } from "./lib/supabase";

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] =
    useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState<"login" | "signup">(
    "login",
  );
  const [showDebug, setShowDebug] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    checkUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setCurrentUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        await fetchUserProfile(session.user.id);
      }
    } catch (error) {
      console.error("Error checking user session:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async (userId: string) => {
    try {
      // Get user from auth first
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      let profileName = user.user_metadata?.name || "User";

      // Try to fetch profile from database (if table exists)
      try {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (profile && !error) {
          profileName = profile.name || profileName;
        } else if (error && error.code === "PGRST205") {
          // Table doesn't exist yet - this is expected, not an error
          console.log(
            "ℹ️ Profile table not yet created. Using user metadata. Create tables in Supabase to enable full features.",
          );
        } else if (error && error.code !== "PGRST116") {
          // PGRST116 = no rows found, which is fine
          console.warn("Profile fetch warning:", error.message);
        }
      } catch (profileError: any) {
        // Silently handle profile table errors
        if (profileError.code !== "PGRST205") {
          console.warn(
            "Could not fetch profile, using metadata:",
            profileError.message,
          );
        }
      }

      setCurrentUser({
        id: userId,
        email: user.email || "",
        name: profileName,
      });
    } catch (error: any) {
      console.error("Error in fetchUserProfile:", error);

      // Even if everything fails, try to set basic user info from auth
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          setCurrentUser({
            id: userId,
            email: user.email || "",
            name: user.user_metadata?.name || "User",
          });
        }
      } catch (authError) {
        console.error("Fatal error fetching user:", authError);
      }
    }
  };

  const handleLogin = (user: any) => {
    setCurrentUser(user);
    setIsAuthModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setCurrentUser(null);
      toast.success("Erfolgreich abgemeldet");
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Fehler beim Abmelden");
    }
  };

  const addToCart = (product: any, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id,
      );
      if (existing) {
        toast.success(`${product.name} wurde aktualisiert`, {
          description: `Menge: ${existing.quantity + quantity}`,
        });
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      toast.success(`${product.name} wurde hinzugefügt`, {
        description: `${quantity}x zum Warenkorb hinzugefügt`,
      });
      return [...prev, { ...product, quantity }];
    });
    // Öffne das Warenkorb-Drawer automatisch
    setIsCartDrawerOpen(true);
  };

  const updateCartQuantity = (
    productId: string,
    quantity: number,
  ) => {
    if (quantity === 0) {
      setCart((prev) =>
        prev.filter((item) => item.id !== productId),
      );
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        ),
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartItemsCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return (
    <Router>
      <div className="min-h-screen bg-pink-50">
        <Toaster position="top-right" richColors />
        <ScrollToTop />

        <Navigation
          currentUser={currentUser}
          onAuthClick={() => setIsAuthModalOpen(true)}
          onLogout={handleLogout}
          onCartClick={() => setIsCartModalOpen(true)}
          cartItemsCount={cartItemsCount}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        <main>
          <Routes>
            <Route
              path="/"
              element={<HomePage addToCart={addToCart} />}
            />
            <Route
              path="/produkte"
              element={<ProductsPage addToCart={addToCart} />}
            />
            <Route
              path="/produkte/cookies"
              element={
                <ProductsPage
                  category="cookies"
                  addToCart={addToCart}
                />
              }
            />
            <Route
              path="/produkte/cakes"
              element={
                <ProductsPage
                  category="cakes"
                  addToCart={addToCart}
                />
              }
            />
            <Route
              path="/nach-wunsch"
              element={
                <CustomOrderPage currentUser={currentUser} />
              }
            />
            <Route path="/rezepte" element={<RecipesPage />} />
            <Route
              path="/profile"
              element={
                <CustomerPortal
                  currentUser={currentUser}
                  onLogin={() => setIsAuthModalOpen(true)}
                />
              }
            />
            <Route
              path="/admin"
              element={<AdminPanel currentUser={currentUser} />}
            />
            <Route
              path="/checkout"
              element={
                <CheckoutPage
                  currentUser={currentUser}
                  cart={cart}
                  onClearCart={clearCart}
                  onOpenAuthModal={(mode) => {
                    setAuthMode(mode);
                    setIsAuthModalOpen(true);
                  }}
                />
              }
            />
            <Route
              path="/bestellung-bestaetigt"
              element={<OrderConfirmationPage />}
            />
            <Route
              path="/email-preview"
              element={<EmailPreviewPage />}
            />
          </Routes>
        </main>

        <Footer />

        {/* WhatsApp Floating Button */}
        <WhatsAppButton />

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={handleLogin}
          mode={authMode}
        />

        <CartModal
          isOpen={isCartModalOpen}
          onClose={() => setIsCartModalOpen(false)}
          cart={cart}
          updateQuantity={updateCartQuantity}
          currentUser={currentUser}
          onLoginRequired={() => {
            setIsCartModalOpen(false);
            setIsAuthModalOpen(true);
          }}
        />

        <CartDrawer
          isOpen={isCartDrawerOpen}
          onClose={() => setIsCartDrawerOpen(false)}
          cart={cart}
          updateQuantity={updateCartQuantity}
          currentUser={currentUser}
          onLoginRequired={() => {
            setIsCartDrawerOpen(false);
            setIsAuthModalOpen(true);
          }}
        />

        {showDebug && <GoogleOAuthDebug />}
      </div>
    </Router>
  );
}

function Navigation({
  currentUser,
  onAuthClick,
  onLogout,
  onCartClick,
  cartItemsCount,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: any) {
  const location = useLocation();

  // Admin-Email - NUR DIESE EMAIL SIEHT DAS ADMIN-PANEL!
  const ADMIN_EMAIL = "nourhamza221@gmail.com";
  const isAdmin = currentUser?.email === ADMIN_EMAIL;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/produkte", label: "Produkte" },
    { path: "/nach-wunsch", label: "Nach Wunsch" },
    { path: "/rezepte", label: "Rezepte & Tipps" },
  ];

  // Admin-Link nur für Admin hinzufügen
  if (isAdmin) {
    navLinks.push({ path: "/admin", label: "🎛️ Admin" });
  }

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            {/* Beautiful Layered Cake Icon */}
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 via-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all group-hover:scale-105 group-hover:rotate-3">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  className="text-white"
                >
                  {/* Candle Flame */}
                  <path
                    d="M14 2C14 2 12.5 3.5 12.5 4.5C12.5 5.33 13.17 6 14 6C14.83 6 15.5 5.33 15.5 4.5C15.5 3.5 14 2 14 2Z"
                    fill="#FFD700"
                    className="animate-pulse"
                    style={{ animationDuration: '1.5s' }}
                  />
                  {/* Candle Stick */}
                  <rect x="13.5" y="5.5" width="1" height="2.5" fill="white" opacity="0.9" />
                  
                  {/* Top Layer (smallest) */}
                  <ellipse cx="14" cy="8" rx="3.5" ry="1" fill="white" opacity="0.3" />
                  <rect x="10.5" y="8" width="7" height="2.5" fill="white" opacity="0.95" rx="0.5" />
                  <ellipse cx="14" cy="10.5" rx="3.5" ry="1" fill="white" opacity="0.4" />
                  
                  {/* Frosting Drips on Top Layer */}
                  <path d="M11 10.5 Q11 11 10.8 11.2 L10.8 10.5 Z" fill="white" opacity="0.6" />
                  <path d="M14 10.5 Q14 11.2 13.8 11.5 L13.8 10.5 Z" fill="white" opacity="0.6" />
                  <path d="M17 10.5 Q17 11 16.8 11.2 L16.8 10.5 Z" fill="white" opacity="0.6" />
                  
                  {/* Middle Layer */}
                  <ellipse cx="14" cy="12" rx="5" ry="1.2" fill="white" opacity="0.3" />
                  <rect x="9" y="12" width="10" height="3.5" fill="white" opacity="0.85" rx="0.5" />
                  <ellipse cx="14" cy="15.5" rx="5" ry="1.2" fill="white" opacity="0.4" />
                  
                  {/* Frosting Drips on Middle Layer */}
                  <path d="M10 15.5 Q10 16.2 9.7 16.5 L9.7 15.5 Z" fill="white" opacity="0.5" />
                  <path d="M14 15.5 Q14 16.5 13.6 16.8 L13.6 15.5 Z" fill="white" opacity="0.5" />
                  <path d="M18 15.5 Q18 16.2 17.7 16.5 L17.7 15.5 Z" fill="white" opacity="0.5" />
                  
                  {/* Bottom Layer (largest) */}
                  <ellipse cx="14" cy="17" rx="6.5" ry="1.5" fill="white" opacity="0.3" />
                  <rect x="7.5" y="17" width="13" height="5" fill="white" opacity="0.75" rx="0.5" />
                  <ellipse cx="14" cy="22" rx="6.5" ry="1.5" fill="white" opacity="0.5" />
                  
                  {/* Decorative Elements (berries/decorations) */}
                  <circle cx="11" cy="13.5" r="0.7" fill="#FF69B4" opacity="0.8" />
                  <circle cx="17" cy="13.5" r="0.7" fill="#FF69B4" opacity="0.8" />
                  <circle cx="14" cy="9.5" r="0.6" fill="#FF1493" opacity="0.8" />
                  <circle cx="10" cy="19" r="0.8" fill="#FF69B4" opacity="0.7" />
                  <circle cx="18" cy="19" r="0.8" fill="#FF69B4" opacity="0.7" />
                  <circle cx="14" cy="20" r="0.7" fill="#FF1493" opacity="0.7" />
                  
                  {/* Bottom Plate */}
                  <ellipse cx="14" cy="23" rx="8" ry="1.2" fill="white" opacity="0.6" />
                  <rect x="6" y="23" width="16" height="0.8" fill="white" opacity="0.5" rx="0.4" />
                  <ellipse cx="14" cy="23.8" rx="8" ry="1.2" fill="white" opacity="0.3" />
                </svg>
              </div>
              {/* Sparkles */}
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-yellow-300 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-yellow-400 rounded-full"></div>
            </div>
            
            {/* Brand Text */}
            <div className="flex flex-col leading-tight">
              <span className="text-base tracking-tight bg-gradient-to-r from-pink-600 via-pink-500 to-pink-600 bg-clip-text text-transparent" style={{ fontFamily: "'Great Vibes', cursive", fontWeight: 400, letterSpacing: '0.05em' }}>
                Katrin Sweets
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  isActive(link.path)
                    ? "text-pink-600"
                    : "text-gray-700 hover:text-pink-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-pink-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>

            {currentUser ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/profile"
                  className="p-2 text-gray-700 hover:text-pink-600 transition-colors"
                >
                  <User className="w-6 h-6" />
                </Link>
                <button
                  onClick={onLogout}
                  className="text-sm text-gray-600 hover:text-pink-600 transition-colors"
                >
                  Abmelden
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="p-2 text-gray-700 hover:text-pink-600 transition-colors"
              >
                <User className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() =>
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }
            className="md:hidden p-2 text-gray-700"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-2 px-4 ${
                  isActive(link.path)
                    ? "text-pink-600 bg-pink-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t mt-2 pt-2">
              <button
                onClick={() => {
                  onCartClick();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-50 flex items-center justify-between"
              >
                <span>Warenkorb</span>
                {cartItemsCount > 0 && (
                  <span className="bg-pink-600 text-white text-xs rounded-full px-2 py-1">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              {currentUser ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2 px-4 text-gray-700 hover:bg-gray-50"
                  >
                    Mein Profil
                  </Link>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-50"
                  >
                    Abmelden
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    onAuthClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-50"
                >
                  Anmelden
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default App;