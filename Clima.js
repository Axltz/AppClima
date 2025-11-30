import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';

export default class Clima extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      ciudad: "",
      temperatura: "0",
      viento: "0",
      lluvia: "0",
      probabilidadDeLluvia: "0",
      precipitacion: "0"
    };
  }

  render() {
    const buscar = () => {
      _this = this;
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var temp = JSON.parse(xhttp.responseText);
          _this.setState({ 
            ciudad: temp.location.name,
            temperatura: temp.current.temp_c,
            viento: temp.current.wind_kph,
            precipitacion: temp.current.precip_mm,
            probabilidadDeLluvia: temp.forecast.forecastday[0].day.daily_chance_of_rain,
            iconoCondicion: "https:" + temp.current.condition.icon,
            textoCondicion: temp.current.condition.text
          });
        }
      };
      xhttp.open("GET", `http://api.weatherapi.com/v1/forecast.json?key=b2c4206bcbf144a6b6d43434252708&q=${this.state.ciudad}&days=1&aqi=no&alerts=no`, true);
      xhttp.send();
    }

    return (
      <View style={{ backgroundColor: "lightblue", width: "100%", height: "100%" }}>
        
        <Text style={{ fontSize: 40, color: "white", textAlign: "center", marginTop: 50 }}>
          App Clima
        </Text>

        <View style={{ borderColor: "white", borderWidth: 4, width: 200, height: 50, marginLeft: 105, marginTop: 30, borderRadius: 20, justifyContent: "center", paddingHorizontal: 10 }}>
          <TextInput
            value={this.state.ciudad}
            onChangeText={(texto) => this.setState({ ciudad: texto })}
            style={{ fontSize: 15, color: "black" }}
            placeholder="Ciudad..."
            placeholderTextColor="gray"
          />
        </View>

        <View style={{ marginTop: -40, marginLeft: 260 }}>
          <TouchableOpacity onPress={buscar}>
            <Image style={{ width: 30, height: 30 }} source={require("./Img/Lupa.png")} />    
          </TouchableOpacity>
        </View> 

        <View style={{ marginTop: 20, alignItems: "center", justifyContent: "center" }}> 
          <Image
            style={{ width: 200, height: 200 }}
            source={require("./Img/Nube.png")}
          /> 
          <Text style={{ marginTop: -118, fontSize: 40, color: "white", fontWeight: "bold" }}>
            {this.state.temperatura}°C
          </Text>
        </View>

        <View style={{ marginTop: 80, marginLeft: 80, flexDirection: "row", justifyContent: "space-between", width: 280 }}>
          <View style={{ marginLeft: -30 }}>
            <Image style={{ width: 80, height: 80 }} source={require("./Img/viento.png")} />
            <Text style={{ fontSize: 25, color: "white", marginTop: 5 }}>
              {this.state.viento} km/h
            </Text>
          </View>
          <View style={{ marginLeft: -30 }}>
            <Image style={{ width: 80, height: 80 }} source={require("./Img/lluvia.png")} />
            <Text style={{ fontSize: 25, color: "white", marginTop: 5 }}>
              {this.state.precipitacion} mm
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 20, marginRight: 230, alignItems: "center" }}>
          <Image style={{ width: 80, height: 80 }} source={{uri: this.state.iconoCondicion}} />
          <Text style={{ fontSize: 18, color: "white", textAlign: "center", marginBottom: 5 }}>
            {this.state.textoCondicion}
          </Text>

          <View>
            <Text style={{ fontSize: 25, color: "white" }}>
              {this.state.probabilidadDeLluvia}%
            </Text>
          </View>
        </View>

      </View>
    );
  }
}
