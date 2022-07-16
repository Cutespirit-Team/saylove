

<!DOCTYPE html>
<html lang="en">
 
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="http://libs.baidu.com/jquery/1.9.0/jquery.js"></script>
 
</head>
 
<body>
  <div class="userlist">
 
    <table id="ut">
 
      <tr>
        <a href="https://saylove.cutespirit.org/dataaaa/test.csv">下載到電腦</a>
        <a href="https://saylove.cutespirit.org/data.php">刷新</a>
        <td>name</td>
 
        <td>age</td>
 
        <td>id</td>
 
      </tr>
 
    </table>
 
  </div>
  <script>
 
    //url转blob
    function urlToBlob() {
      let file_url =
        'https://saylove.cutespirit.org/test.csv'
      let xhr = new XMLHttpRequest();
      xhr.open("get", file_url, true);
      xhr.responseType = "blob";
      xhr.onload = function () {
        if (this.status == 200) {
          // if (callback) {
          // callback();
          console.log(this.response)
          const reader = new FileReader()
          reader.onload = function () {
            console.log('reader.result', reader.result)
            csvToTable(reader.result)
          }
          reader.readAsText(this.response);
        }
      };
      xhr.send();
    }
    urlToBlob()
    function csvToTable(content){
     var mtr = document.getElementById("ut");
     var frag = document.createDocumentFragment();
    // 对csv文件的数据先以行分割
    var  userList = content.split("\n");
    // 我们在对每一行以逗号作分割
    for (i = 0; i < userList.length; i++) {
 
      userary = userList[i].split(",");
      tr = document.createElement("tr");
      // 对每行的内容遍历到td标签去
 
      for (j = 0; j < userary.length; j++) {
 
        td = document.createElement("td");
        td.append(userary[j]);
        tr.appendChild(td);
      }
      frag.appendChild(tr);
    }
    // 加载到web页面
    mtr.appendChild(frag);
    }
  </script>
</body>
 
</html>

