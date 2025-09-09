import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './Layoutcomponents/Nav';
import Footer from './Layoutcomponents/Footer';
import { Grid } from './Layoutcomponents/ParkingGrid';
import { Billing } from './BillingComponents/Billing';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Grid />} />
        <Route path="/billing" element={<Billing />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
