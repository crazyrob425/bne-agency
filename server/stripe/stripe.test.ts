import { describe, expect, it } from "vitest";
import { BNE_PRODUCTS, ONE_TIME_PRODUCTS } from "./products";

describe("BNE Stripe Products", () => {
  it("should have 3 subscription tiers", () => {
    expect(BNE_PRODUCTS).toHaveLength(3);
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
    const starter = BNE_PRODUCTS.find((p) => p.id === "bne_starter");
    expect((elite?.features.length ?? 0)).toBeGreaterThan(
      starter?.features.length ?? 0
    );
  });

  it("prices should be in ascending order for subscription tiers", () => {
    const prices = BNE_PRODUCTS.map((p) => p.price);
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThan(prices[i - 1]!);
    }
  });
});
