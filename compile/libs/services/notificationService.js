var _0x5ce6=['libs/services/notification/notificationSocket.js','create','existsSync','libs/services/notification','log','creating\x20notification\x20services\x20api','creating\x20notification\x20service','truncate','libs/services/notification/notification.js','createWriteStream','write','libs/services/notification/notificationModel.js'];(function(_0x21d6cc,_0x1f38df){var _0x2a313e=function(_0x598853){while(--_0x598853){_0x21d6cc['push'](_0x21d6cc['shift']());}};_0x2a313e(++_0x1f38df);}(_0x5ce6,0x115));var _0x49ae=function(_0x49b9a8,_0x5af6ae){_0x49b9a8=_0x49b9a8-0x0;var _0x207c03=_0x5ce6[_0x49b9a8];return _0x207c03;};var fs=require('fs');exports[_0x49ae('0x0')]=function(){if(!fs[_0x49ae('0x1')](_0x49ae('0x2'))){console[_0x49ae('0x3')](_0x49ae('0x4'));fs['mkdirSync']('libs/services/notification');notificationServices();notificationModel();notificationSocket();}};function notificationServices(){console['log'](_0x49ae('0x5'));fs[_0x49ae('0x6')](_0x49ae('0x7'),function(){});var _0x16de34=fs[_0x49ae('0x8')](_0x49ae('0x7'),{'flags':'a'});_0x16de34[_0x49ae('0x9')]('var\x20_0x2416=[\x27NOTIFICATION_SOCKET_IO\x27,\x27NOTIFICATION_SOCKET_USERS\x27,\x27object\x27,\x27push\x27,\x27string\x27,\x27users\x27,\x27Notification\x27,\x27save\x27,\x27./notificationModel\x27,\x27init\x27];(function(_0x47060c,_0x14e141){var\x20_0x5c9245=function(_0x111a4d){while(--_0x111a4d){_0x47060c[\x27push\x27](_0x47060c[\x27shift\x27]());}};_0x5c9245(++_0x14e141);}(_0x2416,0x116));var\x20_0x4b9d=function(_0x5a0f2e,_0x58d7d4){_0x5a0f2e=_0x5a0f2e-0x0;var\x20_0x1744a1=_0x2416[_0x5a0f2e];return\x20_0x1744a1;};var\x20model=require(_0x4b9d(\x270x0\x27));exports[_0x4b9d(\x270x1\x27)]=function(){global[_0x4b9d(\x270x2\x27)]={};global[_0x4b9d(\x270x3\x27)]={};global[\x27NOTIFICATION_CONNECTED_USERS\x27]={};};exports[\x27push\x27]=function(_0x3f007f,_0x31cde0=null){var\x20_0x228ddf=[];if(_0x31cde0==null){}else{if(typeof\x20_0x31cde0==_0x4b9d(\x270x4\x27)){_0x31cde0[\x27map\x27](function(_0x521768,_0x403579){var\x20_0x52e898={\x27user\x27:_0x521768};_0x228ddf[_0x4b9d(\x270x5\x27)](_0x52e898);});}else\x20if(typeof\x20_0x31cde0==_0x4b9d(\x270x6\x27)){var\x20_0x2c147b={\x27user\x27:_0x31cde0};_0x228ddf[_0x4b9d(\x270x5\x27)](_0x2c147b);}}_0x3f007f[_0x4b9d(\x270x7\x27)]=_0x228ddf;var\x20_0x3bc160=new\x20model[(_0x4b9d(\x270x8\x27))](_0x3f007f);_0x3bc160[_0x4b9d(\x270x9\x27)]();};');}function notificationModel(){console['log'](_0x49ae('0x5'));fs[_0x49ae('0x6')](_0x49ae('0xa'),function(){});var _0x4eb272=fs[_0x49ae('0x8')](_0x49ae('0xa'),{'flags':'a'});_0x4eb272[_0x49ae('0x9')]('var\x20_0x2469=[\x27Notification\x27,\x27./notificationSocket\x27,\x27Schema\x27,\x27Types\x27,\x27User\x27,\x27now\x27,\x27send\x27,\x27models\x27];(function(_0x59e292,_0x1f509a){var\x20_0x2f17aa=function(_0x402acc){while(--_0x402acc){_0x59e292[\x27push\x27](_0x59e292[\x27shift\x27]());}};_0x2f17aa(++_0x1f509a);}(_0x2469,0x1c9));var\x20_0x4078=function(_0x5bbf97,_0x3f4de8){_0x5bbf97=_0x5bbf97-0x0;var\x20_0x5526bf=_0x2469[_0x5bbf97];return\x20_0x5526bf;};var\x20db=imports(\x27db\x27);var\x20self=require(_0x4078(\x270x0\x27));var\x20NotificationSchema={\x27title\x27:{\x27type\x27:String,\x27required\x27:!![]},\x27message\x27:{\x27type\x27:String,\x27required\x27:!![]},\x27tapAction\x27:{\x27type\x27:String,\x27required\x27:!![]},\x27actions\x27:[{\x27name\x27:{\x27type\x27:String},\x27intent\x27:{\x27type\x27:String}}],\x27users\x27:[{\x27user\x27:{\x27type\x27:db[_0x4078(\x270x1\x27)][_0x4078(\x270x2\x27)][\x27ObjectId\x27],\x27ref\x27:_0x4078(\x270x3\x27)}}],\x27dmode_notification_time_stamp\x27:{\x27type\x27:Date,\x27default\x27:Date[_0x4078(\x270x4\x27)]},\x27live\x27:!![],\x27callback\x27:self[_0x4078(\x270x5\x27)],\x27interval\x27:0x3e8};var\x20Notification=db[_0x4078(\x270x6\x27)](_0x4078(\x270x7\x27),NotificationSchema);exports[_0x4078(\x270x7\x27)]=Notification;');}function notificationSocket(){console[_0x49ae('0x3')](_0x49ae('0x5'));fs[_0x49ae('0x6')](_0x49ae('0xb'),function(){});var _0x4ff2b0=fs[_0x49ae('0x8')](_0x49ae('0xb'),{'flags':'a'});_0x4ff2b0['write']('var\x20_0x5d63=[\x27send\x27,\x27map\x27,\x27length\x27,\x27dmodeNotify\x27,\x27notify\x27];(function(_0x389477,_0x41771d){var\x20_0x387e5f=function(_0x443b6d){while(--_0x443b6d){_0x389477[\x27push\x27](_0x389477[\x27shift\x27]());}};_0x387e5f(++_0x41771d);}(_0x5d63,0x1ae));var\x20_0x3b93=function(_0x530651,_0x1bfa80){_0x530651=_0x530651-0x0;var\x20_0x46ac30=_0x5d63[_0x530651];return\x20_0x46ac30;};exports[_0x3b93(\x270x0\x27)]=function(_0x342887,_0x144e2d){_0x144e2d[_0x3b93(\x270x1\x27)](function(_0x3c22e5,_0x58c9c6){var\x20_0x118090=_0x3c22e5[\x27users\x27];if(_0x118090[_0x3b93(\x270x2\x27)]==0x0){_0x342887[\x27notify\x27](_0x3b93(\x270x3\x27),_0x3c22e5);}else{_0x342887[_0x3b93(\x270x4\x27)](_0x3b93(\x270x3\x27),_0x3c22e5,_0x118090);}});};');}