import type { Metadata } from "next";
import LandingPage from "@/components/landing-page";

export const metadata: Metadata = {
  title: "MousApp | Research Operations & Lifecycle Management Platform",
  description:
    "Manage research facility operations, task scheduling, health tracking, protocol management, and compliance reporting in one connected platform. 50% time saved. 100% audit ready.",
};

export default function MousAppHome() {
  return <LandingPage brand="MousApp" />;
}
