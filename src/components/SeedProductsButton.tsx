import { useState } from 'react';
import { Loader2, Package, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { seedProducts } from '../utils/seed-products';

export default function SeedProductsButton() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seededCount, setSeededCount] = useState(0);

  const handleSeedProducts = async () => {
    if (!confirm('Möchten Sie 10 Beispielprodukte (5 Torten, 5 Cookies) hinzufügen?')) {
      return;
    }

    setIsSeeding(true);
    setSeededCount(0);

    try {
      let successCount = 0;

      for (const product of seedProducts) {
        try {
          const response = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-48cde07a/products`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${publicAnonKey}`,
              },
              body: JSON.stringify(product),
            }
          );

          if (response.ok) {
            successCount++;
            setSeededCount(successCount);
          }
        } catch (error) {
          console.error(`Error adding product ${product.name}:`, error);
        }

        // Small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      if (successCount === seedProducts.length) {
        toast.success(`🎉 ${successCount} Produkte erfolgreich hinzugefügt!`);
      } else {
        toast.success(`✅ ${successCount} von ${seedProducts.length} Produkten hinzugefügt`);
      }

      // Reload page to show new products
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error('Error seeding products:', error);
      toast.error('Fehler beim Hinzufügen der Produkte');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <button
      onClick={handleSeedProducts}
      disabled={isSeeding}
      className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
    >
      {isSeeding ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Produkte hinzufügen... ({seededCount}/{seedProducts.length})
        </>
      ) : (
        <>
          <Package className="w-5 h-5" />
          10 Beispielprodukte hinzufügen
        </>
      )}
    </button>
  );
}
