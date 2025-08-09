import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";

const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

async function seedDatabase() {
  try {
    console.log("🌱 Seeding database...");
    
    // Run the seed function
    await client.mutation(api.seed.seedDatabase);
    
    console.log("✅ Database seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

export { seedDatabase }; 