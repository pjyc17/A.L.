import { useParams, useLocation } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import { useState } from "react";
import * as S from './ProfileContentDetailStyle';

export function ProfileContentDetail() {
  const { userId, contentId } = useParams();
  const [isCheckAnswer, setIsCheckAnswer] = useState(false);
  const { state } = useLocation();

  // 임시 학습 디테일 정보
  const learningInfo = {
    // id ?
    img_url: 'http://placeimg.com/400/400/animals',
    created_at: '2021-03-23 11:14:00',
    answer_time_1: '45',
    answer_time_2: '50',
    score: '3.7',
    record_1: 'dcc27319-54d7-4e94-910e-7778d110473f.m4a',
    record_2: '72a334d9-437e-4749-85ef-00a69f2a83f3.m4a',
    AI_answers: ['apple', 'banana', 'cake'],
    my_answer_1: 'Help me...',
    my_answer_2: 'Please'
  }

  const onToggleOpen = () => {
    setIsCheckAnswer(!isCheckAnswer)
  }

  return (
    <div>
      <Row>
        <Col xs={5}>
          <Image src={`${learningInfo.img_url}`} alt="profile_image" rounded fluid></Image>
        </Col>
        <Col xs={7} className="d-flex flex-column align-items-start row text-start">
          <S.Text>받아온 주소 : {state.imgUrl}</S.Text>
          <S.Text>날짜 : {learningInfo.created_at}</S.Text>
          <S.Text>1번째 경과시간 : {learningInfo.answer_time_1}</S.Text>
          <S.Text>2번째 경과시간 : {learningInfo.answer_time_2}</S.Text>
          <S.Text>내 발음 점수 : {learningInfo.score}</S.Text>

          <div className="row mb-2">
            <S.Text className="mb-0 align-self-center">1차 녹음본</S.Text>
            <audio controls>
              <source src={`https://d3qljd3xvkb8gz.cloudfront.net/${learningInfo.record_1}`} />
            </audio>
          </div>

          <div className="row">
            <S.Text className="mb-0 align-self-center">2차 녹음본</S.Text>
            <audio controls>
              <source src={`${learningInfo.record_2}`} />
            </audio>
          </div>

          <S.Text>AI 답변 / 내 답변</S.Text>
          <S.AnswerButton onClick={() => {onToggleOpen()}}>{isCheckAnswer ? 'Close' : 'Open'}</S.AnswerButton>
          <S.AnswerBox style={{ display : isCheckAnswer ? '' : 'none'}}>
            <S.Text>AI 답변 : {learningInfo.AI_answers.join(",")}</S.Text>
            <S.Text>내 답변 : {learningInfo.my_answer_1}</S.Text>
            <S.Text>내 답변 : {learningInfo.my_answer_2}</S.Text>
          </S.AnswerBox>          
        </Col>
      </Row>
      <br />
    </div>
  )
}