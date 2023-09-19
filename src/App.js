import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App(){
  return (
    <div className="h-screen">
      <Navbar />
      <Sidebar />
      <Footer />
    </div>

  )
}

export default App;