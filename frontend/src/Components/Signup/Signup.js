import React, { useState } from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import { MyButton } from 'styles/Button';
import { Link, useNavigate } from 'react-router-dom';
import { userInstance } from '../../api/index';
import * as S from './Style';
import { Input } from 'styles/Input';

export function Signup() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const api = userInstance()

  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [userNameError, setUserNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [dEmail, setDEmail] = useState('');
  const [dName, setDName] = useState('');
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkName, setCheckName] = useState(false);

  const navigate = useNavigate();

  function onChangePassword(e) {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/
    if (!e.target.value || passwordRegex.test(e.target.value))
      setPasswordError(false)
    else setPasswordError(true)

    if (!confirmPassword || e.target.value === confirmPassword)
      setConfirmPasswordError(false)
    else setConfirmPasswordError(true)
    setPassword(e.target.value)
  };
  function onChangeConfirmPassword(e) {
    if (password === e.target.value) setConfirmPasswordError(false)
    else setConfirmPasswordError(true)
    setConfirmPassword(e.target.value)
  };
  function onChangeUserName(e) {
    setUserNameError(false)
    setUserName(e.target.value)
  };
  function onChangeEmail(e) {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
    if (!e.target.value || emailRegex.test(e.target.value)) setEmailError(false)
    else setEmailError(true)
    setEmail(e.target.value)
  };

  function validation(e) {
    if (!password) setPasswordError(true);
    if (!confirmPassword) setConfirmPasswordError(true);
    if (!userName) setUserNameError(true);
    if (!email) setEmailError(true);
    if (!checkEmail) setDEmail('??????????????? ???????????????.');
    if (!checkName) setDName('??????????????? ???????????????.');
    if (
      password &&
      confirmPassword &&
      userName &&
      email &&
      checkEmail &&
      checkName &&
      password === confirmPassword &&
      !passwordError &&
      !emailError
    )
      return true
    else return false
  };

  function onCheckEmail() {
    if (!emailError) {
      api
        .post('/users/duplicate-check-id', { id: email })
        .then((res) => {
          setCheckEmail(true)
          setDEmail('?????? ??????')
        })
        .catch((error) => {
          if (error.response.status === 409) {
            setDEmail('?????? ???????????? ??????????????????.')
          }
        })
    }
  };

  function onCheckName() {
    api
      .post('/users/duplicate-check-nickname', {
        nickname: userName,
      })
      .then((res) => {
        setCheckName(true)
        setDName('?????? ??????')
      })
      .catch((error) => {
        if (error.response.status === 409) {
          setDName('?????? ???????????? ???????????????.')
        }
      })
  };

  function onSubmit(e) {
    if (!validation(e)) return

    api
      .post('/users', { id: email, nickname: userName, password: password })
      .then((res) => {
        console.log(res.data)
        navigate('/login')
      })
      .catch((error) => {
        console.log(error)
      })
  };

  const handleKeyPress = e => {
    if(e.key === 'Enter') {
      onSubmit();
    }
  }

  return (
    <S.Contents onKeyPress={handleKeyPress}>
      <Row className="justify-content-center align-items-center">
        <Col xs={11} style={{margin: "1rem 0"}}>
          <Input
            maxLength={50}
            style={{width: "100%", margin: "auto"}}
            type="email"
            placeholder="?????????"
            value={email}
            onChange={onChangeEmail}
            disabled={checkEmail && email}
          />
        </Col>
        <Col style={{padding: 0}}>
          {(checkEmail && email) ? 
            <S.CheckFillButton /> :
            <S.CheckButton onClick={onCheckEmail}/>}
        </Col>
        {( dEmail && dEmail !== "?????? ??????" ) && <Alert variant="warning">{dEmail}</Alert>}
        {emailError && (
          <Alert variant="warning">
            ????????? ????????? ????????? ??????????????????
          </Alert>
        )}
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col xs={11} style={{margin: "1rem 0"}}>
          <Input
            maxLength={20}
            style={{width: "100%", margin: "auto"}}
            placeholder="?????????"
            value={userName}
            onChange={onChangeUserName}
            disabled={checkName && userName}
          />
        </Col>
        <Col style={{padding: 0}}>
          {(checkName && userName)?
            <S.CheckFillButton /> :
            <S.CheckButton onClick={onCheckName}/>}
        </Col>
        {(dName && dName !== "?????? ??????") && <Alert variant="warning">{dName}</Alert>}
        {userNameError && (
          <Alert variant="warning">
            ???????????? ??????????????????.
          </Alert>
        )}
      </Row>
      <Row className="justify-content-center">
        <Col style={{margin: "1rem 0"}}>
          <Input
            maxLength={20}
            style={{width: "100%", margin: "auto"}}
            type="password"
            placeholder="????????????"
            value={password}
            onChange={onChangePassword}
          />
        </Col>
        {passwordError && (
          <Alert variant="warning">
            ?????? 8??????, ??????, ????????? ??????????????????.
          </Alert>
        )}
      </Row>
      <Row className="justify-content-center">
        <Col style={{margin: "1rem 0"}}>
          <Input
            maxLength={20}
            style={{width: "100%", margin: "auto"}}
            type="password"
            placeholder="???????????? ??????"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
          />
        </Col>
        {confirmPasswordError && (
          <Alert variant="warning">
            ??????????????? ???????????? ????????????.
          </Alert>
        )}
      </Row>
      <Row className="justify-content-center">
        <MyButton
          onClick={onSubmit}
          style={{width: "50%", marginBottom: "1rem"}}
        >
          ?????? ??????
        </MyButton>
      </Row>
      <Row className="justify-content-center">
        ?????? ????????? ?????????????
      </Row>
      <Row className="justify-content-center">
        <Link to="/login">
          ?????????
        </Link>
      </Row>
    </S.Contents>
  )
};
