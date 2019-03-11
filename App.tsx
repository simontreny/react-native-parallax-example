import React from "react";
import { Animated, Image, Text, View } from "react-native";

export default class App extends React.Component {
  state = { text: "", scrollOffset: new Animated.Value(0) };

  render() {
    const scrollEvent = Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollOffset } } }],
      { useNativeDriver: true }
    );
    return (
      <Animated.ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        onScroll={scrollEvent}
        scrollEventThrottle={1}
      >
        {this.renderHeader()}
        {this.renderContent()}
      </Animated.ScrollView>
    );
  }

  renderHeader() {
    const headerHeight = 240;
    return (
      <Animated.View
        style={{
          height: headerHeight,
          transform: [{ translateY: this.state.scrollOffset }],
          zIndex: 100,
        }}
      >
        <Image
          style={[{ width: "100%", height: "100%" }]}
          source={require("./cover.jpg")}
        />
      </Animated.View>
    );
  }

  renderContent() {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "800", marginBottom: 16 }}>
          BORDEAUX
        </Text>
        <Text>{this.state.text}</Text>
      </View>
    );
  }

  async componentDidMount() {
    const res = await fetch("https://loripsum.net/api/plaintext");
    this.setState({ text: await res.text() });
  }
}
