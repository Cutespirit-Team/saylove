<?php
if(isset($_GET['text'])){
    $text=$_GET['text'];
}
if(isset($_GET['speed'])){
    $speed=$_GET['speed'];
}


?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"></meta>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <title>打字機效果</title>
        <style>
            :root{
                --typeSpeed: <?php if(isset($speed) and strlen($speed)>0){echo $speed;}else{echo "4s";}?>s;
                --strLength: <?php if(isset($text) and strlen($text)>0){echo strlen($text); }?>;
                --bg-color: #454545;
                --font-color:#fff;
            }
            *{
                padding: 0;
                margin: 0;
                
            }
            body{
                display: flex;
                height: 100vh;
                justify-content: center;
                align-items: center;
                font-family: monospace;
                background-color: var(--bg-color);
                color: var(--font-color);
            }
            h1{
                position: relative;
            }
            h1:before, h1:after{
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                
            }
            h1:before{
                background-color: var(--bg-color);
                animation: typing var(--typeSpeed) steps(var(--strLength)) 1s forwards;
            }
            h1:after{
                width: 2px;
                background-color: var(--font-color);
                animation: typing var(--typeSpeed) steps(var(--strLength)) 1s forwards, blink 500ms steps(var(--strLength)) infinite ;
            }
            @Keyframes typing{
                to{
                    left: 100%;
                    
                }
            }
            @Keyframes blink{
                from,to{
                    background: transparent;
                }
                50%{
                    background: #fff;
                    
                }
            }
            
        </style>
    </head>
    <body>
        <h1 class="heading" style="position: fixed;word-break: break-all;"><?php if (isset($text) and strlen($text)>0){echo $text;}else{echo "哈密瓜好可愛";}?></h1>
        
        <script>
            const root=document.documentElement;
            const heading=document.querySelector('.heading');
            root.style.setProperty('--strLength', heading.textContent.length);
            console.log(heading.textContent.length)
        </script>
    </body>
</html>
