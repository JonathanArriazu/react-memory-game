import React, { useEffect, useRef } from 'react'
import Countdown from 'react-countdown'

const Timer = ({start, setStart}) => {

    const timerRef = useRef();

    const handleEnd = () => {
        setStart(false);
    }

    useEffect(() => {
      if(start) {
        timerRef.current.start();
      }
    }, [start])
    

  return (
    <div className='timer'>
        <h3>
            <Countdown
                date={Date.now() + 10500}
                intervalDelay={0}
                precision={3}
                renderer={props => <span>{props.seconds}</span>}
                onComplete={handleEnd}
                autoStart={false}
                ref={timerRef}
            >
            </Countdown> Seg
        </h3>
    </div>
  )
}

export default Timer