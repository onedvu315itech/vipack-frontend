import Footer from "layout/Home/Footer";
import SlideShow from "layout/Home/SlideShow";
import Header from "layout/Home/Header";
import HotSale from "layout/Home/HotSale";
import NewArrivals from "layout/Home/NewArrivals";
import PreProduct from "layout/Home/PreProduct";
import MessengerChat from "api/messenger";

const HomePage = () => {
    return (
        <>
            <Header />
            <SlideShow />
            <HotSale />
            <div id="new-arrivals"><NewArrivals /></div>
            <div id="pre-products"><PreProduct /></div>
            <MessengerChat />
            <Footer />
        </>
    )
}

export default HomePage;