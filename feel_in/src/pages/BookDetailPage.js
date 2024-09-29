import React, { useEffect, useState } from 'react';
import axios from 'axios'; // axios 추가
import styled from 'styled-components';
import LeftArrowButton from '../components/Arrow/LeftArrowButton';
import RightArrowButton from '../components/Arrow/RightArrowButton';
import Header from '../components/common/Header';
import book from '../assets/svg/book.svg';
import libraryBackground from '../assets/svg/library.svg';
import StickyNote from '../components/StickyNote/StickyNote';
import Modal from '../components/StickyNote/Modal';
import { Howl } from 'howler';
import BookSound from '../assets/sounds/booksound.wav';
import { useParams } from 'react-router-dom';
import { diariesGet } from '../api/Get';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const BodyContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-image: url(${libraryBackground});
    background-size: cover;
    background-position: center;
`;

const WrapperArea = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
`;

const BookContainer = styled.div`
    display: flex;
    justify-content: center;
    background-image: url(${book});
    background-size: cover;
    background-position: center;
    width: 993px;
    height: 713px;
`;

const LeftBookContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
    padding-top: 20px;
    margin-top: 40px;
`;

const RightBookContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 60%;
    padding-top: 20px;
    margin-top: 40px;
`;

const Title = styled.p`
    font-size: 30px;
`;

const StickyNoteContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10%;
    max-height: 550px;
    overflow-y: auto;
    padding-right: 10px;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(217, 217, 217, 0.5);
    z-index: 999;
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const SubTitle = styled.p`
    font-size: 20px;
`;

function effectSound(src, volume = 1) {
  let sound;
  const soundInject = (src) => {
    sound = new Howl({ src });
    sound.volume(volume);
  };
  soundInject(src);
  return sound;
}

function BookDetailPage() {
  const es = effectSound(BookSound, 1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState(null);
  const [modalContent, setModalContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [diaries, setDiaries] = useState([]);

  const params = useParams();

  const leftClickHandler = () => {
    es.play();
    if (currentIndex > 0) {
      if (currentIndex % 2 === 0) {
        setCurrentIndex(currentIndex - 2);
      } else {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  const rightClickHandler = () => {
    es.play();
    if (currentIndex + 2 < diaries.length) {
      setCurrentIndex(currentIndex + 2);
    }
  };

  const openModal = (date, content) => {
    setModalDate(date);
    setModalContent(content);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalDate(null);
    setModalOpen(false);
    setModalContent('');
  };

  useEffect(() => {
    const fetchData = async () => {
      const id = params.id;
      try {
        const response = await diariesGet(id);  // await를 추가
        const formattedData = response.map((entry) => ({
          title: entry.solutionContent,
          diaryList: entry.diary.map(d => ({
            createDate: d.createdAt,
            content: d.content,
          })),
        }));
        setDiaries(formattedData);
      } catch (error) {
        console.error('Error fetching diaries:', error);
      }
    };
    fetchData();
  }, [params.id]);

  return (
    <Container>
      <Header username={'류건'} pageNum={19} />
      <BodyContainer>
        <WrapperArea>
          <LeftArrowButton onClickHandler={leftClickHandler} />
          <BookContainer>
            <LeftBookContainer>
              <Title>{diaries[currentIndex]?.title || 'Loading...'}</Title>
              <SubTitle>과거의 내 모습들</SubTitle>
              <StickyNoteContainer>
                {diaries[currentIndex]?.diaryList.map((note, idx) => (
                  <StickyNote
                    key={idx}
                    text={note.createDate}
                    onClick={() => openModal(note.createDate, note.content)}
                  />
                ))}
              </StickyNoteContainer>
            </LeftBookContainer>
            <RightBookContainer>
              {currentIndex + 1 < diaries.length && (
                <>
                  <Title>{diaries[currentIndex + 1]?.title || 'Loading...'}</Title>
                  <SubTitle>과거의 내 모습들</SubTitle>
                  <StickyNoteContainer>
                    {diaries[currentIndex + 1]?.diaryList.map((note, idx) => (
                      <StickyNote
                        key={idx}
                        text={note.createDate}
                        onClick={() => openModal(note.createDate, note.content)}
                      />
                    ))}
                  </StickyNoteContainer>
                </>
              )}
            </RightBookContainer>
          </BookContainer>
          <RightArrowButton onClickHandler={rightClickHandler} />
        </WrapperArea>
        <Overlay isOpen={modalOpen} />
        <Modal isOpen={modalOpen} onClose={closeModal} date={modalDate} content={modalContent} />
      </BodyContainer>
    </Container>
  );
}

export default BookDetailPage;
