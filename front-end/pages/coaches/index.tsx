import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import router from "next/router";
import NavbarSheet from "@/components/NavbarSheet";

export interface Coach {
  id: number;
  name: string;
  job: "Coach" | "Assistant Coach";
  pictureUrl?: string;
}

const coaches: Coach[] = [
  {
    id: 1,
    name: "Phil Jackson",
    job: "Coach",
    pictureUrl: "https://i.imgur.com/1O6t7Hh.jpeg",
  },
  {
    id: 2,
    name: "Steve Kerr",
    job: "Coach",
    pictureUrl: "https://i.imgur.com/1O6t7Hh.jpeg",
  },
  {
    id: 3,
    name: "Michael Scott",
    job: "Assistant Coach",
    pictureUrl: "https://i.imgur.com/1O6t7Hh.jpeg",
  },
  {
    id: 4,
    name: "Dwight Schrute",
    job: "Assistant Coach",
    pictureUrl: "https://i.imgur.com/1O6t7Hh.jpeg",
  },
  {
    id: 5,
    name: "Tony Robbins",
    job: "Coach",
    pictureUrl: "https://i.imgur.com/1O6t7Hh.jpeg",
  },
];

const Coaches: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <Head>
        <title>Coaches | Manchester Shitty</title>
        <meta name="description" content="Meet the coaches of Manchester Shitty" />
        <link rel="icon" href="/images/shittylogo.png" />
      </Head>

      <div className="min-h-screen bg-zinc-900 py-8">
        <div className="absolute top-12 right-8">
          <NavbarSheet />
        </div>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-8">
            <Image
              src="/images/shittylogo.svg"
              alt="Manchester Shitty Logo"
              width={100}
              height={100}
              priority
              draggable={false}
              className="mr-4 cursor-pointer"
              onClick={() => router.push("/")}
            />
            <h1 className="text-6xl font-bold text-yellow-600 font-bebas">
              Our Coaching Staff
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coaches.map((coach, index) => (
              <div
                key={coach.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-700 transform ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <img
                  src={coach.pictureUrl || "/default-coach-image.png"}
                  alt={coach.name}
                  className="w-3/6 ml-28 h-56 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{coach.name}</h2>
                  <p className="text-gray-600">
                    <strong>Job:</strong> {coach.job}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Coaches;
