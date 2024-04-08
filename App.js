import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useEffect, useState  } from 'react';
import io from 'socket.io-client';
import { Socket } from 'socket.io-client';


export default function App () {

  const [inputValue, setInputValue] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const socket = io("http://172.31.29.52:80");
  
  useEffect(() => {

    socket.on("RecivedChatMessage", msg => {
      setChatMessages(prevMessages => [...prevMessages, msg]);
    });
  },[]); 

  function submitChatMessage() {
    socket.emit('chatMessage', inputValue);
    setInputValue("");

  }
  const chatMessagesShow = chatMessages.map(chatMessage => (
    <Text key={chatMessage}>{chatMessage}</Text>
  ));
  return (
    <View style={styles.container}>
    {chatMessagesShow}
      <TextInput
      style={{heigh:40, borderWidth: 2}}
        autoCorrect={false}
        onSubmitEditing={() => submitChatMessage()}
        value={inputValue}
        onChangeText={text => setInputValue(text)}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
