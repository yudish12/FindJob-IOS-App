import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "./nearbyjobs.style";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import { COLORS, SIZES } from "../../../constants";
import { useFetchNearby } from "../../../hooks/useFetchNearby";

const Nearbyjobs = ({ location }) => {
  if (!location) {
    return (
      <View>
        <Text>Location not provided</Text>
      </View>
    );
  }

  const { data, isLoading, error } = useFetchNearby(
    location.coords.latitude,
    location.coords.longitude
  );

  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearbyjobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator />
        ) : error ? (
          <Text>Something Went Wrong</Text>
        ) : (
          data?.map((e) => (
            <NearbyJobCard
              job={e}
              key={`nearby-job-${e.job_id}`}
              handleNavigate={() => router.push(`/job-details/${e.job_id}`)}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Nearbyjobs;
