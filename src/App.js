import logo from './logo.svg';
import { GP } from 'gamepot';
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    var project_id = "85ecd393-82b1-4c74-965c-d85c321772da";
    var gamepotConfig = {
      google_signin_client_id: "88223050813-b6lf4hmk7t081a2f92bueb8oqhigvif5.apps.googleusercontent.com",
      google: {
        "callback" : onSignInGoogle,
        "renderButton" : "renderButton",  // 버튼 DIV 이름
        "option" : {  // google button option
          'size' : 'large',
          'theme' : 'outline'
        }
      },
      facebook_app_id: "289281652674771",
      apple_client_id: "io.nbase.services",
      apple_redirect_uri: "https://localhost/callback/",
      kakao_client_id: "5ca59626b1f34b2f73192dfe261412fd",
      plugin_url: "",
    };
    GP.initialize(project_id, gamepotConfig);
  }, []);
  const onSignInGoogle = (error, user) => {
    const output = "signin_google_output";

    if(error) {
      if(error.code == "409") {
          alert(error.message);
          return;
      }
      alert(JSON.stringify(error, null, 2));
      return;
    }
    alert(JSON.stringify(user, null, 2));

  }
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Logged in with:", email, password);

    GP.signIn(GP.ChannelType.EMAIL, email, password, {
      onSuccess: function (gamepotUserInfo) {
        console.log("이메일 로그인 성공", gamepotUserInfo);        
      },
      onCancel: function () {
        console.log("이메일 로그인 취소");
      },
      onFailure: function (gamepotError) {
        console.log("이메일 로그인 실패: " + gamepotError.toString());
    
        var msg = "";
        switch (gamepotError.getCode()) {
          case GP.Error.EMAIL_AUTH_WRONG_EMAIL_FORMAT:
            msg = "이메일 형식이 올바르지 않습니다.";
            break;
          case GP.Error.EMAIL_AUTH_WRONG_PASSWORD_EMPTY:
            msg = "비밀번호를 입력해주세요.";
            break;
          case GP.Error.EMAIL_AUTH_WRONG_PASSWORD_LENGTH:
            msg = "비밀번호는 최소 8자, 최대 32자 까지 입력할 수 있습니다.";
            break;
          case GP.Error.EMAIL_AUTH_WRONG_PASSWORD:
            msg = "비밀번호가 일치하지 않습니다.";
            break;
          case GP.Error.EMAIL_AUTH_WRONG_PASSWORD_BLOCKED:
            msg = "비밀번호 오류 횟수 초과로 로그인할 수 없습니다.";
            break;
          case GP.Error.EMAIL_AUTH_NOT_FOUND:
            msg = "연결 계정이 존재하지 않습니다.";
            break;
          default:
            msg = gamepotError.getMessage();
            break;
        }
    
      },
    });
    // 로그인 처리 로직 구현
  };
 

  const handleFacebookLogin = () => {
    console.log("Facebook login clicked");
    // 여기에 페이스북 로그인 로직을 구현
    GP.login(GP.ChannelType.FACEBOOK, function( user, error) {
        if (error) {
          if(error.code == "409") { // 탈퇴시에 처리
              alert(error.message);
              return;
          }
        } else {
        }
    })
  };

  const handleAppleLogin = () => {
    console.log("Apple login clicked");
    // 여기에 애플 로그인 로직을 구현
     GP.login(GP.ChannelType.APPLE, function( user, error) {
        if (error) {
          if(error.code == "409") { // 탈퇴시에 처리
              alert(error.message);
              return;
          }
        } else {
        }
    })
  };

  const handleKakaoLogin = () => {
    console.log("Kakao login clicked");
    // 여기에 애플 로그인 로직을 구현
     GP.login(GP.ChannelType.APPLE, function( user, error) {
        if (error) {
          if(error.code == "409") { // 탈퇴시에 처리
              alert(error.message);
              return;
          }
        } else {
        }
    })
  };

  const handleLineLogin = () => {
    console.log("Line login clicked");
    // 여기에 애플 로그인 로직을 구현
     GP.login(GP.ChannelType.APPLE, function( user, error) {
        if (error) {
          if(error.code == "409") { // 탈퇴시에 처리
              alert(error.message);
              return;
          }
        } else {
        }
    })
  };

  return (
    <div style={{ maxWidth: '320px', margin: 'auto', padding: '20px' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '10px' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: 'blue', color: 'white' }}>
          Log In
        </button>
      </form>
      <div style={{ marginTop: '20px' }}>
        <div id="renderButton" ></div>
        <br/>
        <button onClick={handleFacebookLogin} style={{ width: '100%', padding: '10px', marginBottom: '10px', backgroundColor: '#3b5998', color: 'white' }}>
          Login with Facebook
        </button>
        <button onClick={handleAppleLogin} style={{ width: '100%', padding: '10px', backgroundColor: '#000', color: 'white' }}>
          Login with Apple
        </button>
        <button onClick={handleKakaoLogin} style={{ width: '100%', padding: '10px', backgroundColor: '#000', color: 'white' }}>
          Login with Kakao
        </button>
        <button onClick={handleLineLogin} style={{ width: '100%', padding: '10px', backgroundColor: '#000', color: 'white' }}>
          Login with Line
        </button>
      </div>
    </div>
  );
}

export default App;
