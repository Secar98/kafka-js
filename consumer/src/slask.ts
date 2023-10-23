// (async() => {
//     try {
//       await producer.connect();
//         await producer.send({
//           topic: "chat-topic",
//           messages: [
//             { value: JSON.stringify({ "message": "TEST" }) }
//           ]
//         });
//     } catch (e) {
//       console.error("Unable to prompt", e);
//     } 
//   }
// )();