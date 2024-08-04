/* eslint-disable */
// warning 없애기

import './App.css';
import { useState } from 'react';

function App() {
    // 자료를 잠깐 저장할때는 변수 let or const

    // 변수 문법과 state 문법의 차이
    // state값이 변경되면 자동으로 html이 재랜더링 된다.
    // 즉 자동으로 html에 변경이 바로 반영되게 하려면 state를 사용해야함! 

    // state 문법
    let [title, setTitle] = useState(['남자코트 추천', '맛집 추천', '카페 추천']);


    // 좋아요 숫자
    let [like, setLike] = useState([0, 0, 0]);

    // 모달 ui
    // false는 안보이는 상태
    let [modal, setModal] = useState(false);

    let [modalTitleIndex, setModalTitleIndex] = useState(0);


    // 입력받은 값을 저장할 변수
    let [inputValue, setInputValue] = useState('');

    // map함수
    // 1. array 자료 개수 만큼 콜백함수 실행
    // 2. 함수의 파라미터(매개변수)는 array에 있는 자료
    // 3. return에 적는 값은 array형태로 반환
    // 이 특성으로 react에서 반복문처럼 사용해 html코드 생성

    
    return (

        <div className="App">

            <header className='header'>
                <h2>Blog Practice</h2>


            </header>
            <button onClick={() => {
                let copyTitle = [...title];
                copyTitle.sort();
                setTitle(copyTitle);
            }}>
                정렬
            </button>

            <button onClick={() => {
                let copyTitle = [...title];
                copyTitle[0] = '여자코트 추천'
                setTitle(copyTitle);
            }}>
                male/female
            </button>


            {/* 
            <div className='list'>
                <h3>{title[0]} <span onClick={() => { setLike(like + 1) }}>👍</span> {like} </h3>
                <p>1월 1일 내용</p>
            </div>
            <div className='list'>
                <h3>{title[1]}</h3>
                <p>1월 1일 내용</p>
            </div>
            <div className='list'>
                <h3 onClick={() => {
                    if (modal == false) {
                        setModal(true)
                    } else {
                        setModal(false)
                    };

                }}>{title[2]}</h3>
                <p>1월 1일 내용</p>
            </div>
            */}
            {
                title.map(function (a, i) {
                    return (
                        <div className='list' key={i}>
                            <h3 onClick={() => {
                                if (modal == false) {
                                    setModal(true)
                                } else {
                                    setModal(false)
                                };

                                setModalTitleIndex(i);

                            }}>{a}
                                <span onClick={(e) => {
                                    // 이벤트 더블링 막기
                                    e.stopPropagation();
                                    let copyLike = [...like];
                                    copyLike[i] += 1;
                                    setLike(copyLike);
                                }}>👍 {like[i]}</span>
                            </h3>
                            <p>1월 1일 내용</p>

                            <button onClick={() => {
                                let deletetitle = [...title];
                                deletetitle.splice(i, 1);
                                setTitle(deletetitle);
                            }}>삭제</button>
                        </div>
                    )
                })
            }

            <input onChange={(e) => {
                let newTitle = e.target.value;
                setInputValue(newTitle);
            }} />
            <button onClick={() => {
                setTitle([...title, inputValue]);
                setLike([...like, 0]);
            }}>
                제출
            </button>





            {/*
              동적인 ui 만드는 3 step
              1. html css 기본 틀 완성
              2. ui의 현재 상태를 state에 저장
              3. state에 따라서 ui가 어떻게 보일지 작성 (조건문 등으로)
            */}

            {
                modal == true ? <Modal title={title} setTitle={setTitle} modalTitleIndex={modalTitleIndex} /> : null
            }



        </div>
    );
}

function Modal(props) {
    return (
        <div className='modal'>
            <h4>{props.title[props.modalTitleIndex]}</h4>
            <p>날짜</p>
            <p>상세내용</p>
            <button onClick={() => { props.setTitle(["여자코트추천", "카페추천", "맛집 추천"]) }}>male/femaile</button>
        </div>
    )
}



export default App;
