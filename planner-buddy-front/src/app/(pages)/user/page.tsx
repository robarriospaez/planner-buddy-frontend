import React from "react";
import "@/styles/ai-loader.css";
import Image from "next/image";

const User: React.FC = () => {
  return (
    <section className="bg-violet-400 grid place-items-center flex-1 rounded-lg">
      <h1>Aquí podrás ver la configuración de tu perfil</h1>

      <div className="shimmer-text text-center text-violet-900 flex flex-row items-center justify-center">
        Cargando recomendaciones...
        <div id="preloader6">
          <div>
            {[...Array(4)].map((_, index) => (
              <span key={index} className="shimmer-text sparkle"></span>
            ))}
          </div>
        </div>
      </div>
      <Image
        src="https://plannerbyddy.s3.us-east-2.amazonaws.com/mealsoptimizadas/tartadeespinacaconensalada.webp"
        alt="user"
        width={200}
        height={200}
        className="mb-2 rounded"
      />
    </section>
  );
};

export default User;
