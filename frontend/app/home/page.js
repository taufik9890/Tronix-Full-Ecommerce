import Container from "@/components/container/Container";
import Category from "@/components/home/Category";
import FeatureProduct from "@/components/home/FeatureProduct";
import FlashSale from "@/components/home/FlashSale";
import Hero from "@/components/home/Hero";
import NewArrivals from "@/components/home/NewArrivals";
import PartnerCompany from "@/components/home/PartnerCompany";
import QualityBanner from "@/components/home/QualityBanner";
import TopRatedProducts from "@/components/home/TopRatedProducts";
import React from "react";

async function getFlashSaleTime() {
  let data = await fetch(
    "http://localhost:8000/api/v1/product/allflashsaletime"
  );
  let times = await data.json();
  return times;
}

const HomePage = async () => {
  let data = await getFlashSaleTime();

  return (
    <>
      <Container>
        <Hero />
        <Category />
        <NewArrivals />
        <FlashSale time={data[0].time} />
        <PartnerCompany />
        <QualityBanner />
        <FeatureProduct />
        <TopRatedProducts />
      </Container>
    </>
  );
};

export default HomePage;
