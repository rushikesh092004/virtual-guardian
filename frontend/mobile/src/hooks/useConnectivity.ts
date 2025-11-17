import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

export function useConnectivity() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  return online;
}
