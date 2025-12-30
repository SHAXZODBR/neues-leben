import { createClient } from "@supabase/supabase-js";

export interface Product {
  id: string;
  name: {
    en: string;
    uz: string;
    ru: string;
    de: string;
  };
  category: {
    en: string;
    uz: string;
    ru: string;
    de: string;
  };
  description: {
    en: string;
    uz: string;
    ru: string;
    de: string;
  };
  features: {
    en: string[];
    uz: string[];
    ru: string[];
    de: string[];
  };
  image: string;
  featured: boolean;
  medicalInfo?: {
    en?: string;
    uz?: string;
    ru?: string;
    de?: string;
  };
}

// Initialize Supabase client (only if credentials are available)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Cache for products
let cachedProducts: Product[] | null = null;

// Transform Supabase row to Product interface
function transformSupabaseProduct(row: any): Product {
  // Parse features from comma-separated string to array
  const parseFeatures = (featuresStr: string): string[] => {
    if (!featuresStr) return [];
    return featuresStr.split(',').map(f => f.trim()).filter(f => f.length > 0);
  };

  return {
    id: row.product_id,
    name: {
      en: row.name_en,
      uz: row.name_uz,
      ru: row.name_ru,
      de: row.name_de,
    },
    category: {
      en: row.category_en,
      uz: row.category_uz,
      ru: row.category_ru,
      de: row.category_de,
    },
    description: {
      en: row.description_en,
      uz: row.description_uz,
      ru: row.description_ru,
      de: row.description_de,
    },
    features: {
      en: parseFeatures(row.features_en),
      uz: parseFeatures(row.features_uz),
      ru: parseFeatures(row.features_ru),
      de: parseFeatures(row.features_de),
    },
    image: row.image,
    featured: row.featured || false,
    medicalInfo: {
      en: row.medical_info_en || undefined,
      uz: row.medical_info_uz || undefined,
      ru: row.medical_info_ru || undefined,
      de: row.medical_info_de || undefined,
    },
  };
}

// Load products from Supabase
export async function loadProducts(): Promise<Product[]> {
  // Return cached products if available
  if (cachedProducts) {
    return cachedProducts;
  }

  // Throw error if Supabase is not configured
  if (!supabase) {
    const error = 'Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.';
    console.error(error);
    throw new Error(error);
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('published', true)
      .order('product_id', { ascending: true });

    if (error) {
      console.error('Error loading products from Supabase:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.warn('No products found in Supabase');
      return [];
    }

    const products = data.map(transformSupabaseProduct);
    cachedProducts = products;
    return products;
  } catch (error) {
    console.error('Error loading products:', error);
    throw error;
  }
}

// Synchronous getter for products (returns cached or empty array)
export function getProducts(): Product[] {
  return cachedProducts || [];
}


export const productCategories = {
  en: ["All Products", "Cardiology", "Pulmonology", "Pain Relief", "Endocrinology", "Neurology", "Gastroenterology"],
  uz: ["Barcha mahsulotlar", "Kardiologiya", "Pulmonologiya", "Og'riqni bartaraf etish", "Endokrinologiya", "Nevrologiya", "Gastroenterologiya"],
  ru: ["Все продукты", "Кардиология", "Пульмонология", "Обезболивание", "Эндокринология", "Неврология", "Гастроэнтерология"],
  de: ["Alle Produkte", "Kardiologie", "Pneumologie", "Schmerzlinderung", "Endokrinologie", "Neurologie", "Gastroenterologie"],
};

