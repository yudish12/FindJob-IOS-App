import React from "react";
import { Modal, Text, View, Image, StyleSheet } from "react-native";

const ImageModal = ({ visible, setVisible }) => {
  return (
    <Modal
      presentationStyle={"pageSheet"}
      visible={visible !== null}
      onRequestClose={() => setVisible(null)}
      animationType="slide"
    >
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={{
            uri: visible,
          }}
          resizeMode="contain"
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 40,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
});

export default ImageModal;
