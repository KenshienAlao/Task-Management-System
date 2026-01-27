import ThemeToggle from "@/app/components/theme/page";
import Header from "./ui/header/page";
import TabNavigation from "./ui/tabNavigation/page";
import Dashboard from "./page";

export default function RootLayout() {
  return (
    <div>
      <ThemeToggle />
      <header>
        <Header />
        <TabNavigation />
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  );
}
