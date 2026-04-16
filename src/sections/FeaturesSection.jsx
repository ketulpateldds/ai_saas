import FlavorSlider from "../components/FlavorSlider";
import FlavorTitle from "../components/FlavorTitle";

function FeaturesSection() {
  return (
    <section className="features-section flavor-section overflow-hidden">
      <div className="feature-track h-full flex lg:flex-row flex-col items-center relative">
        <div className="lg:w-[57%] flex-none h-80 lg:h-full md:mt-20 xl:mt-0 z-10">
          <FlavorTitle />
        </div>
        <div className="h-full z-20 lg:-ml-20">
          <FlavorSlider />
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
