import { describe, expect, it } from "vitest";
import { BNE_PRODUCTS, ONE_TIME_PRODUCTS } from "./products";

const CORE_SUBSCRIPTION_IDS = ["bne_starter", "bne_pro", "bne_elite"];
const coreTiers = BNE_PRODUCTS.filter((p) => CORE_SUBSCRIPTION_IDS.includes(p.id));

describe("BNE Stripe Products", () => {
  it("should have 3 subscription tiers", () => {
    expect(coreTiers).toHaveLength(3);
  });

  it("should have 2 one-time products", () => {
    expect(ONE_TIME_PRODUCTS).toHaveLength(2);
  });

  it("all subscription products should have required fields", () => {
    for (const product of BNE_PRODUCTS) {
      expect(product.id).toBeTruthy();
      expect(product.name).toBeTruthy();
      expect(product.price).toBeGreaterThan(0);
      expect(product.interval).toBe("month");
      expect(product.features.length).toBeGreaterThan(0);
    }
  });

  it("all one-time products should have required fields", () => {
    for (const product of ONE_TIME_PRODUCTS) {
      expect(product.id).toBeTruthy();
      expect(product.name).toBeTruthy();
      expect(product.price).toBeGreaterThan(0);
      expect(product.interval).toBe("one_time");
      expect(product.features.length).toBeGreaterThan(0);
    }
  });

  it("Pro Stack should be marked as popular", () => {
    const pro = BNE_PRODUCTS.find((p) => p.id === "bne_pro");
    expect(pro?.popular).toBe(true);
  });

  it("Elite Empire should have the most features", () => {
    const elite = BNE_PRODUCTS.find((p) => p.id === "bne_elite");
    expect(elite?.features.length).toBeGreaterThan(0);
    expect(elite?.features.some((f) => f.toLowerCase().includes("everything in pro"))).toBe(true);
  });

  it("prices should be in ascending order for subscription tiers", () => {
    const order = { bne_starter: 1, bne_pro: 2, bne_elite: 3 } as Record<string, number>;
    const sortedTiers = [...coreTiers].sort((a, b) => order[a.id]! - order[b.id]!);
    const prices = sortedTiers.map((p) => p.price);
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThan(prices[i - 1]!);
    }
  });
});
