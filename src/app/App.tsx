import { AuthProvider } from "./providers/AuthProvider";
import { QueryProvider } from "./providers/QueryProvider";
import { AppRouter } from "./router";

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <AppRouter />;
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;
