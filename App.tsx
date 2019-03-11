import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

export default class App extends React.Component {
  state = { text: "", scrollOffset: 0 };

  render() {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: "white" }}
        onScroll={e => this.setState({ scrollOffset: e.nativeEvent.contentOffset.y })}
        scrollEventThrottle={1}
      >
        {this.renderHeader()}
        {this.renderContent()}
      </ScrollView>
    );
  }

  renderHeader() {
    const headerHeight = 240;
    return (
      <View
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
      </View>
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
