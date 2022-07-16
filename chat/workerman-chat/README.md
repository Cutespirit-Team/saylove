workerman-chat
=======
基於workerman的GatewayWorker框架開發的一款高性能支援分散式部署的聊天室系統。

GatewayWorker框架文檔：http://www.workerman.net/gatewaydoc/

 特性
======
 * 使用websocket協定
 * 多流覽器支持（流覽器支持html5或者flash任意一種即可）
 * 多房間支持
 * 私聊支持
 * 掉線自動重連
 * 微博圖片自動解析
 * 聊天內容支援微博表情
 * 支援多伺服器部署
 * 業務邏輯全部在一個檔中，快速入門可以參考這個檔[Applications/Chat/Event.php](https://github.com/walkor/workerman-chat/blob/master/Applications/Chat/Event.php)   
  
下載安裝
=====
1、git clone https://github.com/walkor/workerman-chat

2、composer install

啟動停止(Linux系統)
=====
以debug方式啟動  
```php start.php start  ```

以daemon方式啟動  
```php start.php start -d ```

啟動(windows系統)
======
按兩下start_for_win.bat  

注意：  
windows系統下無法使用 stop reload status 等命令  
如果無法打開頁面請嘗試關閉伺服器防火牆  

測試
=======
流覽器訪問 http://伺服器ip或域:55151,例如http://127.0.0.1:55151

 [更多請訪問www.workerman.net](http://www.workerman.net/workerman-chat)
