import Header from '../components/common/Header';
import styled from 'styled-components';
import libraryBackground from '../assets/svg/library.svg';
import BookSpine from '../components/BookSpine';
import bookShelfImage from '../assets/svg/bookshelf.png';
import WriteBtn from '../components/Button/WriteBtn';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

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
    position: relative;
`;

// BookShelfImage를 relative로 설정
const BookShelfImage = styled.div`
    width: 913px;
    height: 100vh;
    background-image: url(${bookShelfImage});
    background-size: cover;
    background-position: center;
    position: relative;
`;

// BookShelfContainer를 absolute로 설정하여 BookShelfImage 위에 배치
const BookShelfContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    gap: 10%;
    top: 65%;
    left: 50%;
    z-index: 1; /* 이미지 위에 올라오도록 설정 */
    transform: translate(-50%, -50%);
`;

const WriteBtnDiv = styled.div`
  position: absolute;
  right: 106px;
  bottom: 72px;
  transform: translate(-50%, -50%);
`;

function MainPage() {
  const navigate = useNavigate();
  // const [user, setUser] = useRecoilState(use)
  const onClickWriteBtn = () => {
    navigate('/write')
  }

  return (
    <Container>
      <Header username={'류건'} pageNum={19} />
      <BodyContainer>
        <BookShelfImage />
        <BookShelfContainer>
          <BookSpine bookname="분노" author='류건' color="#FF5733" id={3}/>
          <BookSpine bookname="기쁨" author='류건' color="#F2D600" id={1}/>
          <BookSpine bookname="슬픔" author='류건' color="#4F67FF" id={2}/>
          <BookSpine bookname="두려움" author='류건' color="#A73BFF" id={5}/>
          <BookSpine bookname="무기력함" author='류건' color="#A9A9A9" id={4}/>
        </BookShelfContainer>
        <WriteBtnDiv>
          <WriteBtn onClick={onClickWriteBtn}/>
        </WriteBtnDiv>
      </BodyContainer>
    </Container>
  );
}

export default MainPage;
