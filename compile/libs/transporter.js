var _0x2e1a=['creating\x20Transporter\x20api','libs/Transporter.js','createWriteStream','var\x20_0xe3fa=[\x27log\x27,\x27catch\x27,\x27Error\x20occured!\x27,\x27string\x27,\x27notify\x27,\x27object\x27,\x27token\x27,\x27User\x20not\x20connected!\x27,\x27SOCKET_IO\x27,\x27SOCKET_USERS\x27,\x27CONNECTED_USERS\x27,\x27MODEL_UPDATE_TIME\x27,\x27emit\x27,\x27length\x27,\x27AuthUser\x27,\x27loggedInUsers\x27,\x27then\x27,\x27keys\x27,\x27map\x27,\x27push\x27];(function(_0x1e6ee5,_0x32845b){var\x20_0x4179b2=function(_0x957766){while(--_0x957766){_0x1e6ee5[\x27push\x27](_0x1e6ee5[\x27shift\x27]());}};_0x4179b2(++_0x32845b);}(_0xe3fa,0xa8));var\x20_0x446a=function(_0x599460,_0xd0e4c0){_0x599460=_0x599460-0x0;var\x20_0x138fb3=_0xe3fa[_0x599460];return\x20_0x138fb3;};var\x20db=imports(\x27db\x27);exports[\x27init\x27]=function(){global[_0x446a(\x270x0\x27)]={};global[_0x446a(\x270x1\x27)]={};global[_0x446a(\x270x2\x27)]={};global[_0x446a(\x270x3\x27)]={};return;};exports[_0x446a(\x270x4\x27)]=function(_0x5e75e6,_0x2d1404,_0x1d5fec=null){var\x20_0x186a06=SOCKET_IO;if(_0x1d5fec!==null&&typeof\x20_0x1d5fec==\x27object\x27){if(Object[\x27keys\x27](db)[_0x446a(\x270x5\x27)]!==0x0){var\x20_0x508b32=imports(_0x446a(\x270x6\x27));_0x508b32[_0x446a(\x270x7\x27)](_0x1d5fec)[_0x446a(\x270x8\x27)](function(_0x1e5f90){if(_0x1e5f90[_0x446a(\x270x5\x27)]!==0x0){var\x20_0xf9d3a6=[];var\x20_0x2051ab=_0x1e5f90[0x0][\x27token\x27];Object[_0x446a(\x270x9\x27)](SOCKET_USERS)[_0x446a(\x270xa\x27)](function(_0x4fdca1,_0x471549){if(SOCKET_USERS[_0x4fdca1]==_0x2051ab){_0xf9d3a6[_0x446a(\x270xb\x27)](_0x4fdca1);}});if(_0xf9d3a6[\x27length\x27]!==0x0){_0xf9d3a6[_0x446a(\x270xa\x27)](function(_0x1a9f2b,_0x5469f5){CONNECTED_USERS[_0x1a9f2b][\x27emit\x27](_0x5e75e6,_0x2d1404);});}else{console[_0x446a(\x270xc\x27)](\x27User\x20not\x20connected!\x27);}}})[_0x446a(\x270xd\x27)](function(_0x22055e){console[_0x446a(\x270xc\x27)](_0x446a(\x270xe\x27),_0x22055e);});}}else\x20if(_0x1d5fec!==null&&typeof\x20_0x1d5fec==_0x446a(\x270xf\x27)){if(Object[\x27keys\x27](db)[\x27length\x27]!==0x0){var\x20_0x508b32=imports(\x27AuthUser\x27);_0x508b32[_0x446a(\x270x7\x27)](_0x1d5fec)[_0x446a(\x270x8\x27)](function(_0x53b898){if(_0x53b898[_0x446a(\x270x5\x27)]!==0x0){var\x20_0x227a49=null;var\x20_0x1121fa=_0x53b898[0x0][\x27token\x27];Object[_0x446a(\x270x9\x27)](SOCKET_USERS)[_0x446a(\x270xa\x27)](function(_0x553677,_0x41e165){if(SOCKET_USERS[_0x553677]==_0x1121fa){_0x227a49=_0x553677;}});if(_0x227a49!==null){CONNECTED_USERS[_0x227a49][_0x446a(\x270x4\x27)](_0x5e75e6,_0x2d1404);}else{console[_0x446a(\x270xc\x27)](\x27User\x20not\x20connected!\x27);}}})[_0x446a(\x270xd\x27)](function(_0x3c58ea){console[_0x446a(\x270xc\x27)](\x27Error\x20occured!\x27,_0x3c58ea);});}}else{_0x186a06[_0x446a(\x270x4\x27)](_0x5e75e6,_0x2d1404);}};exports[_0x446a(\x270x10\x27)]=function(_0x3229d1,_0x251a1f,_0x20ffde=null){var\x20_0x21f1a9=NOTIFICATION_SOCKET_IO;if(_0x20ffde!==null&&typeof\x20_0x20ffde==_0x446a(\x270x11\x27)){if(Object[_0x446a(\x270x9\x27)](db)[_0x446a(\x270x5\x27)]!==0x0){var\x20_0x427eae=imports(\x27AuthUser\x27);_0x427eae[_0x446a(\x270x7\x27)](_0x20ffde)[_0x446a(\x270x8\x27)](function(_0x257719){if(_0x257719[_0x446a(\x270x5\x27)]!==0x0){var\x20_0x3b4743=[];var\x20_0x55e9e7=_0x257719[0x0][_0x446a(\x270x12\x27)];Object[_0x446a(\x270x9\x27)](SOCKET_USERS)[\x27map\x27](function(_0x265324,_0x5a93df){if(SOCKET_USERS[_0x265324]==_0x55e9e7){_0x3b4743[_0x446a(\x270xb\x27)](_0x265324);}});if(_0x3b4743[\x27length\x27]!==0x0){_0x3b4743[_0x446a(\x270xa\x27)](function(_0x598d7a,_0x1bf180){CONNECTED_USERS[_0x598d7a][_0x446a(\x270x4\x27)](_0x3229d1,_0x251a1f);});}else{console[\x27log\x27](\x27User\x20not\x20connected!\x27);}}})[_0x446a(\x270xd\x27)](function(_0x58edb6){console[_0x446a(\x270xc\x27)](_0x446a(\x270xe\x27),_0x58edb6);});}}else\x20if(_0x20ffde!==null&&typeof\x20_0x20ffde==\x27string\x27){if(Object[_0x446a(\x270x9\x27)](db)[_0x446a(\x270x5\x27)]!==0x0){var\x20_0x427eae=imports(_0x446a(\x270x6\x27));_0x427eae[_0x446a(\x270x7\x27)](_0x20ffde)[_0x446a(\x270x8\x27)](function(_0x11ccdb){if(_0x11ccdb[_0x446a(\x270x5\x27)]!==0x0){var\x20_0x54aedc=null;var\x20_0x1cd1ae=_0x11ccdb[0x0][_0x446a(\x270x12\x27)];Object[_0x446a(\x270x9\x27)](SOCKET_USERS)[\x27map\x27](function(_0xe79f52,_0x16f067){if(SOCKET_USERS[_0xe79f52]==_0x1cd1ae){_0x54aedc=_0xe79f52;}});if(_0x54aedc!==null){CONNECTED_USERS[_0x54aedc][_0x446a(\x270x4\x27)](_0x3229d1,_0x251a1f);}else{console[_0x446a(\x270xc\x27)](_0x446a(\x270x13\x27));}}})[_0x446a(\x270xd\x27)](function(_0x222ddb){console[_0x446a(\x270xc\x27)](_0x446a(\x270xe\x27),_0x222ddb);});}}else{Object[_0x446a(\x270x9\x27)](NOTIFICATION_SOCKET_USERS)[\x27map\x27](function(_0x5e0313,_0x114bc1){NOTIFICATION_CONNECTED_USERS[_0x5e0313][\x27emit\x27](_0x3229d1,_0x251a1f);});}};','create','log'];(function(_0x47c9b0,_0x2642f7){var _0x5ed4f8=function(_0x239c9d){while(--_0x239c9d){_0x47c9b0['push'](_0x47c9b0['shift']());}};_0x5ed4f8(++_0x2642f7);}(_0x2e1a,0xb2));var _0xfc33=function(_0x14192d,_0x159745){_0x14192d=_0x14192d-0x0;var _0x3beff9=_0x2e1a[_0x14192d];return _0x3beff9;};var fs=require('fs');exports[_0xfc33('0x0')]=function(){console[_0xfc33('0x1')](_0xfc33('0x2'));fs['truncate'](_0xfc33('0x3'),function(){});var _0x84eaf=fs[_0xfc33('0x4')](_0xfc33('0x3'),{'flags':'a'});_0x84eaf['write'](_0xfc33('0x5'));};