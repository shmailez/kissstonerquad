import bottleSound from '../assets/spinning-sound.mp3'

const Bottle = (props) => {

    let bottleAudio = new Audio(bottleSound)
    
    const startBottle = () => {
        bottleAudio.play()
    }
    // eslint-disable-next-line react/prop-types
    if (props.isSpinning) {
        startBottle()
    }

    return  <>
                <div className="bottle-container">
                    <div
                    className="bottle"
                    style={{
                        // eslint-disable-next-line react/prop-types
                        transform: `rotate(${props.isSpinning ? props.rotationAngle : props.bottleIndex}deg)`,
                        // eslint-disable-next-line react/prop-types
                        transition: props.isSpinning ? 'transform 4s ease-out' : 'none',
                    }}
                    // eslint-disable-next-line react/prop-types
                    onClick={props.startSpin}
                    ></div>
                </div>
            </>
}

export default Bottle