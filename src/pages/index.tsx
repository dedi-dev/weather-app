import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { Raleway } from "next/font/google";
import axios from "axios";

const raleway = Raleway({ subsets: ["latin"] });

type CurrentCondition = {
  weather: string;
  temp_c: number;
  temp_f: number;
  wind_mph: number;
  wind_kph: number;
  humidity: number;
  vis_km: number;
  vis_miles: number;
  pressure_mb: number;
  pressure_in: number;
};

type ForecastCondition = {
  weather: string;
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  wind_mph: number;
  wind_kph: number;
  avghumidity: number;
  avgvis_km: number;
  avgvis_miles: number;
  pressure_mb: number;
  pressure_in: number;
};

type Weather = {
  location_name: string;
  current: CurrentCondition;
  forecast: ForecastCondition[];
};

export const getServerSideProps: GetServerSideProps<{
  weather: Weather;
}> = async () => {
  let weather: Weather = {
    location_name: "",
    current: {
      weather: "",
      temp_c: 0,
      temp_f: 0,
      wind_mph: 0,
      wind_kph: 0,
      humidity: 0,
      vis_km: 0,
      vis_miles: 0,
      pressure_mb: 0,
      pressure_in: 0,
    },
    forecast: [],
  };
  const res = await axios.get(
    `https://api.weatherapi.com/v1/forecast.json?key=cac7ff432fbb4ca986321136230807&q=paris&days=3`
  );
  if (res?.data) {
    weather = res?.data;
  }
  return { props: { weather } };
};

export default function Home({
  weather,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const testAPI = () => {
    const options = {
      method: "GET",
      url: "https://api.weatherapi.com/v1/search.json?key=cac7ff432fbb4ca986321136230807&q=karawang",
      // https://api.weatherapi.com/v1/forecast.json?key=cac7ff432fbb4ca986321136230807&q=paris&days=3
    };

    axios.request(options).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <main
      className={`p-0 box-border min-w-screen min-h-screen flex flex-col items-center bg-white text-black px-[36px] ${raleway.className}`}
    ></main>
  );
}
