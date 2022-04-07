import { DateFormat } from 'Util/DateFormat';
import * as S from './Style';

export default function Articles({ articles, offset, limit, me }) {
  function ArticleComponent(article, notice) {
    const articleId = article.id
    return (
      <S.TableRow notice={notice} key={article.id}>
        <S.Column xs={2} md={1}>
          {notice ? '공지' : `${articleId}`}
        </S.Column>
        <S.Column xs={4} md={7}>
          {article.title}
        </S.Column>
        <S.Column xs={3} md={2}>{article.nickname}</S.Column>
        <S.Column xs={3} md={2}>
          {DateFormat(article.createdDate)}
        </S.Column>
      </S.TableRow>
    )
  }

  return (
    <S.Table>
      <S.TableHead>
        <S.ColumnName xs={2} md={1}>
          #
        </S.ColumnName>
        <S.ColumnName xs={4} md={7}>
          제목
        </S.ColumnName>
        <S.ColumnName xs={3} md={2}>
          작성자
        </S.ColumnName>
        <S.ColumnName xs={3} md={2}>
          날짜
        </S.ColumnName>
      </S.TableHead>

      {articles.slice(offset, offset + limit).map((article) => (
        ArticleComponent(article, 0)
      ))}

      {/* {articles.slice(offset, offset + limit).map((article, index) => (
        <S.TableRow key={article.id}>
          <S.Column xs={1}>{article.id}</S.Column>
          <S.Column xs={7}>
            <S.DetailLink
              to={`/community/${article.id}`}
              state={{
                user: user,
              }}
            >
              {article.title}
            </S.DetailLink>
          </S.Column>
          <S.Column xs={2}>{article.nickname}</S.Column>
          <S.Column xs={2}>{DateFormat(article.createdDate)}</S.Column>
        </S.TableRow>
      ))} */}
    </S.Table>
  )
};
