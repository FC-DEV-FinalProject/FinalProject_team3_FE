'use client'

import { useState } from 'react'

import classNames from 'classnames/bind'

import { Button } from '@/shared/ui/button'
import { Textarea } from '@/shared/ui/textarea'

import QuestionDetailCard from '../question-detail-card'
import styles from './styles.module.scss'

const cx = classNames.bind(styles)

const QuestionContainer = () => {
  const [isActiveAnswer, setIsActiveAnswer] = useState(false)
  // 임시
  const hasAnswer = false
  const isTrader = true

  const handleQuestionAdd = () => {}

  const handleAnswerAdd = () => {
    setIsActiveAnswer((prevState) => !prevState)
  }

  // TODO: Trader, Investor에 따라 적절한 UI 표시
  // Trader이고 답변이 달리지 않았을 때: 답변하기 버튼
  // Trader이고 답변이 달렸을 때: 답변 삭제하기 버튼
  // Investor일 때: 추가 질문하기 버튼

  return (
    <>
      <div className={cx('container')}>
        <QuestionDetailCard
          isAuthor={true}
          strategyName="ETF 레버리지 /인버"
          title="미국발 경제악화가 한국 증시에 미치는 영향은 무엇인가요?"
          contents="안녕하세요 주식투자를 해보려고 하는데요 어쩌구... 저쩌구.......... 안녕하세요 주식투자를 해보려고 하는데요 어쩌구... 저쩌구..........안녕하세요 주식투자를 해보려고 하는데요 어쩌구... 저쩌구.......... 안녕하세요 주식투자를 해보려고 하는데요 어쩌구... 저쩌구..........안녕하세요 주식투자를 해보려고 하는데요 어쩌구... 저쩌구.......... 안녕하세요 주식투자를 해보려고 하는데요 어쩌구... 저쩌구..........안녕하세요 주식투자를 해보려고 하는데요 어쩌구... 저쩌구.......... 안녕하세요 주식투자를 해보려고 하는데요 어쩌구... 저쩌구..........안녕하세요 주식투자를 해보려고 하는데요 어쩌구... 저쩌구.......... 안녕하세요 주식투자를 해보려고 하는데요 어쩌구... 저쩌구..........안녕하세요 주식투자를 해보려고 하는데요 어쩌구... 저쩌구.......... 안녕하세요 주식투자를 해보려고 하는데요 어쩌구... 저쩌구..........안녕하세요 주식투자를 해보려고 하는데요 어쩌구... 저쩌구.......... 안녕하세요 주식투자를 해보려고 하는데요 어쩌구... 저쩌구..........안녕하세요 주식투자를 해보려고 하는데요 어쩌구... 저쩌구.......... 안녕하세요 주식투자를 해보려고 하는데요 어쩌구... 저쩌구..........안녕하세요 주식투자를 해보려고 하는데요 어쩌구... 저쩌구.......... 안녕하세요 주식투자를 해보려고 하는데요 어쩌구... 저쩌구..........안녕하세요 주식투자를 해보려고 하는데요 어쩌구... 저쩌구.......... 안녕하세요 주식투자를 해보려고 하는데요 어쩌구... 저쩌구..........안녕하세요 주식투자를 해보려고 하는데요 어쩌구... 저쩌구.......... 안녕하세요 주식투자를 해보려고 하는데요 어쩌구... 저쩌구..........안녕하세요 주식투자를 해보려고 하는데요 어쩌구... 저쩌구.......... 안녕하세요 주식투자를 해보려고 하는데요 어쩌구... 저쩌구.........."
          nickname="홍길동"
          createdAt="2024-11-03T15:00:00"
          status="답변 완료"
        />
        {hasAnswer ? (
          <QuestionDetailCard
            type="answer"
            isAuthor={false}
            contents="저는 이러쿵저러쿵 생각합니다... 저는 이러쿵저러쿵 생각합니다...저는 이러쿵저러쿵 생각합니다...저는 이러쿵저러쿵 생각합니다... 저는 이러쿵저러쿵 생각합니다...저는 이러쿵저러쿵 생각합니다...저는 이러쿵저러쿵 생각합니다... 저는 이러쿵저러쿵 생각합니다...저는 이러쿵저러쿵 생각합니다...저는 이러쿵저러쿵 생각합니다... 저는 이러쿵저러쿵 생각합니다...저는 이러쿵저러쿵 생각합니다...저는 이러쿵저러쿵 생각합니다... 저는 이러쿵저러쿵 생각합니다...저는 이러쿵저러쿵 생각합니다...저는 이러쿵저러쿵 생각합니다... 저는 이러쿵저러쿵 생각합니다...저는 이러쿵저러쿵 생각합니다..."
            nickname="전문가"
            createdAt="2024-11-03T15:00:00"
          />
        ) : (
          <>{!isActiveAnswer && <p className={cx('empty-message')}>아직 답변이 없습니다</p>}</>
        )}

        {isActiveAnswer ? (
          <div className={cx('answer-input-wrapper')}>
            <div className={cx('title-wrapper')}>
              <h2 className={cx('title')}>답변</h2>
              <Button size="small">등록하기</Button>
            </div>
            <Textarea placeholder="내용을 입력하세요." />
          </div>
        ) : (
          <Button
            variant="filled"
            className={cx('button')}
            onClick={isTrader ? handleAnswerAdd : handleQuestionAdd}
          >
            {isTrader ? '답변하기' : '추가 질문하기'}
          </Button>
        )}
      </div>
    </>
  )
}

export default QuestionContainer
