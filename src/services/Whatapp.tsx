import whatsapp from "../assets/whatsapp.png";

function Whatapp() {
  return (
    <>
      <div className="fixed bottom-10 right-4 z-50">
        <a
          href="https://wa.me/919009776655?text= Hello I would like to order a pizza?"
          target="_blank"
          className="hover:opacity-75 transition-opacity duration-300"
        >
          <img src={whatsapp} alt="WhatsApp" className="w-20 h-20" />
        </a>
      </div>
    </>
  );
}

export default Whatapp;
