import { useParams } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as S from './ProfileContentDetailStyle';
import { apiInstance } from "api";

export function ProfileContentDetail() {
  const { contentId } = useParams();
  const [isCheckAnswer, setIsCheckAnswer] = useState(false);
  const [learningInfo, setLearningInfo] = useState();
  const api = apiInstance();

  useEffect(() => {
    api.get(`/learn/picture/${contentId}`)
      .then(res => {
        setLearningInfo(res.data);
      })
  }, [api, contentId])

  const onToggleOpen = () => {
    setIsCheckAnswer(!isCheckAnswer)
  }

  return (
    <>
      {learningInfo && 
        <div>
          <Row className="justify-content-center">
            <Col xs={12}>
              <Image 
                src={`https://d3qljd3xvkb8gz.cloudfront.net/${learningInfo.pictureUrl}`} 
                alt="profile_image" 
                rounded 
                fluid 
                style={{ width: '100%', marginBottom: '10px', overflow: 'hidden', objectFit: 'cover' }}
              />
            </Col>
            <Col xs={12}>
              <S.Text>학습 날짜 : {learningInfo.createdDate.substr(0, 19)}</S.Text>
              <S.Text>발음 점수 : {learningInfo.score}</S.Text>
            </Col>
            <Col xs={12}>
              <S.Text1>1차 녹음본</S.Text1>
              <audio controls>
                <source src={`${learningInfo.records[0].recordUrl}`} />
              </audio>
            </Col>
            <Col xs={12}>
              <S.Text1>2차 녹음본</S.Text1>
              <audio controls>
                <source src={`${learningInfo.records[1].recordUrl}`} />
              </audio>
            </Col>
            <Col xs={12}>
              <S.Text>AI 단어 / 내 답변</S.Text>
            </Col>
            <Col >
              <S.AnswerButton onClick={() => {onToggleOpen()}}>{isCheckAnswer ? 'Close' : 'Open'}</S.AnswerButton>
            </Col>
            <Col>
              <S.AnswerBox style={{ display : isCheckAnswer ? '' : 'none'}}>
                <S.Text>AI 단어 : {learningInfo.words.map(word => word.content).join(", ")}</S.Text>
                <S.Text>첫 번째 답변 : {learningInfo.records[0].sentence}</S.Text>
                <S.Text>두 번째 답변 : {learningInfo.records[1].sentence}</S.Text>
              </S.AnswerBox>          
            </Col>
          </Row>
          <br />
        </div>
      }
    </>
  )
}