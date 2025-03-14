import { SOCKETIO } from "./socketio.js";

export const SOCKETS_CONFIG = Object.freeze({
  SOCKETIO,
});

//WS eventually
// methodBody = b.blockStatement([
//   b.expressionStatement(
//     b.assignmentExpression(
//       "=",
//       b.memberExpression(b.thisExpression(), b.identifier("wss")),
//       b.newExpression(
//         b.memberExpression(
//           b.identifier("WebSocket"),
//           b.identifier("Server"),
//         ),
//         [
//           b.objectExpression([
//             b.objectProperty(
//               b.identifier("server"),
//               b.memberExpression(
//                 b.thisExpression(),
//                 b.identifier("server"),
//               ),
//             ),
//           ]),
//         ],
//       ),
//     ),
//   ),
//   b.expressionStatement(
//     b.callExpression(
//       b.memberExpression(
//         b.memberExpression(b.thisExpression(), b.identifier("wss")),
//         b.identifier("on"),
//       ),
//       [
//         b.stringLiteral("connection"),
//         b.arrowFunctionExpression(
//           [b.identifier("ws")],
//           b.blockStatement([
//             b.expressionStatement(
//               b.callExpression(
//                 b.memberExpression(
//                   b.identifier("console"),
//                   b.identifier("log"),
//                 ),
//                 [b.stringLiteral("WebSocket client connected")],
//               ),
//             ),
//           ]),
//         ),
//       ],
//     ),
//   ),
// ]);
