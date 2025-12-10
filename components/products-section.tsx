"use client";

import { useLanguage } from "@/contexts/language-context";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { loadProducts, Product } from "@/lib/products-data";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import ProductModal from "@/components/product-modal";

export default function ProductsSection() {
  const { t, language } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  // Load products on mount
  useEffect(() => {
    loadProducts().then(setProducts);
  }, []);

  const handleProductClick = useCallback((product: Product) => {
    console.log("Product clicked:", product.id);
    setSelectedProduct(product);
    setModalOpen(true);
  }, []);

  const handleModalClose = useCallback((open: boolean) => {
    console.log("Modal state changing to:", open);
    setModalOpen(open);
    if (!open) {
      setTimeout(() => setSelectedProduct(null), 300);
    }
  }, []);

  const featuredProducts = products.filter((p) => p.featured);

  return (
    <section
      id="products"
      className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/20"
    >
      <div className="container px-4 md:px-6" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {t("products.badge")}
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">
            {t("products.title")}
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {t("products.description")}
          </p>
        </motion.div>

        {/* Horizontal Scrolling Products */}
        <div className="relative overflow-hidden">
          {/* Products Row - Scrollable */}
          <div
            className="flex gap-8 pb-4 overflow-x-auto scrollbar-hide px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {featuredProducts.slice(0, 6).map((product, index) => {
              // Book opening animation - cards open from center like pages of a book
              const isLeftPage = index % 2 === 0;
              const initialRotateY = isLeftPage ? -90 : 90;
              
              return (
                <motion.div
                  key={product.id}
                  initial={{ 
                    opacity: 0, 
                    rotateY: initialRotateY,
                    scale: 0.8,
                  }}
                  animate={inView ? { 
                    opacity: 1, 
                    rotateY: 0, 
                    scale: 1,
                  } : {}}
                  transition={{ 
                    duration: 1.0, 
                    delay: index * 0.12,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    type: "spring",
                    stiffness: 50,
                    damping: 12
                  }}
                  whileHover={{ 
                    y: -12,
                    scale: 1.03,
                    rotateY: isLeftPage ? 8 : -8,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                  className="group relative flex-shrink-0 w-[380px] h-[580px]"
                  style={{ 
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                    transformOrigin: isLeftPage ? "right center" : "left center"
                  }}
                >
                  {/* Book spine shadow effect */}
                  <div 
                    className="absolute inset-y-0 w-3 bg-gradient-to-r from-black/15 to-transparent transition-opacity duration-300 group-hover:opacity-0 z-10 rounded-l-lg"
                    style={{ 
                      left: isLeftPage ? 'auto' : 0,
                      right: isLeftPage ? 0 : 'auto'
                    }}
                  />
                  
                  <div className="relative h-full bg-card rounded-2xl overflow-hidden border border-border shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col">
                    {/* Product Image - Larger */}
                    <div className="relative h-64 flex-shrink-0 bg-gradient-to-br from-primary/8 to-primary/3 overflow-hidden flex items-center justify-center">
                      <div className="relative w-[90%] h-[90%] bg-background rounded-xl shadow-md flex items-center justify-center p-4">
                        <Image
                          src={product.image}
                          alt={product.name[language as keyof typeof product.name]}
                          width={400}
                          height={400}
                          className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110"
                          unoptimized
                        />
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6 pb-8 flex flex-col flex-grow">
                      {/* Title */}
                      <h3 className="text-xl font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors min-h-[3.5rem] leading-7">
                        {product.name[language as keyof typeof product.name]}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed min-h-[4rem] mt-3">
                        {product.description[language as keyof typeof product.description]}
                      </p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mt-4 min-h-[3rem] overflow-hidden content-start">
                        {product.features[language as keyof typeof product.features]
                          .slice(0, 3)
                          .map((feature, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium h-fit"
                            >
                              {feature}
                            </span>
                          ))}
                      </div>

                      {/* Learn More Button */}
                      <div className="mt-auto pt-6">
                        <Button
                          variant="outline"
                          className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 font-semibold py-3"
                          onClick={() => handleProductClick(product)}
                          type="button"
                        >
                          {t("products.learnMore")}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>



        {/* View All Button */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/products">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 px-8"
              >
                {t("products.viewAll")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        open={modalOpen}
        onOpenChange={handleModalClose}
      />

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
