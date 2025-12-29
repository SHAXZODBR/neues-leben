"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/language-context";
import { loadProducts, productCategories, Product } from "@/lib/products-data";
import { motion } from "framer-motion";
import { Search, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import ProductModal from "@/components/product-modal";

export default function ProductsPage() {
  const { t, language } = useLanguage();
  const categories = productCategories[language as keyof typeof productCategories];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load products on mount
  useEffect(() => {
    setLoading(true);
    setError(null);
    loadProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load products:', err);
        setError(err.message || 'Failed to load products');
        setLoading(false);
      });
  }, []);

  // Always default to the first category (All Products) whenever language changes
  // so users immediately see the full product list in the new language.
  useEffect(() => {
    setSelectedCategory(categories[0]);
  }, [language, categories]);


  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === categories[0] ||
      product.category[language as keyof typeof product.category] === selectedCategory;

    const matchesSearch =
      searchQuery === "" ||
      product.name[language as keyof typeof product.name]
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      product.description[language as keyof typeof product.description]
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-primary/5 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            className="text-center space-y-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-foreground">
              {t("products.pageTitle")}
            </h1>
            <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed">
              {t("products.pageDescription")}
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            className="max-w-4xl mx-auto space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t("products.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          {loading ? (
            /* Loading Skeletons */
            <div className="space-y-8">
              <div className="flex flex-col items-center justify-center py-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-primary/5 blur-xl"
                  />
                  <div className="relative bg-card border-2 border-primary/20 rounded-2xl p-5">
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Package className="h-10 w-10 text-primary" />
                    </motion.div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 text-center"
                >
                  <p className="text-base font-medium text-foreground">{t("products.loading") || "Loading Products..."}</p>
                  <div className="flex items-center justify-center gap-1.5 mt-2">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                        className="h-2 w-2 rounded-full bg-primary"
                      />
                    ))}
                  </div>
                </motion.div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-card rounded-2xl overflow-hidden border border-border">
                    <Skeleton className="h-72 w-full" />
                    <div className="p-5 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                      </div>
                      <Skeleton className="h-10 w-full rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto space-y-4">
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
                  <p className="text-destructive font-semibold text-lg mb-2">
                    {t("products.error") || "Error Loading Products"}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {error}
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setLoading(true);
                    setError(null);
                    loadProducts()
                      .then((data) => {
                        setProducts(data);
                        setLoading(false);
                      })
                      .catch((err) => {
                        setError(err.message || 'Failed to load products');
                        setLoading(false);
                      });
                  }}
                  variant="outline"
                >
                  {t("products.retry") || "Retry"}
                </Button>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">{t("products.noResults")}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="group cursor-pointer h-[620px]"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="relative h-full bg-card rounded-2xl overflow-hidden border border-border shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col">
                    {/* Product Image - Larger */}
                    <div className="relative h-72 flex-shrink-0 bg-gradient-to-br from-primary/12 to-primary/5 overflow-hidden flex items-center justify-center">
                      <div className="relative w-[90%] h-[90%] bg-background rounded-2xl shadow-md flex items-center justify-center p-4">
                        <Image
                          src={product.image}
                          alt={product.name[language as keyof typeof product.name]}
                          width={400}
                          height={400}
                          className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
                          unoptimized
                        />
                      </div>
                    </div>


                    {/* Product Info - Flex grow */}
                    <div className="p-5 flex flex-col flex-grow">
                      {/* Title - Fixed height */}
                      <h3 className="text-lg font-bold text-foreground line-clamp-2 h-14 leading-7 group-hover:text-primary transition-colors">
                        {product.name[language as keyof typeof product.name]}
                      </h3>

                      {/* Description - Fixed height */}
                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed h-16 mt-2">
                        {product.description[language as keyof typeof product.description]}
                      </p>

                      {/* Features - Fixed height container */}
                      <div className="flex flex-wrap gap-1.5 mt-3 h-16 overflow-hidden content-start">
                        {product.features[language as keyof typeof product.features].slice(0, 3).map((feature, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary h-fit"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Learn More Button - Always at bottom */}
                      <div className="mt-auto pt-3">
                        <Button
                          variant="outline"
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleProductClick(product);
                          }}
                        >
                          {t("products.learnMore")}
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

          )}
        </div>
      </section>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </div>
  );
}
