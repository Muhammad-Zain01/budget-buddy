"use client";

import { useState } from "react";
import { PrimaryCategories } from "@/constants/categories";
import AccountCard from "@/components/accounts/account-card";
import AddButton from "@/components/add-button";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("income");
  const [categories] = useState(PrimaryCategories);
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 gap-6 p-6">
        <div className="bg-background rounded-lg flex justify-end">
          <AddButton label="Add Account" />
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories
            .filter((category) => category.type === activeTab)
            .map((category, index) => (
              <AccountCard key={index} account={category} />
            ))}
        </div>
      </main>
    </div>
  );
}
