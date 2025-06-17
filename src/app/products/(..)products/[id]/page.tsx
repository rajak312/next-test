import React from "react";
import Image from "next/image";
import { Product } from "@/app/@types/products";

export default async function ProductModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const product: Product = await res.json();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(2px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: "1rem",
      }}
    >
      <div
        style={{
          backgroundColor: "var(--modal-bg-color, #1f2937)",
          color: "var(--modal-text-color, #f9fafb)",
          padding: "2rem",
          borderRadius: "1rem",
          boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
          width: "100%",
          maxWidth: "500px",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Image
          src={product.images?.[0]}
          alt={product.title}
          width={300}
          height={300}
          style={{
            borderRadius: "0.75rem",
            marginBottom: "1rem",
            objectFit: "cover",
          }}
        />
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          {product.title}
        </h2>
        <p style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
          Price: ₹{product.price}
        </p>
        <p style={{ marginBottom: "1.5rem", lineHeight: "1.4" }}>
          {product.description}
        </p>

        <form action="/products" style={{ width: "100%" }}>
          <button
            type="submit"
            style={{
              display: "block",
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              backgroundColor: "#3b82f6",
              color: "#fff",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
            }}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
}
