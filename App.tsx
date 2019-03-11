import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

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
    const { scrollOffset } = this.state;
    const expandedHeaderHeight = 240;
    const collapsedHeaderHeight = 64;
    const titleHeight = 44;
    const scrollSpan = expandedHeaderHeight - collapsedHeaderHeight;

    return (
      <Animated.View
        style={{
          height: expandedHeaderHeight,
          zIndex: 100,
          overflow: "hidden",
          transform: [
            {
              translateY: Animated.subtract(
                scrollOffset,
                scrollOffset.interpolate({
                  inputRange: [0, scrollSpan],
                  outputRange: [0, scrollSpan],
                  extrapolate: "clamp",
                })
              ),
            },
          ],
        }}
      >
        <Animated.Image
          style={{
            width: "100%",
            height: "100%",
            transform: [
              {
                translateY: scrollOffset.interpolate({
                  inputRange: [0, scrollSpan],
                  outputRange: [0, scrollSpan / 2],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
          source={require("./cover.jpg")}
        />
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "black",
              opacity: scrollOffset.interpolate({
                inputRange: [scrollSpan / 2, scrollSpan],
                outputRange: [0, 0.85],
                extrapolate: "clamp",
              }),
            },
          ]}
        />
        <Animated.Text
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 16,
            fontSize: 16,
            fontWeight: "bold",
            textAlign: "center",
            color: "white",
            transform: [
              {
                translateY: scrollOffset.interpolate({
                  inputRange: [scrollSpan, scrollSpan + titleHeight],
                  outputRange: [titleHeight, 0],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          BORDEAUX
        </Animated.Text>
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
