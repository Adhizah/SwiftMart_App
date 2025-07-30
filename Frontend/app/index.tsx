import { Redirect } from "expo-router";
import "@/global.css";

const index = () => {
  return <Redirect href="/(root)/(tabs)/Feed" />;
};

export default index;
