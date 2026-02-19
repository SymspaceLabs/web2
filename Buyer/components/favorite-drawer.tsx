import { useFavorites } from "@/contexts/FavoritesContext";
import { memo, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { Trash2, X } from "lucide-react";
import { HeartIcon } from "./custom-icons";

interface FavoriteItem {
  id: string;
  name: string;
  price: number;
  image: string;
  _favoriteKey?: string;
}

export const FavoritesDrawer = memo(({ isOpen, onClose, items }: { 
  isOpen: boolean; 
  onClose: () => void;
  items: FavoriteItem[];
}) => {
  const { dispatch } = useFavorites();

  useEffect(() => {
    console.log('🎨 FavoritesDrawer items updated:', items.length);
  }, [items]);

  const removeFromFavorites = (favoriteKey: string) => {
    console.log('🗑️ Removing favorite:', favoriteKey);
    
    dispatch({
      type: "REMOVE_FAVORITE",
      payload: favoriteKey
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:w-[400px] bg-black/95 border-white/10 flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-white text-xl font-bold">
              Favorites ({items.length})
            </SheetTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <HeartIcon className="w-16 h-16 text-white/30 mb-4" />
            <p className="text-white/60 text-center mb-2">No favorites yet</p>
            <p className="text-white/40 text-sm text-center mb-6">
              Start adding items you love!
            </p>
            <Button 
              onClick={onClose}
              className="bg-gradient-to-r from-[#18C8FF] to-[#933FFE] hover:opacity-90"
            >
              Explore Products
            </Button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
            {items.map((item) => (
              <div key={item._favoriteKey || item.id} className="flex gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                <div className="relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden bg-white/10">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <HeartIcon className="size-6 text-white/50" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h4 className="text-white font-medium text-sm mb-1 truncate">
                      {item.name}
                    </h4>
                    <p className="text-[#18C8FF] font-bold text-lg">
                      ${item?.price?.toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-white/20 hover:bg-white/10 text-xs"
                    >
                      Add to Cart
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      onClick={() => removeFromFavorites(item._favoriteKey || item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
});

FavoritesDrawer.displayName = 'FavoritesDrawer';
