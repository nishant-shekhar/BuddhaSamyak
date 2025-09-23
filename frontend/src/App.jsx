import React from "react";
import { Routes, Route } from "react-router-dom";
import ParallaxLayout from "./components/ParallaxLayout";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ExhibitionsCarousel from "./components/ExhibitionsCarousel";
import ImgGrid from "./components/ImgGrid";
import Footer from "./components/Footer";
import MembershipBanner from "./components/MembershipBanner";
import VisitTheMuseum from "./components/VisitTheMuseum";
import Amenities from "./components/Amenities";
import SignupBanner from "./components/SignupBanner";
import MuseumCollectionCarousel from "./components/MuseumCollectionCarousel";
import TicketBookingForm from "./components/TicketBookingForm";
import AboutMuseum from "./components/AboutMuseum";
import MainAdmin from "./AdminRedesign/MainAdmin";
import Login from "./pages/Login";
import ExhibitionPage from "./components/ExhibitionPage";
import AllCollectionPage from "./components/AllCollectionPage";
import TravelPage from "./components/TravelPage"; 
import ScrollToTop from "./components/ScrollToTop";
import Gallery from "./pages/Gallery";
import DevelopersTeam from "./pages/DevelopersTeam";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ContactUs from "./components/ContactUs";
import LeadershipContributors from "./pages/Leadership&Contributors.jsx"

const MainPage = () => (
  <ParallaxLayout>
    <div className="min-h-screen">
      <Home />
      <ExhibitionsCarousel />
      <VisitTheMuseum />
      <MembershipBanner />
      <Amenities />
      <SignupBanner />
      <MuseumCollectionCarousel />
      <ImgGrid />
      <Footer />
      
    </div>
  </ParallaxLayout>
);

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/book-ticket" element={<TicketBookingForm />} />
        <Route path="/about-museum" element={<AboutMuseum />} />
        <Route path="/admin" element={<MainAdmin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/exhibitions" element={<ExhibitionPage />} />
        <Route path="/collection" element={<AllCollectionPage />} />
        <Route path="/travel" element={<TravelPage />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/developers-team" element={<DevelopersTeam />} />
        <Route path="/policy" element={<PrivacyPolicy />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/LeadershipContributors" element={<LeadershipContributors />} />
      </Routes>
    </>
  );
};

export default App;
