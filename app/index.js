import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import * as Location from "expo-location";
import { Colors, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";
import { COLORS } from "../constants";

const Home = () => {
  const rouer = useRouter();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      const isAndroid = Platform.OS == "android";
      const location = await Location.getCurrentPositionAsync({
        accuracy: isAndroid ? Location.Accuracy.Low : Location.Accuracy.Lowest,
      });

      setLocation(location);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View
        style={{ padding: 2, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Fetching Your Location...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerTitle: "",
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
          ),
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
          ),
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
            height: "auto",
          }}
        >
          <Welcome />
          <Popularjobs />
          <Nearbyjobs location={location} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
