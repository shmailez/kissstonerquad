import img from '../assets/Kiss.png'
import kissSound from '../assets/kiss-sound.mp3'

const KissImage = (isKissing) => {

    let kissAudio = new Audio(kissSound)

    const startKiss = () => {
        kissAudio.play()
      }

    if(isKissing.isKissing) {
        startKiss()
    }

    return  <>
                <img className={`kiss-image ${isKissing.isKissing &&'kiss-visible'}`} src={img} alt="" />
            </>
}

export default KissImage