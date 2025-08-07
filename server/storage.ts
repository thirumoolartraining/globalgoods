import { type User, type InsertUser, type Product, type InsertProduct, type Order, type InsertOrder, type Inquiry, type InsertInquiry } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: string): Promise<Order | undefined>;
  
  // Inquiries
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private orders: Map<string, Order>;
  private inquiries: Map<string, Inquiry>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.inquiries = new Map();
    
    // Initialize with sample products
    this.initializeProducts();
  }

  private initializeProducts() {
    // Ensure all product objects have a valid images array
    const sampleProducts: Product[] = [
      {
        id: "raw-w320",
        name: "Raw Cashews W320",
        description: "Premium grade raw cashews, perfect for snacking and cooking. These whole cashews are carefully selected for their superior quality and consistency.",
        price: "1200.00",
        category: "raw",
        weight: "25kg to 250kg",
        image: "/images/products/raw-w320/1.png",
        images: [
          "/images/products/raw-w320/1.png",
          "/images/products/raw-w320/2.png",
          "/images/products/raw-w320/3.png",
          "/images/products/raw-w320/4.png"
        ],
        inStock: true,
        isOrganic: false,
        grade: "W320",
        tags: ["premium", "whole", "raw"]
      },
      {
        id: "roasted-salted",
        name: "Roasted & Salted Cashews",
        description: "Perfectly roasted with a touch of sea salt for enhanced flavor. Our signature roasting process brings out the natural sweetness.",
        price: "1400.00",
        category: "roasted",
        weight: "25kg to 250kg",
        image: "/images/products/roasted-w240/1.png",
        images: [
          "/images/products/roasted-w240/1.png",
          "/images/products/roasted-w240/2.png",
          "/images/products/roasted-w240/3.png",
          "/images/products/roasted-w240/4.png"
        ],
        inStock: true,
        isOrganic: false,
        grade: "W240",
        tags: ["roasted", "salted", "popular"]
      },
      {
        id: "organic",
        name: "Organic Cashews",
        description: "Certified organic cashews grown without synthetic pesticides. Sustainably sourced from certified organic farms.",
        price: "1600.00",
        category: "organic",
        weight: "25kg to 250kg",
        image: "/images/products/organic-w320/1.png",
        images: [
          "/images/products/organic-w320/1.png",
          "/images/products/organic-w320/2.png",
          "/images/products/organic-w320/3.png",
          "/images/products/organic-w320/4.png"
        ],
        inStock: true,
        isOrganic: true,
        grade: "W320",
        tags: ["organic", "sustainable", "certified"]
      },
      {
        id: "pieces",
        name: "Cashew Pieces",
        description: "Premium cashew pieces, perfect for baking and cooking. These pieces maintain the same great taste and quality as our whole cashews.",
        price: "1100.00",
        category: "pieces",
        weight: "25kg to 250kg",
        image: "/images/products/cashew-pieces/1.png",
        images: [
          "/images/products/cashew-pieces/1.png",
          "/images/products/cashew-pieces/2.png",
          "/images/products/cashew-pieces/3.png",
          "/images/products/cashew-pieces/4.png"
        ],
        inStock: true,
        isOrganic: false,
        grade: "Pieces",
        tags: ["pieces", "cooking", "baking", "value"]
      },
      {
        id: "honey-roasted",
        name: "Honey Roasted Cashews",
        description: "Sweet and savory honey roasted cashews. The perfect balance of sweet and salty flavors.",
        price: "1500.00",
        category: "flavored",
        weight: "25kg to 250kg",
        image: "/images/products/honey-roasted/1.png",
        images: [
          "/images/products/honey-roasted/1.png",
          "/images/products/honey-roasted/2.png",
          "/images/products/honey-roasted/3.png",
          "/images/products/honey-roasted/4.png"
        ],
        inStock: true,
        isOrganic: false,
        grade: "W240",
        tags: ["honey", "sweet", "flavored", "gourmet"]
      },
      {
        id: "spiced",
        name: "Spiced Cashews",
        description: "Aromatic and flavorful spiced cashews with a hint of heat. Perfect for those who enjoy bold flavors.",
        price: "1450.00",
        category: "flavored",
        weight: "25kg to 250kg",
        image: "/images/products/spiced/1.png",
        images: [
          "/images/products/spiced/1.png",
          "/images/products/spiced/2.png",
          "/images/products/spiced/3.png",
          "/images/products/spiced/4.png"
        ],
        inStock: true,
        isOrganic: false,
        grade: "W280",
        tags: ["spiced", "indian", "flavored", "aromatic"]
      },
      {
        id: "jumbo-w240",
        name: "Jumbo Cashews W240",
        description: "Extra large premium cashews, perfect for gifting. The finest grade with exceptional size and quality.",
        price: "2200.00",
        category: "premium",
        weight: "25kg to 250kg",
        image: "/images/products/premium-w240/1.png",
        images: [
          "/images/products/premium-w240/1.png",
          "/images/products/premium-w240/2.png",
          "/images/products/premium-w240/3.png",
          "/images/products/premium-w240/4.png"
        ],
        inStock: true,
        isOrganic: false,
        grade: "W240",
        tags: ["jumbo", "premium", "large", "gift"]
      },
      {
        id: "butter",
        name: "Cashew Butter",
        description: "Creamy, delicious cashew butter made from 100% premium cashews. No added oils or preservatives.",
        price: "1800.00",
        category: "butter",
        weight: "25kg to 250kg",
        image: "/images/products/cashew-butter/1.png",
        images: [
          "/images/products/cashew-butter/1.png",
          "/images/products/cashew-butter/2.png",
          "/images/products/cashew-butter/3.png",
          "/images/products/cashew-butter/4.png"
        ],
        inStock: true,
        isOrganic: false,
        grade: "Premium",
        tags: ["butter", "smooth", "natural", "pure"]
      }
    ];

    sampleProducts.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category === category
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    // Ensure images is always an array, defaulting to empty array if not provided
    const images = insertProduct.images ?? [];
    
    const product: Product = { 
      ...insertProduct, 
      id,
      images, // This ensures images is always an array
      inStock: insertProduct.inStock ?? true,
      isOrganic: insertProduct.isOrganic ?? false,
      grade: insertProduct.grade ?? null,
      tags: insertProduct.tags ?? null
    };
    
    this.products.set(id, product);
    return product;
  }

  // Order methods
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      ...insertOrder,
      id,
      customerPhone: insertOrder.customerPhone ?? null,
      status: "pending",
      createdAt: new Date()
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  // Inquiry methods
  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = randomUUID();
    const inquiry: Inquiry = {
      ...insertInquiry,
      id,
      country: insertInquiry.country ?? null,
      company: insertInquiry.company ?? null,
      subject: insertInquiry.subject ?? null,
      createdAt: new Date()
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }
}

export const storage = new MemStorage();
