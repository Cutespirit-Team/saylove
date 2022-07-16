<?php
session_set_cookie_params(1800 , '/', '.cutespirit.org');
session_start();
require "db_conn.php";
$id=0;
$email=0;
if (isset($_SESSION['id']) and isset($_SESSION['Email'])){
    $id = $_SESSION['id'];
    $email = $_SESSION['Email'];
    
}
$sql = "SELECT * FROM users WHERE id='$id'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
echo $row['name'];


?>

<html><head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <title>saylove-chat</title>
  <link href="https://saylove.cutespirit.org/chat/workerman-chat/Applications/Chat/Web//css/bootstrap.min.css" rel="stylesheet">
    <link href="https://saylove.cutespirit.org/chat/workerman-chat/Applications/Chat/Web//css/jquery-sinaEmotion-2.1.0.min.css" rel="stylesheet">
    <link href="https://saylove.cutespirit.org/chat/workerman-chat/Applications/Chat/Web//css/style.css" rel="stylesheet">
    
  <script type="text/javascript" src="https://saylove.cutespirit.org/chat/workerman-chat/Applications/Chat/Web//js/swfobject.js"></script>
  <script type="text/javascript" src="https://saylove.cutespirit.org/chat/workerman-chat/Applications/Chat/Web//js/web_socket.js"></script>
  <script type="text/javascript" src="https://saylove.cutespirit.org/chat/workerman-chat/Applications/Chat/Web//js/jquery.min.js"></script>
    <script type="text/javascript" src="https://saylove.cutespirit.org/chat/workerman-chat/Applications/Chat/Web//js/jquery-sinaEmotion-2.1.0.min.js"></script>
  <script type="text/javascript">
    if (typeof console == "undefined") {    this.console = { log: function (msg) {  } };}
    // 如果流覽器不支持websocket，會使用這個flash自動類比websocket協定，此過程對開發者透明
    WEB_SOCKET_SWF_LOCATION = "/swf/WebSocketMain.swf";
    // 開啟flash的websocket debug
    WEB_SOCKET_DEBUG = true;
    var ws, name, client_list={},room_id,client_id;
    room_id = getQueryString('room_id')?getQueryString('room_id'):1;
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    } 
    // 連接服務端
    function connect() {
       // 創建websocket
       ws = new WebSocket("wss://"+document.domain+"/ws");
       // 當socket連接打開時，輸入用戶名
       ws.onopen = onopen;
       // 當有消息時根據消息類型顯示不同資訊
       ws.onmessage = onmessage; 
       ws.onclose = function() {
          console.log("連接關閉，定時重連");
          connect();
       };
       ws.onerror = function() {
          console.log("出現錯誤");
       };
    }
    // 連接建立時發送登錄資訊
    function onopen()
    {
        if(!name)
        {
            // show_prompt();
        }
        // 登錄
        var login_data = '{"type":"login","client_name":"'+name.replace(/"/g, '\\"')+'","room_id":'+room_id+'}';
        console.log("websocket握手成功，發送登錄資料:"+login_data);
        ws.send(login_data);
    }
    // 服務端發來消息時
    function onmessage(e)
    {
        console.log(e.data);
        var data = JSON.parse(e.data);
        switch(data['type']){
            // 服務端ping用戶端
            case 'ping':
                ws.send('{"type":"pong"}');
                break;;
            // 登錄 更新用戶列表
            case 'login':
                var client_name = data['client_name'];
                if(data['client_list'])
                {
                    client_id = data['client_id'];
                    client_name = '你';
                    client_list = data['client_list'];
                }
                else
                {
                    client_list[data['client_id']] = data['client_name']; 
                }
                say(data['client_id'], data['client_name'],  client_name+' 加入了聊天室', data['time']);
                flush_client_list();
                console.log(data['client_name']+"登錄成功");
                break;
            // 發言
            case 'say':
                //{"type":"say","from_client_id":xxx,"to_client_id":"all/client_id","content":"xxx","time":"xxx"}
                say(data['from_client_id'], data['from_client_name'], data['content'], data['time']);
                break;
            // 用戶退出 更新用戶列表
            case 'logout':
                //{"type":"logout","client_id":xxx,"time":"xxx"}
                say(data['from_client_id'], data['from_client_name'], data['from_client_name']+' 退出了', data['time']);
                delete client_list[data['from_client_id']];
                flush_client_list();
        }
    }
    // 輸入姓名
    
    function show_prompt(){  
        name = prompt('輸入你的龜頭名字：', '');
        if(!name || name=='null'){  
            name = '遊客';
        }
    }  
    
    // 提交對話
    function onSubmit() {
      var input = document.getElementById("textarea");
      var to_client_id = $("#client_list option:selected").attr("value");
      var to_client_name = $("#client_list option:selected").text();
      ws.send('{"type":"say","to_client_id":"'+to_client_id+'","to_client_name":"'+to_client_name+'","content":"'+input.value.replace(/"/g, '\\"').replace(/\n/g,'\\n').replace(/\r/g, '\\r')+'"}');
      input.value = "";
      input.focus();
    }
    // 刷新用戶清單方塊
    function flush_client_list(){
        var userlist_window = $("#userlist");
        var client_list_slelect = $("#client_list");
        userlist_window.empty();
        client_list_slelect.empty();
        userlist_window.append('<h4>線上用戶</h4><ul>');
        client_list_slelect.append('<option value="all" id="cli_all">所有人</option>');
        for(var p in client_list){
            userlist_window.append('<li id="'+p+'">'+client_list[p]+'</li>');
            if (p!=client_id) {
                client_list_slelect.append('<option value="'+p+'">'+client_list[p]+'</option>');   
            }
        }
        $("#client_list").val(select_client_id);
        userlist_window.append('</ul>');
    }
    // 發言
    function say(from_client_id, from_client_name, content, time){
        //解析新浪微博圖片
        content = content.replace(/(http|https):\/\/[\w]+.sinaimg.cn[\S]+(jpg|png|gif)/gi, function(img){
            return "<a target='_blank' href='"+img+"'>"+"<img src='"+img+"'>"+"</a>";}
        );
        //解析url
        content = content.replace(/(http|https):\/\/[\S]+/gi, function(url){
            if(url.indexOf(".sinaimg.cn/") < 0)
                return "<a target='_blank' href='"+url+"'>"+url+"</a>";
            else
                return url;
        }
        );
        $("#dialog").append('<div class="speech_item"><img src="http://lorempixel.com/38/38/?'+from_client_id+'" class="user_icon" /> '+from_client_name+' <br> '+time+'<div style="clear:both;"></div><p class="triangle-isosceles top">'+content+'</p> </div>').parseEmotion();
    }
    $(function(){
        select_client_id = 'all';
        $("#client_list").change(function(){
             select_client_id = $("#client_list option:selected").attr("value");
        });
        $('.face').click(function(event){
            $(this).sinaEmotion();
            event.stopPropagation();
        });
    });
  </script>
</head>
<body onload="connect();">
    <div class="container">
        <div class="row clearfix">
            <div class="col-md-1 column">
            </div>
            <div class="col-md-6 column">
               <div class="thumbnail">
                   <div class="caption" id="dialog"></div>
               </div>
               <form onsubmit="onSubmit(); return false;">
                    <select style="margin-bottom:8px" id="client_list">
                        <option value="all">所有人</option>
                    </select>
                    <textarea class="textarea thumbnail" id="textarea"></textarea>
                    <div class="say-btn">
                        <input type="button" class="btn btn-default face pull-left" value="表情" />
                        <input type="submit" class="btn btn-default" value="發表" />
                    </div>
               </form>
               <div>
               &nbsp;&nbsp;&nbsp;&nbsp;<b>房間列表:</b>（當前在&nbsp;房間<script>document.write(room_id)</script>）<br>
               &nbsp;&nbsp;&nbsp;&nbsp;<a href="/?room_id=1">房間1</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="/?room_id=2">房間2</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="/?room_id=3">房間3</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="/?room_id=4">房間4</a>
               <br><br>
               </div>
               <p class="cp">Powered by <a href="http://www.cutespirit.org/" target="_blank">Cutespirit Team</a></p>
            </div>
            <div class="col-md-3 column">
               <div class="thumbnail">
                   <div class="caption" id="userlist"></div>
               </div>
               <a href="http://www.cutespirit.org:8383" target="_blank"><img style="width:252px;margin-left:5px;" src="/img/workerman-todpole.png"></a>
            </div>
        </div>
    </div>
    <script type="text/javascript">var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F7b1919221e89d2aa5711e4deb935debd' type='text/javascript'%3E%3C/script%3E"));</script>
    <script type="text/javascript">
      // 動態自我調整螢幕
      document.write('<meta name="viewport" content="width=device-width,initial-scale=1">');
      $("textarea").on("keydown", function(e) {
          // 按enter鍵自動提交
          if(e.keyCode === 13 && !e.ctrlKey) {
              e.preventDefault();
              $('form').submit();
              return false;
          }
          // 按ctrl+enter複合鍵換行
          if(e.keyCode === 13 && e.ctrlKey) {
              $(this).val(function(i,val){
                  return val + "\n";
              });
          }
      });
    </script>
</body>
</html>