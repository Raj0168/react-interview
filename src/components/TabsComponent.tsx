import { useEffect, useState } from "react";

interface TabEntry {
  id: string;
  label: string;
  content: React.ReactNode;
}

const tabs: TabEntry[] = [
  {
    id: "home",
    label: "Home",
    content: (
      <div>
        <h2>Welcome to Home!</h2>
        <p>
          This is the content for the Home tab. You can find general information
          here.
        </p>
      </div>
    ),
  },
  {
    id: "profile",
    label: "Profile",
    content: (
      <div>
        <h2>User Profile</h2>
        <p>Manage your profile settings and view your personal information.</p>
        <ul>
          <li>Name: John Doe</li>
          <li>Email: john.doe@example.com</li>
          <li>Location: Anytown, USA</li>
        </ul>
      </div>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    content: (
      <div>
        <h2>Application Settings</h2>
        <p>Adjust your application preferences and configurations here.</p>
        <label>
          <input type="checkbox" /> Enable notifications
        </label>
      </div>
    ),
  },
];

export default function TabsComponent() {
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = sessionStorage.getItem("activeTab");
    return savedTab || tabs[0].id;
  });

  useEffect(() => {
    sessionStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const currentTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div>
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid #fff",
          backgroundColor: "beige",
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: "12px 15px",
              backgroundColor: activeTab === tab.id ? "#ffffff" : "transparent",
              color: activeTab === tab.id ? "blue" : "#333",
              fontWeight: activeTab === tab.id ? "bold" : "normal",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "20px", backgroundColor: "#ddd", color: "#000" }}>
        {currentTabContent}
      </div>
    </div>
  );
}
