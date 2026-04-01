import { Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Dashboard from "@/pages/Dashboard";
import KnowledgeBase from "@/pages/KnowledgeBase";
import Settings from "@/pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/knowledge-base" element={<KnowledgeBase />} />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/skills"
          element={
            <div className="py-12 text-center text-muted-foreground">
              <h1 className="text-2xl font-bold mb-2">Skills</h1>
              <p className="text-sm">Skills browser coming soon.</p>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}
