import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StarRating = () => {
  
  const average = 4.43;
  const commentCnt = 45;

  const STAR_INDEX_ARR = ['1', '2', '3', '4', '5'];
  const [rating, setRating] = useState([0, 0, 0, 0, 0]);

  const calcStarRate = () => {
    const tmpStarRateArr = [0, 0, 0, 0, 0];
    let starVerRate = (average * 70) / 5;
    let idx = 0;
    
    while (starVerRate > 14) {
      tmpStarRateArr[idx] = 14;
      idx += 1;
      starVerRate -= 14;
    }
    tmpStarRateArr[idx] = starVerRate;
    return tmpStarRateArr;
  };

  // const chooseRating = (rate: number) => {
  //   setAverage(rate);
  // }

  useEffect(() => {
    setRating(calcStarRate);
  }, []);
  
  return (
    <StarContainer>
      {STAR_INDEX_ARR.map((item, idx) => {
        return <div className='star_icon' key={`${idx}`}>
          <svg xmlns='http://www.w3.org/2000/svg' width= '22' height= '20' viewBox='0 0 14 13' fill='#cacaca'>
            <clipPath id={`${item}StarClip`}>
              <rect width={`${rating[idx]}`} height= '20' />
            </clipPath>
            <path
              id= {`${item}Star`}
              d='M9,2l2.163,4.279L16,6.969,12.5,10.3l.826,4.7L9,12.779,4.674,15,5.5,10.3,2,6.969l4.837-.69Z'
              transform='translate(-2 -2)'
            />
            <use
              clipPath={`url(#${item}StarClip)`} href={`#${item}Star`} fill='#fc335a'
            />
          </svg>
        </div>
      })
      }
      <span>&nbsp; {average} &nbsp; ({commentCnt})</span>
    </StarContainer>
  );
};

export default StarRating;

const StarContainer = styled.div`
  display: flex;
  font-weight: bolder;
  .star_icon {
    display: inline-flex;
    margin-right: 3px;
  }
`