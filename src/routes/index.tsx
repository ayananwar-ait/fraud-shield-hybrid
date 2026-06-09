import { createFileRoute } from "@tanstack/react-router";
import { FraudDetectionApp } from "@/components/fraud/FraudDetectionApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SentinelAI — Real-Time Financial Fraud Detection" },
      {
        name: "description",
        content:
          "A hybrid statistical machine learning framework for adaptive financial fraud detection in real time. Try the live AI demo.",
      },
      { property: "og:title", content: "SentinelAI — AI Fraud Detection" },
      {
        property: "og:description",
        content:
          "Detect suspicious transactions instantly with a hybrid statistical + ML framework. Live interactive demo.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: FraudDetectionApp,
});
