import React, { useEffect, useRef } from 'react'
import Countdown from 'react-countdown'

const Timer = ({start, setStart, setSave}) => {

    const timerRef = useRef();

    const handleEnd = ({start}) => {
        setStart(false);
        setSave(true);
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
                date={Date.now() + 60500}
                intervalDelay={0}
                precision={3}
                renderer={props => <span>{props.seconds===0 ? 60 : props.seconds}</span>}
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