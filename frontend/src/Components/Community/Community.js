import { Col, Container, Pagination, Row, Table } from 'react-bootstrap'

export function Community() {
  
  const now = new Date();
  const nowYear = String(now.getFullYear());
  const nowMonth = now.getMonth() + 1 < 10 ? '0' + String(now.getMonth() + 1) : String(now.getMonth() + 1);
  const nowDate = now.getDate() < 10 ? '0' + String(now.getDate()) : String(now.getDate());
  const today = nowYear + '. ' + nowMonth + '. ' + nowDate;

  function DateFormat(date) {
    if ( date.slice(0, 12) === today) {
      return (
        date.slice(13)
      )
    }
    return (
      date.slice(0, 12)
    )
  }

  const articles = [
    { id: 1, isNotice: true, title:'1', user: '나', created_at: '2022. 03. 14 11:10', view_count: 1},
    { id: 2, isNotice: false, title:'2', user: '나', created_at: '2022. 03. 10 11:14', view_count: 1},
    { id: 3, isNotice: false, title:'3', user: '나', created_at: '2022. 03. 11 11:14', view_count: 1},
    { id: 4, isNotice: false, title:'4', user: '나', created_at: '2022. 03. 12 11:14', view_count: 1},
    { id: 5, isNotice: false, title:'5', user: '나', created_at: '2022. 03. 13 11:14', view_count: 1},
    { id: 6, isNotice: false, title:'6', user: '나', created_at: '2022. 03. 13 11:14', view_count: 1},
    { id: 7, isNotice: false, title:'7', user: '나', created_at: '2022. 03. 14 11:14', view_count: 1},
    { id: 8, isNotice: true, title:'8', user: '나', created_at: '2022. 03. 14 11:20', view_count: 1},
    { id: 9, isNotice: false, title:'9', user: '나', created_at: '2022. 03. 14 11:21', view_count: 1},
    { id: 10, isNotice: false, title:'10', user: '나', created_at: '2022. 03. 14 11:33', view_count: 1},
    { id: 11, isNotice: false, title:'11', user: '나', created_at: '2022. 03. 14 11:35', view_count: 1},
    { id: 12, isNotice: false, title:'12', user: '나', created_at: '2022. 03. 14 11:50', view_count: 1},
  ]

  articles.sort((a, b) => {
    if (b.isNotice === a.isNotice) {
      const x = a.created_at, y = b.created_at
      return  x < y ? 1: x > y ? -1 : 0;
    }
    return b.isNotice - a.isNotice;
  })

  return (
    <Container style={{marginTop:'5rem'}}>
      <Row>
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th style={{width:'60%'}}>제목</th>
              <th>작성자</th>
              <th>날짜</th>
              <th>조회</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td>{(article.isNotice) && '공지'}</td>
                <td>{article.title}</td>
                <td>{article.user}</td>
                <td>{DateFormat(article.created_at)}</td>
                <td>{article.view_count}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      <Row className="justify-content-center">
        <Col sm={12}>
          <Pagination></Pagination>
        </Col>
      </Row>
    </Container>
  )
};